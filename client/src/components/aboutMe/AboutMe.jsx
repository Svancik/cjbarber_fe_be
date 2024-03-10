import React from "react";
import "./aboutMe.css";

export const AboutMe = () => {
  return (
    <div
      className="aboutMeWrapper"
      id="kdojsem"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      {" "}
      <h1>KDO JSEM</h1>
      <hr className="headerUnderline" />
      <div className="aboutMe">
        <div className="left">
          <img src={require("../../media/samPortrait.jpg")} alt="" />
        </div>
        <div className="right">
          <br />
          <br />
          <h2>Sam</h2>
          <span>
            Jmenuji se Sam a s hrdostí mohu říci, že stříhání a holení není jen
            mojí prací, ale vášní, které se věnuji už přes 7 let. Můj osobitý
            přístup ke každému klientovi spočívá v tom, že se snažím nejen
            pochopit, co od svého účesu očekává, ale také se s ním skutečně
            spojit a vytvořit vztah založený na důvěře a vzájemném respektu.
          </span>{" "}
          <br />
          <span>
            Můj barber shop je místem, kde se tradice spojuje s moderními
            trendy, a kde vkládám své srdce a duši do každého zákazníka,
            vytvářejíc s nimi nejen úžasný vzhled, ale i dlouhotrvající vztahy.
          </span>{" "}
          <br />
          <span>
            Jsem přesvědčen, že klíčem k úspěchu je komunikace. Proto vždy dbám
            na to, aby si každý klient odnesl nejen skvělý vzhled, ale i pocit,
            že byl vyslyšen. Věřím, že právě toto dělá z každé návštěvy u mě
            něco speciálního.
          </span>
        </div>
      </div>
    </div>
  );
};
