import { NavLink, useNavigate } from "react-router-dom";
import Tajamar from '../assets/tajamar.jpg'
import { useEffect, useState } from "react";
import { Global } from '../Global'
import axios from "axios";

export default function Header() {
  const enlaces = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Crear Hospital", ruta: "/crearHospital" },
    { nombre: "Doctores 15", ruta: "/doctores/15" },
    { nombre: "Doctores 16", ruta: "/doctores/16" },
  ];

  const urlHospitales = Global.apiHospitales;

  const [hospitales, setHospitales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHospitales();
  }, []);

  const loadHospitales = () => {
    let request = '/webresources/hospitales';

    axios.get(urlHospitales + request).then((response) => {
      setHospitales(response.data);
    });
  };

  // Función para manejar cambio en el dropdown
  const handleHospitalChange = (e) => {
    const hospitalId = e.target.value;
    if (hospitalId) {
      navigate(`/doctores/${hospitalId}`);
    }
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Izquierda: Logo + Nombre */}
        <div className="flex items-center space-x-2">
          <img src={Tajamar} alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">MiSitio</span>
        </div>

        {/* Centro: Enlaces + Dropdown */}
        <nav className="space-x-6 hidden md:flex items-center">
          {enlaces.map((enlace,i) => (
            <NavLink
              key={i}
              to={enlace.ruta}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }
            >
              {enlace.nombre}
            </NavLink>
          ))}

          {/* Dropdown para hospitales */}
          <select
            onChange={handleHospitalChange}
            defaultValue=""
            className="ml-4 border border-gray-300 rounded px-2 py-1"
          >
            <option value="" disabled>
              Selecciona hospital
            </option>
            {hospitales.map((hospital,i) => (
              <option key={i} value={hospital.idhospital}>
                {hospital.nombre}
              </option>
            ))}
          </select>
        </nav>

        {/* Derecha: Botón */}
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}
