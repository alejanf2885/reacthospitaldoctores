import { useEffect, useState } from "react"
import { Global } from "../Global"
import axios from "axios";

export default function DetallesDoctor(props) {

    const urlDoctores = Global.apiDoctores;

    const[doctor, setDoctor] = useState([])


    useEffect(() => {
        loadDoctor();
    },[props.iddoctor])

    const loadDoctor = () => {
        let request = 'api/Doctores/' + props.iddoctor

        axios.get(urlDoctores+request).then((response) => {
            setDoctor(response.data)
        })

    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
                Detalles de Doctor: {props.iddoctor}
            </h2>
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                <div className="flex items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-semibold w-32">Apellido:</span>
                    <span className="text-gray-800 text-lg">{doctor.apellido}</span>
                </div>
                <div className="flex items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-semibold w-32">Especialidad:</span>
                    <span className="text-gray-800 text-lg">{doctor.especialidad}</span>
                </div>
                <div className="flex items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-semibold w-32">Salario:</span>
                    <span className="text-green-600 font-bold text-lg">{doctor.salario}€</span>
                </div>
                <div className="flex items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-semibold w-32">Id Hospital:</span>
                    <span className="text-gray-800 text-lg">{doctor.idHospital}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-600 font-semibold w-32">Id Doctor:</span>
                    <span className="text-gray-800 text-lg">{doctor.idDoctor}</span>
                </div>
            </div>
        </div>
    )
};
