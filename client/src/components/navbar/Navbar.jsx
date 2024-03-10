import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar-desktop">
        <div className="left">
          <Link className="link" to="/#uvod">
            <img src={require("../../media/logoVector.png")} alt="" />
          </Link>
        </div>
        <div className="right">
          {/* Hamburger Icon */}
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* Menu Items */}
          <div className="menuItem">
            <Link className="link" to="/#uvod">
              Úvod
            </Link>
          </div>
          <div className="menuItem">
            <Link className="link" to="/#sluzby">
              Služby
            </Link>
          </div>
          <div className="menuItem">
            <Link className="link" to="/rezervace">
              Rezervace
            </Link>
          </div>
          <div className="menuItem">
            <Link className="link" to="/#kdojsem">
              Já
            </Link>
          </div>
          <div className="menuItem">
            <Link className="link" to="/#galerie">
              Galerie
            </Link>
          </div>
          <div className="menuItem">
            <Link className="link" to="/#kontakt">
              Kontakt
            </Link>
          </div>
        </div>
      </div>

      <div className="navbar-phone">
        <div className="left">
          <Link className="link" to="/#uvod">
            <img src={require("../../media/logoVector.png")} alt="" />
          </Link>
        </div>
        <div className="right">
          {/* Hamburger Icon */}
          <button className="toggle-button" onClick={toggleMenu}>
            <MenuIcon
              className="toggle-button-icon"
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </button>
          {/* Menu Items */}
          <div className={`menuItems ${isOpen ? "open" : ""}`}>
            <div className="menuItem">
              <Link className="link" to="/#uvod">
                Úvod
              </Link>
            </div>
            <div className="menuItem">
              <Link className="link" to="/#sluzby">
                Služby
              </Link>
            </div>
            <div className="menuItem">
              <Link className="link" to="/rezervace">
                Rezervace
              </Link>
            </div>
            <div className="menuItem">
              <Link className="link" to="/#kdojsem">
                Já
              </Link>
            </div>
            <div className="menuItem">
              <Link className="link" to="/#galerie">
                Galerie
              </Link>
            </div>
            <div className="menuItem">
              <Link className="link" to="/#kontakt">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
