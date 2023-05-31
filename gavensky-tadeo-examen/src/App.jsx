import { useState } from "react";

import Card from "./components/Card";

function App() {
  const [student, setStudent] = useState({});

  const [students, setStudents] = useState([]);

  const [errorMsg, setErrorMsg] = useState({
    commission: "",
    age: "",
  });

  const [error, isError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error) {
      return;
    } else {
      setStudents((prevState) => [...prevState, student]);
    }
  };

  const regexNumber = /^\d+$/;

  const handleComissionInput = (e) => {
    if (!regexNumber.test(e.target.value)) {
      setErrorMsg((prevState) => ({
        ...prevState,
        commission: "Commission input must be a number",
      }));
      isError(true);
    } else {
      isError(false);
      setErrorMsg((prevState) => ({
        ...prevState,
        commission: "",
      }));
      setStudent((prevState) => ({
        ...prevState,
        commission: e.target.value,
      }));
    }
  };

  const handleAgeInput = (e) => {
    if (!regexNumber.test(e.target.value)) {
      setErrorMsg((prevState) => ({
        ...prevState,
        age: "Age input must be a number",
      }));
      isError(true);
    } else {
      isError(false);
      setErrorMsg((prevState) => ({
        ...prevState,
        age: "",
      }));
      setStudent((prevState) => ({
        ...prevState,
        age: e.target.value,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 mt  -10">
      <div className="flex flex-col items-center">
        <h1>Carga de estudiantes</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center  bg-white rounded-md w-[300px] shadow-md p-4"
        >
          <div className="flex flex-col">
            <label>Nombre</label>
            <input
              type="text"
              placeholder=""
              className="border-gray-500 border-2 rounded-md  px-2"
              onChange={(e) => {
                setStudent((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>Camada</label>
            <input
              type="text"
              placeholder=""
              className="border-gray-500 border-2 rounded-md  px-2"
              onChange={(e) => {
                handleComissionInput(e);
              }}
            />
            {errorMsg && (
              <span className="text-red-500">{errorMsg.commission}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label>Edad</label>
            <input
              type="text"
              placeholder=""
              className="border-gray-500 border-2 rounded-md  px-2"
              onChange={(e) => {
                handleAgeInput(e);
              }}
            />
            {errorMsg && <span className="text-red-500">{errorMsg.age}</span>}
          </div>

          <button className="bg-blue-300 text-white rounded-md px-2 py-1 mt-3 hover:bg-blue-500 transition-all duration-300 ease-in-out">
            Agregar estudiante
          </button>
        </form>
      </div>

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
