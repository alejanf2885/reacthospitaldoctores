import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom'
import { Global } from "../Global";
import EmpleadosPorHospital from "./EmpleadosPorHospital";

export default function Multiple() {
  const [hospitales, setHospitales] = useState([]);
  const [idHospitales, setIdHospitales] = useState([]);

  const urlHospital = Global.apiHospitales;

    const navigate = useNavigate();


  useEffect(() => {
    loadHospitales();
  }, []);

  const loadHospitales = () => {
    let request = "api/Hospitales";

    axios.get(urlHospital + request).then((response) => {
      setHospitales(response.data);
    });
  };

  const onHandleChange = (e) => {
    const opciones = Array.from(e.target.selectedOptions); // Convertimos a array
    const idsSeleccionados = opciones.map((opcion) => Number(opcion.value));

    console.log(idsSeleccionados);
    setIdHospitales(idsSeleccionados);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1>Lista de hospitales</h1>
       <button onClick={() => {
        navigate('/hola')
       }}>
        IR A
       </button>
      <select onChange={onHandleChange} className="" name="" id="" multiple>
        {hospitales && hospitales.length > 0 ? (
          hospitales.map((hospital, i) => (
            <option key={i} value={hospital.idHospital}>
              {hospital.nombre}
            </option>
          ))
        ) : (
          <option>No hay opcion</option>
        )}
      </select>
      <div className="list">
        {idHospitales && idHospitales.length > 0 ? (
          idHospitales.map((hospital) => (
            <EmpleadosPorHospital key={hospital} id={hospital} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
