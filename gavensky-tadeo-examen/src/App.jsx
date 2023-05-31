import { useEffect, useState } from "react";

import Card from "./components/Card";

function App() {
  const [wizard, setWizard] = useState({});

  const [wizards, setWizards] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");

  const [error, isError] = useState(false);

  const [characters, setCharacters] = useState([{}]);

  const houses = ["Gryffindor", "Hufflepuff", "Slytherin", "Ravenclaw"];

  const url = "https://hp-api.onrender.com/api/characters";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error) {
      setErrorMsg("Por favor chequea que la información sea correcta");
    } else {
      console.log("wizard :>> ", wizard);

      setWizards((prevState) => [...prevState, wizard]);
    }
  };

  const regex = /^[^\s][^\s]{2,}$/;

  const fetchApi = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
      });
  };

  useEffect(() => {
    console.log("errorMsg :>> ", errorMsg);
    fetchApi();
  }, []);

  const handleFirstInput = (e) => {
    if (!regex.test(e.target.value) && e.target.value.length > 0) {
      setErrorMsg("Por favor chequea que la información sea correcta");

      isError(true);
    } else {
      isError(false);
      setErrorMsg("");

      setWizard((prevState) => ({
        ...prevState,
        name: e.target.value,
      }));
    }
  };

  const handleSecondInput = (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 6) {
      setErrorMsg("Por favor chequea que la información sea correcta");

      isError(true);
    } else {
      isError(false);
      setErrorMsg("");

      setWizard((prevState) => ({
        ...prevState,
        color: e.target.value,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-10">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">
          Crea tu perfil del Wizarding World
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center  bg-white rounded-md w-[300px] shadow-md p-4 gap-2 text-center"
        >
          <div className="flex flex-col">
            <label>Nombre</label>
            <input
              type="text"
              placeholder=""
              className="border-gray-500 border-2 rounded-md  px-2"
              onChange={(e) => {
                handleFirstInput(e);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>Ingresar tu color favorito (HEX)</label>
            <input
              type="text"
              placeholder=""
              className="border-gray-500 border-2 rounded-md  px-2"
              onChange={(e) => {
                handleSecondInput(e);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>Elegí tu casa de Hogwarts</label>
            <select
              className="border-gray-500 border-2 rounded-md  px-2 py-1"
              onChange={(e) => {
                console.log("e.target.value :>> ", e.target.value);
                setWizard((prevState) => ({
                  ...prevState,
                  house: e.target.value,
                }));
              }}
            >
              {houses.map((house, index) => {
                return (
                  <option key={index} value={house}>
                    {house}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Personaje de Harry Potter favorito</label>
            <select
              className="border-gray-500 border-2 rounded-md px-2 py-1"
              onChange={(e) => {
                const selectedCharacter = JSON.parse(e.target.value); // Parse the selected value as an object
                console.log("selectedCharacter: ", selectedCharacter);
                setWizard((prevState) => ({
                  ...prevState,
                  favourite_harry_potter_character: selectedCharacter.name,
                  image: selectedCharacter.image
                }));
              }}
            >
              {characters.map((character, index) => (
                <option key={index} value={JSON.stringify(character)}>
                  {" "}
                  {character.name}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-blue-300 text-white rounded-md px-2 py-1 mt-3 hover:bg-blue-500 transition-all duration-300 ease-in-out">
            Agregar mago
          </button>
        </form>
      </div>

      {errorMsg && <span className="text-red-500 font-bold">{errorMsg}</span>}

      <div className="grid grid-flow-row-dense grid-cols-3 gap-3">
        {wizards.map((wizard, index) => {
          return (
            <div key={index}>
              <Card wizard={wizard} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
