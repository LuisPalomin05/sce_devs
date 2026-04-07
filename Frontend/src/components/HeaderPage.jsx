import { Bell, Search, MessageSquare } from "lucide-react";
import rostro from "../assets/rostro.avif";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import CardPerfil from "./CardPerfil";
import { useInfo } from "../hooks/useInfo";
import axiosClient from "../api/client";

const HeaderPage = () => {
  const containerRef = useRef(null);
  const { nombres } = useInfo();
  const navigate = useNavigate();

  const [isVisible, setVisible] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscarGlobal = async (texto) => {
  if (!texto.trim()) {
    setResultados([]);
    return;
  }

  try {
    const { data } = await axiosClient.get("/busqueda-global", {
      params: { q: texto },
    });

    setResultados(data);
  } catch (error) {
    console.error(error);
    setResultados([]);
  }
};

  // 🔥 debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      buscarGlobal(busqueda);
    }, 300);

    return () => clearTimeout(delay);
  }, [busqueda]);

  // cerrar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setResultados([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="HeaderPage" ref={containerRef}>
      <div className="SearchHeader">
        <Search size={16} />

        <input
          type="text"
          placeholder="Buscar en el sistema..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* 🔥 RESULTADOS */}
        {Array.isArray(resultados) && resultados.length > 0 && (
          <div className="dropdownBusqueda">
            {resultados.map((item, index) => (
              <div
                key={index}
                className="itemBusqueda"
                onClick={() => {
                  navigate(`/dashboard/${item.ruta}`);
                  setBusqueda("");
                  setResultados([]);
                }}
              >
                <span>{item.nombre}</span>
                <span className="tipo">{item.tipo}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="btnHeaderAlerts">
        <Bell size={18} />
        <MessageSquare size={18} />
      </div>

      <div className="UserInfo" onClick={() => setVisible(!isVisible)}>
        <div>
          <p className="fontBlack">{nombres}</p>
        </div>
        <img className="HeaderImage" src={rostro} alt="" />
      </div>

      {isVisible && <CardPerfil />}
    </div>
  );
};

export default HeaderPage;