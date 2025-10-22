import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../Global";
import axios from "axios";

export default function Empleados() {
  const { idhospital } = useParams();
  const [empleados, setEmpleados] = useState([]);

  const urlHospital = Global.apiHospitales;

  const loadEmpleados = () => {
    let request = 'api/Trabajadores/TrabajadoresHospital/' + idhospital;
    axios.get(urlHospital + request).then((response) => {
      setEmpleados(response.data);
    });
  };

  useEffect(() => {
    loadEmpleados();
  }, [idhospital]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-bold text-5xl text-center mb-10">Lista Empleados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          empleados && empleados.length > 0 ? (
            empleados.map((empleado, i) => (
              <div key={i} className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-start border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-green-700 mb-2">{empleado.apellido}</h2>
                <p className="text-gray-600 mb-1"><span className="font-bold">ID Trabajador:</span> {empleado.idTrabajador}</p>
                <p className="text-gray-600 mb-1"><span className="font-bold">Oficio:</span> {empleado.oficio}</p>
                <p className="text-gray-600 mb-1"><span className="font-bold">Salario:</span> ${empleado.salario.toLocaleString()}</p>
                <p className="text-gray-600"><span className="font-bold">ID Hospital:</span> {empleado.idHospital}</p>
              </div>
            ))
          ) : (
            <h2 className="text-center text-xl text-gray-500 col-span-3">No hay empleados disponibles.</h2>
          )
        }
      </div>
    </div>
  );
}
