import React, { useEffect, useState } from "react";
import "./serviceCategoryItem.css";
import { services } from "../../barberData";

export const ServiceCategoryItem = ({ serviceCategory }) => {
  const [aosAnimation, setAosAnimation] = useState("");

  useEffect(() => {
    const updateAosAnimation = () => {
      // Check if the viewport width is less than or equal to 768px for mobile devices
      if (window.innerWidth <= 768) {
        // Set AOS animation to "fade-up" for mobile views
        setAosAnimation("fade-up");
      } else {
        // Set AOS animation based on serviceCategory.id for desktop views
        setAosAnimation(
          serviceCategory.id % 2 === 0 ? "fade-right" : "fade-left"
        );
      }
    };

    // Update AOS animation on mount and when resizing the window
    updateAosAnimation();
    window.addEventListener("resize", updateAosAnimation);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateAosAnimation);
  }, [serviceCategory.id]);

  let servicesFiltered = services.filter(
    (service) => service.categoryId == serviceCategory.id
  );
  return (
    <div className="block" data-aos={aosAnimation} data-aos-duration="1800">
      <div className="serviceWrapper">
        <div className={serviceCategory.id % 2 === 1 ? "img " : "img"}>
          <img
            className="icon"
            src={require(`../../media/vector/${serviceCategory.icon}.png`)}
            alt=""
          />{" "}
        </div>

        <div className="desc">
          <h5>{serviceCategory.header}</h5>
          <ul>
            {servicesFiltered.map((service) => (
              <>
                {" "}
                <li key={service.id}>
                  <span className="serviceName">{service.nazev}</span>{" "}
                  <span className="servicePrice">{service.cena}</span>
                </li>{" "}
              </>
            ))}
          </ul>
        </div>
      </div>
      {serviceCategory.id !== 5 && (
        <hr
          className={
            serviceCategory.id % 2 === 1 ? "thinHR rightContent" : "thinHR"
          }
        />
      )}
    </div>
  );
};
