import React from "react";

const Card = (props) => {
  const color = props.wizard.color;
  let textColor;

   const getLuminance = (color) => {
    const rgb = color.startsWith("#") ? color.substring(1) : color;
    const r = parseInt(rgb.substr(0, 2), 16) / 255;
    const g = parseInt(rgb.substr(2, 2), 16) / 255;
    const b = parseInt(rgb.substr(4, 2), 16) / 255;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance;
  };


  if (getLuminance(color) < 0.5) {
    textColor = "#FFFFFF"; 
  } else {
    textColor = "#000000"; 
  }


  return (
    <div
      className={`flex flex-col items-center rounded-md w-[250px] shadow-md py-4`}
      style={{ backgroundColor: `#${color}`, color: textColor }}
    >
      Perfil de Mago
      <h2 className="text-2xl font-bold">{props.wizard.name}</h2>
      <div className="w-5">
      <img src={props.wizard.image} alt="" className="w-full object-contain" />
      </div>
      <p>Casa: {props.wizard.house}</p>
      <p className="flex flex-col items-center">
        Personaje de HP favorito:
        <span> {props.wizard.favourite_harry_potter_character}</span>
      </p>
    </div>
  );
};

export default Card;
