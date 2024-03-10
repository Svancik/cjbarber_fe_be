import React from "react";
import "./calendar.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import { csCZ } from "@mui/x-date-pickers";
import { times } from "../../barberData";

import dayjs from "dayjs";
import "dayjs/locale/cs"; // Import Czech locale
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect } from "react";

/*TODO:

A) Rozdělit kroky 1 - 3 na jednotlivé divy sekce a proklikávat se krok dopředu => dozadu - OnePage.
B) Nastavit zablokované termíny pokud se nachází v bookedDates
C) Nastavit odeslání mailem
D) Nastavit zobrazení kalendáře
E) Dodělat view na mobil

*/
dayjs.extend(localizedFormat);
dayjs.locale("cs"); // Use Czech locale globally
const openingHours = "10:00";
const closingHours = "21:00";

const bookedDates = [
  {
    id: 1,
    date: "02/28/2024",
    startTime: "10:30",
    finishTime: "14:30",
    clientName: "Jane Smith",
    selectedService: "Follow-up",
    additionalServices: ["ServiceC"],
  },
  {
    id: 2,
    date: "02/28/2024",
    startTime: "14:30",
    finishTime: "18:30",
    clientName: "Jane Smith",
    selectedService: "Follow-up",
    additionalServices: ["ServiceC"],
  },
  {
    id: 3,
    date: "02/28/2024",
    startTime: "18:30",
    finishTime: "21:30",
    clientName: "Jane Smith",
    selectedService: "Follow-up",
    additionalServices: ["ServiceC"],
  },
  {
    id: 4,
    date: "02/29/2024",
    startTime: "13:00",
    finishTime: "14:30",
    clientName: "Jane Smith",
    selectedService: "Follow-up",
    additionalServices: ["ServiceC"],
  },
];

const convertTimeToMinutes = (time) => {
  if (!time || typeof time !== "string" || !time.includes(":")) {
    console.error("Invalid or undefined time provided:", time);
    return 0; // Return 0 or some other default value as a fallback
  }
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const convertMinutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

const getTimeBlocks = (date, timeBlockLength) => {
  // Convert the dayjs object to a string in the "MM/DD/YYYY" format for comparison
  if (!date || !date.format) {
    console.error("Date is undefined or not a dayjs object.");
    return [];
  }
  const formattedSelectedDate = date.format("MM/DD/YYYY");
  const opening = convertTimeToMinutes(openingHours);
  const closing = convertTimeToMinutes(closingHours);
  const blocks = [];

  for (
    let time = opening;
    time + timeBlockLength <= closing;
    time += timeBlockLength
  ) {
    const endTime = time + timeBlockLength;
    if (endTime > closing) break;

    const formattedStartTime = convertMinutesToTime(time);
    const formattedEndTime = convertMinutesToTime(endTime);

    const isBooked = bookedDates.some((booking) => {
      // Compare formattedSelectedDate with booking.date directly
      if (booking.date !== formattedSelectedDate) return false;

      const bookingStart = convertTimeToMinutes(booking.startTime);
      const bookingEnd = convertTimeToMinutes(booking.finishTime);

      // Check if the time block is within the booked period
      return time < bookingEnd && endTime > bookingStart;
    });

    if (!isBooked) {
      blocks.push(`${formattedStartTime}`);
    }
  }

  return blocks;
};
export const Calendar = ({ setSelectedDateTime, serviceTimeTotal }) => {
  const [date, setDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availableTimeBlocks, setAvailableTimeBlocks] = useState([]);
  const [disabledDates, setDisabledDates] = useState([
    "03/26/2024",
    "04/04/2024",
  ]);

  useEffect(() => {
    const opening = convertTimeToMinutes(openingHours);
    const closing = convertTimeToMinutes(closingHours);
    const serviceLength = serviceTimeTotal; // Convert serviceTimeTotal to minutes if necessary

    const newDisabledDates = bookedDates.reduce((acc, booking) => {
      const bookingDate = dayjs(booking.date);
      const bookingStart = convertTimeToMinutes(
        dayjs(booking.startTime).format("HH:mm")
      );
      const bookingEnd = bookingStart + booking.serviceLength;

      // Assuming serviceLength is the minimum time required for an appointment
      if (bookingEnd + serviceLength > closing) {
        // If there's not enough time after this booking, disable the date
        if (!acc.includes(booking.date)) acc.push(booking.date);
      } else if (bookingStart - opening < serviceLength) {
        // If there's not enough time before the first booking of the day, disable the date
        if (!acc.includes(booking.date)) acc.push(booking.date);
      }
      // Additional logic needed here to handle middle-of-day bookings
      // This example only checks the first and last bookings of a day

      return acc;
    }, []);

    setDisabledDates(
      newDisabledDates.map((date) => dayjs(date).format("MM/DD/YYYY"))
    );
  }, [serviceTimeTotal, bookedDates]);

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
  console.log("selectedDate: ", selectedDate);
  // Opening hours for reservations
  console.log("date: ", date);

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate)); // This should ensure 'selectedDate' is always a dayjs object
  };

  const handleTimeBlockClick = (timeBlock) => {
    // Implement what happens when a time block is clicked
    console.log("Time block clicked:", timeBlock);
    // For example, setting the selected time (you might need to adjust this based on your app's needs)
    setSelectedDateTime(timeBlock);
  };
  const shouldDisableDate = (date) => {
    const dayjsDate = dayjs(date);

    const isSundayOrMonday = dayjsDate.day() === 0 || dayjsDate.day() === 1;
    const formattedDate = dayjs(date).format("MM/DD/YYYY");
    const isDisabledDate = disabledDates.includes(formattedDate);

    return isSundayOrMonday || isDisabledDate;
  };

  // Function to check if a date is disabled
  const isDisabled = (date) => {
    const dayOfWeek = date.day(); // Sunday is 0, Monday is 1
    const isSundayOrMonday = dayOfWeek === 0 || dayOfWeek === 1;
    const isDisabledDate = disabledDates.some((disabledDate) =>
      date.isSame(dayjs(disabledDate, "MM/DD/YYYY"), "day")
    );

    return isSundayOrMonday || isDisabledDate;
  };

  // Function to find the first available date
  const findFirstAvailableDate = () => {
    let date = dayjs(); // Start with today
    while (isDisabled(date)) {
      date = date.add(1, "day"); // Increment the date by one day and check again
    }
    return date;
  };

  // Setting the minDate to the first available date
  const minDate = findFirstAvailableDate();
  console.log("minDate: ", minDate);
  // The rest of your component remains the same, just replace the minDate calculation with the above

  return (
    <div className="reservationBlock">
      <h2 className="reservationTitle"> Zvolte termín </h2>

      <div className="calendarWrapper">
        <div className="datePicker">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="cs" // Make sure this matches the imported locale
            localeText={
              csCZ.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <DateCalendar
              locale="cs"
              label="Date"
              inputFormat="MM/DD/YYYY"
              fixedWeekNumber={6}
              shouldDisableDate={shouldDisableDate}
              views={["day", "month"]}
              date={date}
              defaultValue={minDate}
              minDate={minDate}
              value={selectedDate}
              onChange={handleDateChange}
              showDaysOutsideCurrentMonth
            />
          </LocalizationProvider>
        </div>
        <div className="timeBlocks">
          <h2>{selectedDate.format("DD/MM/YYYY")}</h2>
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
            <p>No available time slots for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};
