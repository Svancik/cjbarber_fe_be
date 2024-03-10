export const servicesCategories = [
  {
    id: 1,
    icon: "vlasyStrih",
    header: "Vlasy",  
  },

  {
    id: 2,
    icon: "vousyUprava",
    header: "Úprava vousů",
   
  },

  {
    id: 3,
    icon: "vlasyStrihaVousyUprava",
    header: "Kombinace"
  },

  {
    id: 4,
    icon: "fajnsmekr",
    header: "Extravagant"
  },

  {
    id: 5,
    icon: "vlasyStrihVousyHotTowel",
    header: "Přídavky",
    isAdditional: true
  },
]


export const services = [
  //VLASY
    {
      id: 1,
      categoryId: 1, 
      nazev: "Vlasy jednou velikostí",
      cena: 240,     
      delkaTrvani: 15 
    },
    {
      id: 2,
      categoryId: 1, 
      nazev: "Klasický střih",
      cena: 360,    
      delkaTrvani: 30  
    },
    {
      id: 3,
      categoryId: 1, 
      nazev: "Buzzcut (vršek strojkem, strany skin fade)",
      cena: 430,     
      delkaTrvani: 30 
    },
    {
      id: 4,
      categoryId: 1, 
      nazev: "Premium střih (skin fade)",
      cena: 450,     
      delkaTrvani: 45 
    },
    {
      id: 5,
      categoryId: 1, 
      nazev: "Vlasy dlouhé",
      cena: 450,      
      delkaTrvani: 60
    },



    //ÚPRAVA VOUSŮ
    {
      id: 6,
      categoryId: 2, 
      nazev: "Vousy krátké",
      cena: 350, 
      delkaTrvani: 30     
    },
    {
      id: 7,
      categoryId: 2, 
      nazev: "Vousy dlouhé",
      cena: 380,  
      delkaTrvani: 30   
    },
    {
      id: 8,
      categoryId: 2, 
      nazev: "Holení dohladka",
      cena: 450,  
      delkaTrvani: 40   
    },



    //KOMBINACE

    {
      id: 10,
      categoryId: 3, 
      nazev: "Střih strojkem (1 velikost) + vousy krátké",
      cena: 490, 
      delkaTrvani: 45     
    },
    {
      id: 11,
      categoryId: 3, 
      nazev: "Střih strojkem (1 velikost) + vousy dlouhé",
      cena: 640,     
      delkaTrvani: 45
    },
    {
      id: 12,
      categoryId: 3, 
      nazev: "Klasický střih + vousy krátké",
      delkaTrvani: 60,
      cena: 530,     
    },
    {
      id: 13,
      categoryId: 3, 
      nazev: "Klasický střih + vousy dlouhé",
      delkaTrvani: 60,
      cena: 650,     
    },
    {
      id: 14,
      categoryId: 3, 
      nazev: "Premium střih (skin fade) + vousy krátké",
      delkaTrvani: 75,
      cena: 650,     
    },
    {
      id: 15,
      categoryId: 3, 
      nazev: "Premium střih (skin fade) + vousy dlouhé",
      cena: 650,  
      delkaTrvani: 75,   
    },
    {
      id: 16,
      categoryId: 3, 
      nazev: "Buzzcut + vousy krátké",
      cena: 680,     
      delkaTrvani: 60,
    },
    {
      id: 17,
      categoryId: 3, 
      nazev: "Buzzcut + vousy dlouhé",
      cena: 730,    
      delkaTrvani: 60, 
    },
    {
      id: 18,
      categoryId: 3, 
      nazev: "Vlasy dlouhé + vousy krátké",
      cena: 800, 
      delkaTrvani: 90    
    },
    {
      id: 19,
      categoryId: 3, 
      nazev: "c",
      cena: 880,     
      delkaTrvani: 90
    },



    //EXTRAVAGANT
    {
      id: 20,
      categoryId: 4,
      nazev: "Vlasy, vousy/holení do hladka, péče o pleť, styling, balzám na vousy, foukání, káva",
      cena: 1700,
      delkaTrvani: 90
    },



    //PŘÍDAVKY
    {
      id: 21,
      categoryId: 5, 
      nazev: "Péče o pleť",
      cena: 960,     
      delkaTrvani: 10,
    },
    {
      id: 22,
      categoryId: 5, 
      nazev: "Barvení vousů",
      cena: 250,   
      delkaTrvani: 10,  
    },
    {
      id: 23,
      categoryId: 5, 
      nazev: "Hair Tattoo",
      cena: 100,    
      delkaTrvani: 10, 
    },
    {
      id: 24,
      categoryId: 5, 
      nazev: "Černá maska",
      cena: 100, 
      delkaTrvani: 10,    
    },
    {
      id: 25,
      categoryId: 5, 
      nazev: "Depilace voskem",
      cena: 60,     
      delkaTrvani: 10,
    },
    {
      id: 26,
      categoryId: 5, 
      nazev: "Depilace očí",
      cena: 100,    
      delkaTrvani: 10, 
    },
    {
      id: 27,
      categoryId: 5, 
      nazev: "Mytí hlavy",
      cena: 50,     
      delkaTrvani: 10,
    },
    {
      id: 28,
      categoryId: 5, 
      nazev: "Styling",
      cena: 50,   
      delkaTrvani: 10,  
    },
    {
      id: 29,
      categoryId: 5, 
      nazev: "Foukání vousů + balzám",
      cena: 50,     
      delkaTrvani: 10,
    },












    {
      id: 5,
      icon: "vousyUprava",
      time: "30",
      header: "Úpra",
      cena: "300",
      text: "Úprava vousů strojkem, ošetření vousů balzámem či olejem na vousy, úprava obočí a kontur, opálení uší, kolínská dle výběru. Nápoje samozřejmostí (Coca Cola, voda, káva, čaj)."
    },
    {
      id: 5,
      icon: "vlasyStrihaVousyUprava",
      time: "60",
      header: "Střih vlasů + vousy strojkem",
      cena: "700",
      text: "Střih vlasů, úprava obočí a kontur, mytí vlasů, opálení uší, styling a kolínská dle výběru. Nápoje samozřejmostí (Coca Cola, voda, káva, čaj)."
    },
    {
      id: 6,
      icon: "vlasyStrihVousyHotTowel",
      time: "75",
      header: "Střih vlasů + úprava vousů (Hot towel)",
      cena: "900",
      text: "Střih vlasů a úprava vousů břitvou (Hot towel + napaření steamerem (holení s párou), zastřižení tvaru vousů strojkem před holením, úprava obočí a kontur, mytí vlasů, opálení uší, balzám před holením, ošetření balzámem po holení, závěrečná úprava vousů, balzám či olej na vousy, styling a kolínská dle výběru. Nápoje samozřejmostí (Coca Cola, voda, káva, čaj)."
    },
    {
      id: 5,
      icon: "fajnsmekr",
      time: "90",
      header: "Masírek",
      cena: "1490",
      text: "Úprava vousů břitvou (Hot towel + napaření steamerem (holení s párou), peeling obličeje, ošetření balzámem po holení, závěrečná úprava vousů, balzám či olej na vousy, styling, kolínská či parfémová voda dle výběru, parafínový zábal rukou, depilace chloupků v nose, masáž hlavy. "
    },
    

]

