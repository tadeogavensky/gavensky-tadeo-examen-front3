import React from "react";

const Card = (props) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-md w-[250px] shadow-md py-4">
      Hola, soy una tarjeta
      <h1 className="text-2xl font-bold">{props.student.name}</h1>
      <p>Camada: {props.student.commission}</p>
      <p>Edad: {props.student.age}</p>
      <p>Pokémon favorito: {props.student.favourite_pokemon}</p>
    </div>
  );
};


export default Card;
