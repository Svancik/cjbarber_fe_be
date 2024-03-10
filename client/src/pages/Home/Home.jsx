import React from "react";
import { Slider } from "../../components/slider/Slider";
import { Services } from "../../components/services/Services";
import { Gallery } from "../../components/gallery/Gallery";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import ScrollToHashElement from "../../components/ScrollToHashElement";
import { AboutMe } from "../../components/aboutMe/AboutMe";
import "./home.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export const Home = () => {
  const [rezervaceData, setRezervaceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}`)
        .then((response) => {
          // Handle the response data
          console.log(response.data);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("There was an error!", error);
        });
    };

    fetchData();
  }, []);
  return (
    <div className="home">
      <div className="pageWrapper">
        <ScrollToHashElement />
        <nav>
          <Navbar />
        </nav>
        <div className="bodyContent">
          <Slider />
          <Services />
          <AboutMe />
          <Gallery />
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};
