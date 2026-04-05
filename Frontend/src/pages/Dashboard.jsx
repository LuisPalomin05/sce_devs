import "../assets/dashboard.css";
import { Route, Routes } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import SideBar from "../components/SideBar";
import Configuracion from "./Configuracion";
import HomeDashboard from "./HomeDashboard";
import Almacen from "./Almacen";
import Ventas from "./Ventas";
import CreateProducto from '../components/CreateProducto'


const Dashboard = () => {
  return (
    <div className="Dashboard">
      <SideBar />
      <div className="MainContent">
        <HeaderPage />
        <main>
          <Routes>
            <Route path={"/"} element={<HomeDashboard />} />
            <Route path={"/ventas"} element={<Ventas />} />
            <Route path={"/almacen"} element={<Almacen />} />
            <Route path={"/almacen/*"} element={<CreateProducto />} />
            <Route path={"/settings"} element={<Configuracion />} />

          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
