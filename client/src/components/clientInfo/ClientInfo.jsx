import React, { useState } from "react";
import "./clientInfo.css";
import { FormControl } from "@mui/material";
import { PersonIcon } from "@mui/icons-material/Person";

export const ClientInfo = ({ setClientData }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="reservationBlock">
      <h2 className="reservationTitle"> Zadejte kontaktní údaje </h2>
      <div className="formWrapper">
        <div className="card">
          <h2>Jméno a příjmení</h2>
          <label className="input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              name="fullName"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="card">
          <h2>Email</h2>
          <label className="input">
            <input
              className="input__field"
              type="text"
              placeholder="@"
              name="email"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="card">
          <h2>Telefonní číslo (+420)</h2>
          <label className="input">
            <input
              className="input__field"
              type="tel"
              placeholder="+420"
              name="phone"
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
