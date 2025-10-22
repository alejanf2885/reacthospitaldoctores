import { useEffect, useState } from "react"
import { Global } from "../Global";
import axios from "axios";

export default function EmpleadosPorHospital(props) {
    
    const [empleados, setEmpleados] = useState([]);

    const url = Global.apiHospitales

    useEffect(() => {
        loadEmpleados()
    },[props.id])

    const loadEmpleados = () => {
        let request = 'api/Trabajadores/TrabajadoresHospital/' + props.id

        axios.get(url+request).then((response)=>{
            setEmpleados(response.data)
        })

    }


    return(
        <div className="mx-auto px-4 py-10"> 
            <ul>
                {empleados.map((empleado) => (
                    <li key={empleado.idTrabajador} className="mb-2 border-b pb-2">
                        <strong>{empleado.apellido}</strong> - {empleado.oficio} <br />
                        Salario: ${empleado.salario} <br />
                        ID Hospital: {empleado.idHospital}
                    </li>
                ))}
            </ul>

        </div>
    )
};
