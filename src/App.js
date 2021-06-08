import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  //Localstorage:
  let citasPrevias = JSON.parse(localStorage.getItem("citas"));
  if (!citasPrevias) {
    citasPrevias = [];
  }
  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasPrevias);
  //Use Effect realiza ciertas operaciones cuando cambia el state

  useEffect(() => {
    let citasPrevias = JSON.parse(localStorage.getItem("citas"));

    if (citasPrevias) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  //Funcion que tome las cita actual y la agrega a la lista
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //Funcion para eliminar una cita:

  const eliminarCita = (id) => {
    // console.log(id);
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };
  //MEnsaje condicional
  //console.log(citas.length);     citas esta vacio entonces muestro un mensaje
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";
  return (
    <Fragment>
      <h1>Administrador de citas</h1>;
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
