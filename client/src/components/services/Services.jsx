import React from "react";
import "./services.css";
import { ServiceCategoryItem } from "../serviceItem/ServiceCategoryItem";
import { servicesCategories } from "./../../barberData";

export const Services = () => {
  return (
    <div className="servicesWrapper" id="sluzby">
      <div className="services">
        <h1 className="sluzby">SLUŽBY A CENY</h1>
        <hr className="headerUnderline" />

        {servicesCategories.map((serviceCategory) => (
          <ServiceCategoryItem
            serviceCategory={serviceCategory}
            key={serviceCategory.id}

          />
        ))}

        {/* {services.map((service) => (
          <ServiceItem service={service} />
        ))} */}
      </div>
    </div>
  );
};
