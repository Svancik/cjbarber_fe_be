import React from "react";
import "./calendar.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import { csCZ } from "@mui/x-date-pickers";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { useEffect } from "react";
import "dayjs/locale/cs"; // Import Czech locale

dayjs.extend(localizedFormat);
dayjs.locale("cs"); // Use Czech locale globally

export const Calendar = ({
  setSelectedDateRecord,
  setSelectedTimeRecord,
  serviceTimeTotal,
  setStep,
  bookedDates,
}) => {
  const openingHours = "10:00";
  const closingHours = "21:00";

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };
  const getTimeBlocks = (date, serviceTimeTotal) => {
    if (serviceTimeTotal === 25) serviceTimeTotal = 30;
    const formattedSelectedDate = date.format("DD.MM.YYYY");
    const opening = convertTimeToMinutes(openingHours);
    const closing = convertTimeToMinutes(closingHours);
    const blocks = [];

    for (
      let time = opening;
      time <= closing - serviceTimeTotal; // Adjust condition to account for service time
      time += serviceTimeTotal // Increment by serviceTimeTotal or another strategy if different blocks have different lengths
    ) {
      const endTime = time + serviceTimeTotal;
      if (endTime > closing) break; // This check might be redundant with the adjusted loop condition but is kept for clarity

      const formattedStartTime = convertMinutesToTime(time);
      const formattedEndTime = convertMinutesToTime(endTime);

      const isBooked = bookedDates.some((booking) => {
        if (booking.date !== formattedSelectedDate) return false;

        const bookingStart = convertTimeToMinutes(booking.startTime);
        const bookingEnd = convertTimeToMinutes(booking.finishTime);

        return time < bookingEnd && endTime > bookingStart;
      });

      if (!isBooked) {
        blocks.push(`${formattedStartTime}`);
      }
    }
    return blocks;
  };
  // Function to check if there are available time blocks for a service time total
  const hasAvailableTimeBlocks = (date, serviceTimeTotal) => {
    const formattedDate = date.format("DD.MM.YYYY");
    const opening = convertTimeToMinutes(openingHours);
    const closing = convertTimeToMinutes(closingHours);
    let available = false;

    bookedDates.forEach((booking) => {
      if (booking.date === formattedDate) {
        const bookingStart = convertTimeToMinutes(booking.startTime);
        const bookingEnd = convertTimeToMinutes(booking.finishTime);
        if (
          bookingStart - opening >= serviceTimeTotal ||
          closing - bookingEnd >= serviceTimeTotal
        ) {
          available = true;
        }
      }
    });

    // If there are no bookings for the date, the entire day is available
    if (!bookedDates.some((booking) => booking.date === formattedDate)) {
      available = true;
    }
    return available;
  };
  // Function to find the next available date based on service time total
  const findNextAvailableDate = (startDate, serviceTimeTotal) => {
    let date = dayjs(startDate);
    // Loop until an available date is found that is not on a Sunday or Monday
    while (
      !hasAvailableTimeBlocks(date, serviceTimeTotal) ||
      date.day() === 0 ||
      date.day() === 1
    ) {
      date = date.add(1, "day");
    }
    return date;
  };

  const [date, setDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(
    findNextAvailableDate(dayjs(date), serviceTimeTotal)
  );
  const [availableTimeBlocks, setAvailableTimeBlocks] = useState([]);
  const minDate = findNextAvailableDate(dayjs(date), serviceTimeTotal);
  const disabledDates = [];

  useEffect(() => {
    setSelectedDateRecord(selectedDate);
  }, []);
  useEffect(() => {
    // Check if the date is disabled, directly passing the date to be checked
    if (shouldDisableDate(date)) {
      // If the date is disabled, move to the next day
      setDate(date.add(1, "day"));
    }
  }, [date]);
  useEffect(() => {
    // Ensure selectedDate is always a dayjs object
    if (selectedDate && selectedDate.format) {
      const newAvailableTimeBlocks = getTimeBlocks(
        selectedDate,
        serviceTimeTotal
      );
      setAvailableTimeBlocks(newAvailableTimeBlocks);
    }
  }, [selectedDate, serviceTimeTotal]);

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate)); // This should ensure 'selectedDate' is always a dayjs object
    setSelectedDateRecord(dayjs(newDate));
  };
  const handleTimeBlockClick = (timeBlock) => {
    setSelectedTimeRecord(timeBlock);
    setStep(3);
  };
  const shouldDisableDate = (date) => {
    const dayjsDate = dayjs(date);
    const isSundayOrMonday = dayjsDate.day() === 0 || dayjsDate.day() === 1;
    const isDisabledDate = disabledDates.some((disabledDate) =>
      dayjsDate.isSame(dayjs(disabledDate, "DD.MM.YYYY"), "day")
    );
    return isSundayOrMonday || isDisabledDate;
  };

  return (
    <div className="reservationBlock">
      <h2 className="reservationTitle"> Zvolte datum a čas služby</h2>

      <div className="calendarWrapper">
        <div className="datePicker">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="cs"
            localeText={
              csCZ.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <DateCalendar
              label="Date"
              inputFormat="DD.MM.YYYY"
              fixedWeekNumber={6}
              shouldDisableDate={shouldDisableDate}
              views={["day", "month"]}
              date={date}
              minDate={minDate}
              disableHighlightToday
              value={selectedDate}
              onChange={handleDateChange}
              showDaysOutsideCurrentMonth
            />
          </LocalizationProvider>
        </div>
        <div className="timeBlocksWrapper">
          <div className="timeBlocks">
            {availableTimeBlocks.length > 0 ? (
              availableTimeBlocks.map((block, index) => (
                <div
                  key={index}
                  className="timeBlock"
                  onClick={() => handleTimeBlockClick(block)}
                >
                  {block}
                </div>
              ))
            ) : (
              <p>Není k dispozici žádný termín v tento den.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
