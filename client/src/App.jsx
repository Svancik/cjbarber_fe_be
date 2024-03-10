import "./App.css";
import React, { useState } from "react";
import AOS from "aos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import axios from "axios";
import { useEffect } from "react";
import { Reservation } from "./pages/Reservation/Reservation";
/*
TODO:

- Rezervační systém
- Mobilní zobrazení
- Komprimace obrázků a videí
- Doplnení textu "Kdo jsem"
- Přidání background videa do Slideru

API:
? Database name: CJsBarber
? Host: (127.0.0.1)
? Port: (3306)
? Username: root
? password: Awesome1998

STRAPI:
Firstname: CJ
Lastname: Barber
email: sam294@seznam.cz
pass: CJbarbershop23!

MYSQL:
root
Awesome1998

*/
function App() {
  AOS.init();

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await axios.get(process.env.REACT_APP_API_URL, {
        //   Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
        // });
        const data = await axios.get(process.env.REACT_APP_API_URL);

        console.log(data.data.data[1].s);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/rezervace" element={<Reservation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
