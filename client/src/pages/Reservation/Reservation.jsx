import React, { useEffect, useState } from "react";
import { Navbar } from "./../../components/navbar/Navbar";
import { Booking } from "../../components/booking/Booking";
import { Footer } from "./../../components/footer/Footer";
import { Calendar } from "../../components/calendar/Calendar";
import { OverView } from "./../../components/overView/OverView";
import { ClientInfo } from "../../components/clientInfo/ClientInfo";
import { GoldButton } from "../../components/button/Buttons";
import { Link, useNavigate } from "react-router-dom";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import emailjs from "emailjs-com";
import dayjs from "dayjs";
import axios from "axios";
import "./reservation.css";

export const Reservation = () => {
  const [selectedService, setSelectedService] = useState(false);
  const [step, setStep] = useState();
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState(
    []
  );
  const [servicesTotalPrice, setServicesTotalPrice] = useState(0);
  const [additionalServicesTimeTotal, setAdditionalServicesTimeTotal] =
    useState(0);
  const [clientData, setClientData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [selectedDateRecord, setSelectedDateRecord] = useState("");
  const [selectedTimeRecord, setSelectedTimeRecord] = useState("");
  const [serviceTimeTotal, setServiceTimeTotal] = useState(15);
  useEffect(() => {
    setStep(1);
    setAdditionalServicesTimeTotal(0);
    setSelectedAdditionalServices([]);
    setServicesTotalPrice(0);
    setServiceTimeTotal(15);
    setSelectedTimeRecord("");
    setClientData({
      fullName: "",
      email: "",
      phone: "",
    });
  }, []);

  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL); // Ensure your API URL is correct
        // Transform and store the fetched data
        const fetchedReservations = response.data.data.map((item) => ({
          // Transform your fetched data to match your application's data structure
          id: item.id,
          date: dayjs(item.attributes.datum).format("DD.MM.YYYY"), // Adjust format as necessary
          startTime: dayjs(item.attributes.zacatek_cas, "HH:mm:ss.SSS").format(
            "HH:mm"
          ),
          finishTime: dayjs(item.attributes.konec_cas, "HH:mm:ss.SSS").format(
            "HH:mm"
          ),
          // Add other necessary transformations
        }));
        setBookedDates(fetchedReservations);
      } catch (err) {
        console.error("Fetching reservations failed: ", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setServiceTimeTotal(
      selectedService.delkaTrvani + additionalServicesTimeTotal
    );
  }, [selectedService, additionalServicesTimeTotal]);

  const sendEmail = () => {
    let additionalServicesString = "";
    if (selectedAdditionalServices && selectedAdditionalServices.length > 0) {
      additionalServicesString = selectedAdditionalServices
        .map((service) => service.nazev)
        .join(", ");
    }

    const postData = {
      datum: selectedDateRecord.format("YYYY-MM-DD"),
      zacatek_cas: dayjs(selectedTimeRecord, "HH:mm").format("HH:mm:ss.SSS"),
      konec_cas: dayjs(selectedTimeRecord, "HH:mm")
        .add(serviceTimeTotal, "minute")
        .format("HH:mm:ss.SSS"),
      klient_jmeno: clientData.fullName,
      klient_sluzba: selectedService.nazev,
      klient_sluzby_dodatecne: additionalServicesString,
      klient_telefon: clientData.phone,
      klient_email: clientData.email,
      klient_cena: selectedService.cena + servicesTotalPrice,
    };

    const postReservationData = async () => {
      console.log(postData);
      try {
        const response = await axios.post(process.env.REACT_APP_API_URL, {
          data: postData, // Ensure this matches the expected format of your Strapi backend
        });

        // If you want to do something with the response, like updating the state
        console.log("Successfully posted data", response.data);

        // Optionally, refresh the data list or notify the user of success
      } catch (err) {
        console.error("Posting reservation failed:", err);
        // Optionally, handle errors, e.g., show an error message to the user
      }
    };

    postReservationData();

    const templateParams = {
      clientName: clientData.fullName,
      clienPhone: clientData.phone,
      clientEmail: clientData.email,
      service: selectedService.nazev, // Assuming selectedService has a name property
      date: selectedDateRecord.format("DD.MM.YYYY"),
      time: selectedTimeRecord,
      totalPrice: selectedService.cena + servicesTotalPrice,
      duration: serviceTimeTotal,
      additionalServices: additionalServicesString,
    };

    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual EmailJS values
    emailjs
      .send(
        "service_g4d9g3i",
        "template_61ft0mg",
        templateParams,
        "wPds4JUSeJ59Rg_xF"
      )
      .then(
        (response) => {
          console.log("Email successfully sent!", response);
          alert("Reservation confirmation email has been sent.");
        },
        (err) => {
          console.error("Failed to send email. Error: ", err);
          alert("Failed to send reservation confirmation email.");
        }
      );
  };
  //https://www.emailjs.com/ POKRAČOVÁNÍ ZÍTRA

  console.log(
    dayjs(selectedTimeRecord, "HH:mm")
      .add(serviceTimeTotal, "minute")
      .format("HH:mm")
  );

  return (
    <div className="reservation">
      <div className="pageWrapper">
        <nav>
          <Navbar />
        </nav>
        <div className="bodyContent">
          {step > 1 && (
            <ArrowBackIosNewIcon
              style={{ height: "5rem", width: "5rem" }}
              className="arrowBackIcon"
              onClick={() => {
                setStep(step - 1);
                setAdditionalServicesTimeTotal(0);
              }}
              data-aos="fade-right"
              data-aos-duration="1200"
            />
          )}
          {step === 1 && (
            <div className="reservationSection">
              <div
                className="reservationFrame mobileFullWidth"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <Booking
                  setSelectedService={setSelectedService}
                  selectedService={selectedService}
                  setServicesTotalPrice={setServicesTotalPrice}
                  selectedAdditionalServices={selectedAdditionalServices}
                  setSelectedAdditionalServices={setSelectedAdditionalServices}
                  setAdditionalServicesTimeTotal={
                    setAdditionalServicesTimeTotal
                  }
                />

                <button
                  className="reserveBtn"
                  text="Rezervovat termín"
                  onClick={() => {
                    setStep(2);
                  }}
                  step={step}
                  disabled={!selectedService}
                >
                  Vybrat termín
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="reservationSection">
              <div
                className="reservationFrame"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <Calendar
                  setSelectedDateRecord={setSelectedDateRecord}
                  setSelectedTimeRecord={setSelectedTimeRecord}
                  serviceTimeTotal={serviceTimeTotal}
                  bookedDates={bookedDates}
                  setStep={setStep}
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="reservationSection">
              <div
                className="reservationFrame"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <ClientInfo setClientData={setClientData} />
                <OverView
                  servicesTotalPrice={servicesTotalPrice}
                  serviceTimeTotal={serviceTimeTotal}
                  selectedAdditionalServices={selectedAdditionalServices}
                  selectedService={selectedService}
                  selectedTimeRecord={selectedTimeRecord}
                  selectedDateRecord={selectedDateRecord}
                />
                <span className="cancelReservation">
                  Zrušte svou rezervaci minimálně 2h před termínem pomocí
                  zavolání, či SMS načíslo 777 607 447. V případě že rezervaci
                  nezrušíte, budete při další návštěvě platit příplatek 100Kč.
                </span>
                <Link className="link" to="/">
                  <button
                    className="reserveBtn"
                    text="Rezervovat termín"
                    setStep={setStep}
                    onClick={sendEmail}
                    step={step}
                    disabled={
                      !(
                        clientData.fullName &&
                        clientData.email &&
                        clientData.phone
                      )
                    }
                  >
                    Rezervovat termín
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};
