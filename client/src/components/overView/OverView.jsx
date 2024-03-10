import React from "react";
import "./overView.css";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
export const OverView = ({
  serviceTimeTotal,
  servicesTotalPrice,
  selectedDateRecord,
  selectedTimeRecord,
  selectedAdditionalServices,
  selectedService,
}) => {
  return (
    <div className="reservationBlock">
      <div className="overViewWrapper">
        <div className="overViewItem">
          <div className="overViewItemIcon">
            <ContentCutIcon
              className="overViewIcon"
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <span className="overViewItemText">
            Vybraná služba: <b>{selectedService.nazev}</b>
          </span>
        </div>
        {selectedAdditionalServices.length >= 1 && (
          <div className="overViewItem">
            <div className="overViewItemIcon">
              <AddShoppingCartIcon
                className="overViewIcon"
                sx={{ width: 60, height: 60 }}
              />
            </div>
            <span className="overViewItemText">
              Extra služby:{" "}
              {selectedAdditionalServices.map((s, index) => (
                <React.Fragment key={s.nazev}>
                  <b>{s.nazev}</b>
                  {index < selectedAdditionalServices.length - 1 && ", "}
                </React.Fragment>
              ))}
            </span>
          </div>
        )}
        {selectedDateRecord && (
          <div className="overViewItem">
            <div className="overViewItemIcon">
              <CalendarMonthIcon
                className="overViewIcon"
                sx={{ width: 60, height: 60 }}
              />
            </div>
            <span className="overViewItemText">
              Datum: <b>{selectedDateRecord.format("DD.MM.YYYY")}</b>
            </span>
          </div>
        )}
        {selectedTimeRecord && (
          <div className="overViewItem">
            <div className="overViewItemIcon">
              <ScheduleIcon
                className="overViewIcon"
                sx={{ width: 60, height: 60 }}
              />
            </div>
            <span className="overViewItemText">
              Čas: <b>{selectedTimeRecord}</b>
            </span>
          </div>
        )}
        <div className="overViewItem">
          <div className="overViewItemIcon">
            <HourglassEmptyIcon
              className="overViewIcon"
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <span className="overViewItemText">
            Délka návštěvy:{" "}
            {/* <b> {selectedService.delkaTrvani + serviceTime}min </b> */}
            <b>{serviceTimeTotal}min</b>
          </span>
        </div>
        <div className="overViewItem">
          <div className="overViewItemIcon">
            <AttachMoneyIcon
              className="overViewIcon"
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <span className="overViewItemText">
            Cena: <b>{selectedService.cena + servicesTotalPrice}Kč</b>
          </span>
        </div>
      </div>
    </div>
  );
};
