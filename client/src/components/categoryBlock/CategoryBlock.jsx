import React from "react";
import "./categoryBlock.css";

export const CategoryBlock = ({
  serviceCategory,
  setSelectedCategory,
  selectedCategoryID,
}) => {
  return (
    <div
      className={
        serviceCategory.id === selectedCategoryID
          ? "categoryBlock categoryBlockSelected"
          : "categoryBlock"
      }
      onClick={() => setSelectedCategory(serviceCategory)}
    >
      <span onClick={() => setSelectedCategory(serviceCategory)}>
        {" "}
        {serviceCategory.header}
      </span>
    </div>
  );
};
