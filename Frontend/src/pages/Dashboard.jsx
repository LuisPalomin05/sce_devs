import "../assets/dashboard.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import HeaderPage from "../components/HeaderPage";
import SideBar from "../components/SideBar";

import Configuracion from "./Configuracion";
import HomeDashboard from "./HomeDashboard";
import Ventas from "./Ventas";
<<<<<<< Updated upstream
=======
import Usuario from "./Usuario";
import CreateProducto from '../components/CreateProducto'

>>>>>>> Stashed changes

const Dashboard = () => {

  useEffect(() => {
  const tenant = localStorage.getItem("tenant") || "torque";

  document.body.classList.remove("theme-torque", "theme-irontools");
  document.body.classList.add(`theme-${tenant}`);
}, []);

  return (
    <div className="Dashboard">
      <SideBar />

      <div className="MainContent">
        <HeaderPage />

        <main>
          <Routes>
<<<<<<< Updated upstream
            <Route path="/" element={<HomeDashboard />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="settings" element={<Configuracion />} />
=======
            <Route path={"/"} element={<HomeDashboard />} />
            <Route path={"/ventas"} element={<Ventas />} />
            <Route path={"/almacen"} element={<Almacen />} />
            {/* <Route path={"/almacen/*"} element={<CreateProducto />} /> */}
            <Route path="/almacen/edit/:id" element={<CreateProducto />} />
            <Route path="/almacen/create" element={<CreateProducto />} />
            <Route path={"/users"} element={<Usuario />} />
            <Route path={"/settings"} element={<Configuracion />} />

>>>>>>> Stashed changes
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;