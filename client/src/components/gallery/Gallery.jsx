import React, { useEffect, useState } from "react";
import "./gallery.css";
import { GalleryItem } from "./../galleryItem/GalleryItem";
import { hiddenGalleryItems, visibleGalleryItems } from "../../barberData";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CancelIcon from "@mui/icons-material/Cancel";
import AOS from "aos";

import "aos/dist/aos.css"; // Import AOS CSS

export const Gallery = ({ col3 }) => {
  const allGalleryItems = [...visibleGalleryItems, ...hiddenGalleryItems];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [viewFullGallery, setViewFullGallery] = useState(false);

  const toggleViewFullGallery = () => {
    setViewFullGallery(!viewFullGallery);
    AOS.refresh();
  };

  // Effect hook to check window size on mount and adjust viewFullGallery state
  useEffect(() => {
    // Function to update state based on window width
    const updateGalleryViewBasedOnWindowSize = () => {
      const screenWidth = window.innerWidth;
      // Assuming 768px is the breakpoint for mobile devices
      if (screenWidth <= 768) {
        setViewFullGallery(true); // Show more photos by default on mobile
      }
    };
    updateGalleryViewBasedOnWindowSize();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 2000, // Global animation duration
      once: false, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [open]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideIndex;
    setViewFullGallery(true);
    if (direction === "l") {
      newSlideIndex =
        slideNumber === 0 ? allGalleryItems.length - 1 : slideNumber - 1;
    } else {
      newSlideIndex =
        slideNumber === allGalleryItems.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideIndex);
  };

  return (
    <div className="galleryWrapper" id="galerie">
      <h1>GALERIE</h1>
      <hr className="headerUnderline" />

      <div className="galleryContainer">
        {visibleGalleryItems.map((item) => (
          <GalleryItem
            galleryItem={item}
            id={item.id}
            handleOpen={handleOpen}
          />
        ))}
      </div>

      <div
        className={`hiddenContainer galleryContainer ${
          viewFullGallery ? "show" : ""
        }`}
      >
        {hiddenGalleryItems.map((item) => (
          <GalleryItem
            galleryItem={item}
            id={item.id}
            handleOpen={handleOpen}
          />
        ))}
      </div>

      <div className={col3 ? "photosWrapper col3" : "photosWrapper"}>
        {open && (
          <div className="gallerySlider">
            <CancelIcon
              className="close"
              onClick={() => setOpen(false)}
              sx={{ height: "70px", width: "70px" }}
            />
            <ArrowBackIosNewIcon
              className="arrow"
              onClick={() => handleMove("l")}
              sx={{ height: "85px", width: "85px" }}
            />
            <div className="sliderWrapper">
              {allGalleryItems[slideNumber].video ? (
                <video
                  controls
                  loop
                  autoPlay
                  muted
                  className="gallerySliderImg"
                >
                  <source
                    src={require(`../../media/barbershop/galerie/${allGalleryItems[slideNumber].src}`)}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <img
                  src={require(`../../media/barbershop/galerie/${allGalleryItems[slideNumber].src}`)}
                  alt=""
                  className="gallerySliderImg"
                />
              )}
            </div>
            <ArrowForwardIosIcon
              className="arrow"
              onClick={() => handleMove("r")}
              sx={{ height: "85px", width: "85px" }}
            />
          </div>
        )}
      </div>
      <button className="viewMore" onClick={toggleViewFullGallery}>
        {viewFullGallery ? (
          <KeyboardArrowUpIcon
            className="mui"
            sx={{ width: "32px", height: "32px" }}
          />
        ) : (
          <KeyboardArrowDownIcon
            className="mui"
            sx={{ width: "32px", height: "32px" }}
          />
        )}
      </button>
    </div>
  );
};
