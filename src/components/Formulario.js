import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  //State en citas:
  const [cita, actualizaCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, actualizaError] = useState(false);
  //Funcion cuando se escribe en un input

  const handleChange = (e) => {
    //console.log(e.target.value);
    actualizaCita({
      ...cita, //copia del state
      [e.target.name]: e.target.value,
    });
  };

  //Extraer valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Funcion submit:

  const submitCita = (e) => {
    e.preventDefault();
    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      // console.log("hay un error");
      actualizaError(true);
      return;
    }
    actualizaError(false);

    //Asignar id
    cita.id = uuidv4();
    //Crear la cita
    crearCita(cita);
    //Reiniciar el form
    actualizaCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label htmlFor="">Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="mascota"
          onChange={handleChange}
          value={mascota}
        />

        <label>Nombre Responsable</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="nombre y apellido del dueño"
          onChange={handleChange}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleChange}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleChange}
          value={hora}
        />

        <label>Sintomas</label>
        <textarea
          name="sintomas"
          onChange={handleChange}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};
export default Formulario;
