import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Doctores from "./components/Doctores";
import CrearHospital from "./components/CrearHospital";

export default function Router() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crearHospital" element={<CrearHospital />} />
        <Route path="/doctores/:idhospital" element={<Doctores />} />
      </Routes>
    </BrowserRouter>
  );
}
