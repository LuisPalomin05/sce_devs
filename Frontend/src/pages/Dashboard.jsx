import "../assets/dashboard.css";
import { Route, Routes } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import SideBar from "../components/SideBar";
import Configuracion from "./Configuracion";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <SideBar />
      <div className="MainContent">
        <HeaderPage />
        <main>
          <Routes>
            <Route path={"settings"} element={<Configuracion />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
