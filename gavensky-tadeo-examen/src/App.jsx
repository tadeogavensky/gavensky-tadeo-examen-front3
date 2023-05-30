import { useState } from "react";

import "./App.css";
import Card from "./components/Card";

function App() {
  const student = {
    name: "Tadeo Gavensky",
    commission: 9,
    age: 18,
    favourite_pokemon: "Bulbasur",
  };
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1>Carga de estudiantes</h1>
      <form></form>
      <Card student={student} />
    </div>
  );
}

export default App;
