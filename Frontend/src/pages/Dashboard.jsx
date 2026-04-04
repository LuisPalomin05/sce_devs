import "../assets/dashboard.css";
import { Route, Routes } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import SideBar from "../components/SideBar";
import Configuracion from "./Configuracion";
import HomeDashboard from "./HomeDashboard";
import Ventas from "./Ventas";


const Dashboard = () => {
  return (
    <div className="Dashboard">
      <SideBar />
      <div className="MainContent">
        <HeaderPage />
        <main>
          <Routes>
            <Route path={"settings"} element={<Configuracion />} />
            <Route path={"/"} element={<HomeDashboard />} />
            <Route path={"/ventas"} element={<Ventas />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