export const visibleGalleryItems = [
  {
      id: 1,
      src: "strih1.JPG"
  },
  {
      id: 2,
      src: "videoStrih1.MP4",
      extraCSS: "bigItem",
      video: true,
  },
  {
      id: 3,
      src: "strih2.JPG",
  },
  {
      id: 4,
      src: "strih3.JPG",
  },
  {
      id: 5,
      src: "strih5.JPG",
  },
  {
      id: 6,
      src: "strih7.JPG",
  },
  {
      id: 7,
      src: "strih8.JPG",
  },
]

export const hiddenGalleryItems = [
  {
   id: 8,
   src: "strih11.JPG" 
  },
  {
   id: 9,
   src: "videoStrih2.MP4",
   video: true,
   extraCSS: "mediumItem" 
  },
  {
   id: 10,
   src: "strih12.JPG" 
  },
  {
   id: 11,
   src: "strih4.JPG" 
  },
  {
   id: 12,
   src: "strih6.JPG" 
  },
  {
   id: 13,
   src: "strih9.JPG" 
  },
  {
   id: 14,
   src: "strih10.JPG" 
  },
  {
   id: 15,
   src: "strih13.JPG" 
  },
  {
   id: 16,
   src: "strih14.JPG" 
  },
  {
   id: 17,
   src: "strih15.jpg" 
  },
  {
   id: 18,
   src: "strih16.jpg" 
  },
]

export const times = [
  {timeBlock: "10:00"},
  {timeBlock: "11:00"},
  {timeBlock: "12:00"},
  {timeBlock: "13:00"},
  {timeBlock: "14:00"},
  {timeBlock: "15:00"},
  {timeBlock: "16:00"},
  {timeBlock: "17:00"},
  {timeBlock: "18:00"},
  {timeBlock: "19:00"},
  {timeBlock: "20:00"},
  {timeBlock: "21:00"},
]