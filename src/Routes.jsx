import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./crud/Home";
import Header from "./components/Header";
import Empleados from "./crud/Empleados";
import Multiple from "./crud/Multiple";

export default function Router() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multiple" element={<Multiple />} />
        <Route path="/hospital/:idhospital" element={ <Empleados/>} />
        
      </Routes>
    </BrowserRouter>
  );
}
