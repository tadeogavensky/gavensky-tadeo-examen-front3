import { useEffect, useState } from "react";

import Card from "./components/Card";

function App() {
  const [student, setStudent] = useState({
    name: "",
    commission: "",
    favourite_harry_potter_character: "",
  });

  const [students, setStudents] = useState([]);

  const [errorMsg, setErrorMsg] = useState({
    firstInput: "",
    secondInput: "",
    general: "",
  });

  const [error, isError] = useState(false);

  const [characters, setCharacters] = useState([{}]);

  const url = "https://hp-api.onrender.com/api/characters";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error) {
      setErrorMsg((prevState) => ({
        ...prevState,
        general: "Por favor chequea que la información sea correcta",
      }));
    } else {
      console.log("student :>> ", student);
      setStudents((prevState) => [...prevState, student]);
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
    if (!regex.test(e.target.value)) {
      setErrorMsg((prevState) => ({
        ...prevState,
        firstInput: "El nombre debe ser mayor a 3 caracteres",
      }));

      isError(true);
    } else {
      isError(false);
      setErrorMsg((prevState) => {
        ({ ...prevState, firstInput: "" });
      });

      setStudent((prevState) => ({
        ...prevState,
        name: e.target.value,
      }));
    }
  };

  const handleSecondInput = (e) => {
    console.log('e.target.value.length :>> ', e.target.value.length);
    if (e.target.value.length < 6) {
      setErrorMsg((prevState) => {
        ({
          ...prevState,
          secondInput: "El x debe ser mayor a 6 caracteres",
        });
      });
      console.log('errorMsg.secondInput :>> ', errorMsg.secondInput);

      isError(true);
    } else {
      isError(false);
      setErrorMsg((prevState) => {
        ({ ...prevState, secondInput: "" });
      });

      setStudent((prevState) => ({
        ...prevState,
        commission: e.target.value,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 mt  -10">
      <div className="flex flex-col items-center">
        <h1>Carga de estudiantes</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center  bg-white rounded-md w-[300px] shadow-md p-4 gap-2"
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
            {errorMsg && errorMsg.firstInput && (
              <span className="text-red-500">{errorMsg.firstInput}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label>Camada</label>
            <input
              type="text"
              placeholder=""
              className="border-gray-500 border-2 rounded-md  px-2"
              onChange={(e) => {
                handleSecondInput(e);
              }}
            />
            {errorMsg && errorMsg.secondInput && (
              <span className="text-red-500">{errorMsg.secondInput}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label>Personaje de Harry Potter favorito</label>
            <select
              className="border-gray-500 border-2 rounded-md  px-2 py-1"
              onChange={(e) => {
                console.log("e.target.value :>> ", e.target.value);
                setStudent((prevState) => ({
                  ...prevState,
                  favourite_harry_potter_character: e.target.value,
                }));
              }}
            >
              {characters.map((character, index) => {
                return (
                  <option key={index} value={character.name}>
                    {character.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="bg-blue-300 text-white rounded-md px-2 py-1 mt-3 hover:bg-blue-500 transition-all duration-300 ease-in-out">
            Agregar estudiante
          </button>
        </form>
      </div>

      {errorMsg && errorMsg.general && (
        <span className="text-red-500 font-bold">{errorMsg.general}</span>
      )}

      <div className="grid grid-flow-row-dense grid-cols-3 gap-3">
        {students.map((student, index) => {
          return (
            <div key={index}>
              <Card student={student} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
