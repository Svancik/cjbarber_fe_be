import React from "react";
import "./footer.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export const Footer = () => {
  return (
    <div className="footerWrapper" id="kontakt">
      <div className="footerMiddle">
        <div className="footerRow">
          <LocationOnIcon className="mui" />
          <div className="location">
            <span className="name">CJ´s BARBERSHOP</span>
            <span>Orlova 135, Roudnice nad Labem</span>
          </div>
        </div>

        <div className="footerRow">
          <PhoneCallbackIcon className="mui" />
          <span className="bold">+420 777 606 447</span>
        </div>

        <div className="footerRow">
          <a href="https://www.instagram.com/cjs_barbershop_/">
            <Instagram className="mui" />

            <span className="bold">Instagram</span>
          </a>
        </div>

        <div className="footerRow">
          <a href="https://www.facebook.com/people/CJs-Barbershop/100085528367093/?paipv=0&eav=AfaQY-IKyy9lxJp4JMa3QQEH83xOL7OL-Ginrkw_dCSDRNFQtc_y361ICmOeMMIrY&_rdr">
            <FacebookIcon className="mui" />
            <span className="bold">Facebook</span>
          </a>
        </div>

        <div className="footerRow">
          <a href="https://www.tiktok.com/@cj_s_barbershop">
            <MusicNoteIcon className="mui" />

            <span className="bold">Tik Tok</span>
          </a>
        </div>
      </div>
    </div>
  );
};
