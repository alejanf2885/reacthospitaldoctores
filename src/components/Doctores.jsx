import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../Global";
import axios from "axios";
import DetallesDoctor from "./DetallesDoctor";

export default function Doctores() {
  const urlDoctores = Global.apiDoctores;

  const { idhospital } = useParams();

  const [doctores, setDoctores] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  useEffect(() => {
    setSelectedDoctorId(null)
    loadDoctores();
  }, [idhospital]);

  const loadDoctores = () => {
    let request = "api/Doctores/DoctoresHospital/" + idhospital;

    axios.get(urlDoctores + request).then((response) => {
      setDoctores(response.data);
    });
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Doctores del Hospital
          </h1>
          <p className="text-lg text-gray-600">Hospital ID: {idhospital}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {doctores && doctores.length > 0 ? (
            doctores.map((doctor, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-indigo-500"
              >
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-indigo-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {doctor.apellido}
                    </h3>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Especialidad:</span>
                    <span className="text-indigo-600">
                      {doctor.especialidad}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Salario:</span>
                    <span className="text-green-600 font-semibold">
                      {doctor.salario.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <button
                      onClick={() => setSelectedDoctorId(doctor.idDoctor)}
                      className="bg-indigo-500 text-white px-4 py-1  rounded-xl hover:cursor-pointer "
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-xl text-gray-500">
                No hay doctores disponibles
              </h2>
            </div>
          )}
        </div>

        {selectedDoctorId != null ? (
          <DetallesDoctor iddoctor={selectedDoctorId} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
