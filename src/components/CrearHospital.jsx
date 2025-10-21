import { useState, useNavigate } from "react";
import { Global } from "../Global";
import axios from "axios";

export default function CrearHospital() {
  const urlHospital = Global.apiHospitales;


  const [formData, setFormData] = useState({
    idhospital: "",
    nombre: "",
    direccion: "",
    telefono: "",
    camas: "",
  });

const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    const hospital = {
      idhospital: parseInt(formData.idhospital),
      nombre: formData.nombre,
      direccion: formData.direccion,
      telefono: formData.telefono,
      camas: parseInt(formData.camas),
    };

    insertHospital(hospital);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const insertHospital = (hospital) => {
    let request = 'webresources/hospitales/post'

    axios.post(urlHospital+request, hospital).then((response) => {
        setMensaje(response.status)
    }).catch((error) => {
        setMensaje(error.response?.status || 'Error')
    })

  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Crear Hospital</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="idhospital" className="font-semibold">
          Id Hospital
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="idhospital"
          value={formData.idhospital}
          placeholder="Id"
          onChange={handleChange}
        />

        <label htmlFor="nombre" className="font-semibold">
          Nombre
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="nombre"
          value={formData.nombre}
          placeholder="Nombre"
          onChange={handleChange}
        />

        <label htmlFor="direccion" className="font-semibold">
          Dirección
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="direccion"
          value={formData.direccion}
          placeholder="Dirección"
          onChange={handleChange}
        />

        <label htmlFor="camas" className="font-semibold">
          Camas
        </label>
        <input
          type="number"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="camas"
          value={formData.camas}
          placeholder="Camas"
          onChange={handleChange}
        />

        <label htmlFor="telefono" className="font-semibold">
          Teléfono
        </label>
        <input
          type="tel"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="telefono"
          value={formData.telefono}
          placeholder="Teléfono"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
