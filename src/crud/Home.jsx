import { useEffect, useRef, useState } from "react";
import { Global } from "../Global";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Home() {
  const urlHospitales = Global.apiHospitales;
  const [hospitales, setHospitales] = useState([]);

  const idHospitalRef = useRef();
  const nombreHospitalRef = useRef();
  const dirHospitalRef = useRef();
  const tlfHospitalRef = useRef();
  const camasHospitalRef = useRef();

  useEffect(() => {
    loadHospitales();
  }, []);

  const loadHospitales = () => {
    let request = "api/Hospitales";
    axios.get(urlHospitales + request).then((response) => {
      setHospitales(response.data);
    });
  };

  const insertHospital = (event) => {
    event.preventDefault();

    let request = "api/Hospitales";

    const hospital = {
      idHospital: parseInt(idHospitalRef.current.value),
      nombre: nombreHospitalRef.current.value,
      direccion: dirHospitalRef.current.value,
      telefono: tlfHospitalRef.current.value,
      camas: parseInt(camasHospitalRef.current.value),
    };

    axios.post(urlHospitales + request, hospital).then(() => {
      loadHospitales();
    });
  };

  const deleteHospital = (id) => {
    let request = "api/Hospitales/" + id;


    axios.delete(urlHospitales + request).then(() => {
        loadHospitales()
    })
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-bold text-5xl text-center mb-10">Lista Hospitales</h1>

      {/* Formulario */}
      <form
        className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={insertHospital}
      >
        <div>
          <label htmlFor="idHospital" className="block font-semibold mb-1">
            ID:
          </label>
          <input
            type="number"
            ref={idHospitalRef}
            id="idHospital"
            name="idHospital"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="nombre" className="block font-semibold mb-1">
            Nombre:
          </label>
          <input
            type="text"
            ref={nombreHospitalRef}
            id="nombre"
            name="nombre"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="direccion" className="block font-semibold mb-1">
            Dirección:
          </label>
          <input
            type="text"
            ref={dirHospitalRef}
            id="direccion"
            name="direccion"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="telefono" className="block font-semibold mb-1">
            Teléfono:
          </label>
          <input
            type="text"
            ref={tlfHospitalRef}
            id="telefono"
            name="telefono"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="camas" className="block font-semibold mb-1">
            Camas:
          </label>
          <input
            type="number"
            ref={camasHospitalRef}
            id="camas"
            name="camas"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-full px-6 py-2 mt-2 hover:bg-blue-700 transition-colors"
        >
          Crear
        </button>
      </form>

      {/* Listado de hospitales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hospitales && hospitales.length > 0 ? (
          hospitales.map((hospital, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-start border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            >
              <NavLink
                to={`/hospital/${hospital.idHospital}`}
                className="w-full"
              >
                <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                  {hospital.nombre}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-bold">ID:</span> {hospital.idHospital}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-bold">Dirección:</span>{" "}
                  {hospital.direccion}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-bold">Teléfono:</span>{" "}
                  {hospital.telefono}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Camas:</span> {hospital.camas}
                </p>
              </NavLink>
              <button onClick={() => deleteHospital(hospital.idHospital)} className="bg-blue-600 text-white mt-5 rounded-full hover:cursor-pointer px-8 py-1">
                Borrar
              </button>
            </div>
          ))
        ) : (
          <h2 className="text-center text-xl text-gray-500 col-span-3">
            No hay hospitales disponibles.
          </h2>
        )}
      </div>
    </div>
  );
}
