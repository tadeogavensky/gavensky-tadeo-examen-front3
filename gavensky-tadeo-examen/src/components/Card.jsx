import React from "react";

const Card = (props) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-md w-[250px] shadow-md py-4">
      Hola, soy una tarjeta
      <h2 className="text-2xl font-bold">{props.student.name}</h2>
      <p>Camada: {props.student.commission}</p>
      <p className="flex flex-col items-center">
        Personaje de HP favorito:
        <span> {props.student.favourite_harry_potter_character}</span>
      </p>
    </div>
  );
};

export default Card;
