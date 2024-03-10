import React, { useState, useEffect } from "react";
import "./galleryItem.css";

export const GalleryItem = ({ galleryItem, handleOpen }) => {
  // State to track if the device is a phone or not
  const [isPhoneView, setIsPhoneView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneView(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to conditionally call handleOpen based on isPhoneView
  const conditionalHandleOpen = (id) => {
    if (!isPhoneView) {
      handleOpen(id);
    }
    // Else, do nothing or handle differently for phone view
  };

  return (
    <>
      {galleryItem.video ? (
        <div
          className={
            galleryItem.extraCSS
              ? `galleryCell ${galleryItem.extraCSS}`
              : "galleryCell"
          }
        >
          <video
            loop
            autoPlay
            muted
            className="galleryItem"
            onClick={() => conditionalHandleOpen(galleryItem.id - 1)}
          >
            <source
              src={require(`../../media/barbershop/galerie/${galleryItem.src}`)}
              type="video/mp4"
            />
          </video>
        </div>
      ) : (
        <div
          className={galleryItem.big ? "galleryCell bigItem" : "galleryCell"}
        >
          <img
            src={require(`../../media/barbershop/galerie/${galleryItem.src}`)}
            alt=""
            className="galleryItem"
            onClick={() => conditionalHandleOpen(galleryItem.id - 1)}
          />
        </div>
      )}
    </>
  );
};
