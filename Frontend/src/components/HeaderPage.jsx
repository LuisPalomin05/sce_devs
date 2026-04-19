import { Bell, Search, MessageSquare } from "lucide-react";
import rostro from "../assets/rostro.avif";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useNotifications";

import CardPerfil from "./CardPerfil";
import { useInfo } from "../hooks/useInfo";
import axiosClient from "../api/client";

const HeaderPage = () => {
  const containerRef = useRef(null);
  const { nombres } = useInfo();
  const navigate = useNavigate();
  const { success, errorToast, warning } = useToast();

  const [isVisible, setVisible] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

 const buscarGlobal = async (texto) => {
  if (!texto.trim()) return setResultados([]);

  const tenantRaw = localStorage.getItem("tenant");
  const tenant = tenantRaw ? JSON.parse(tenantRaw) : null;

  try {
    const { data } = await axiosClient.get("/busqueda-global", {
      params: { 
        q: texto, 
        tenant_id: tenant?.id_tenant
      },
    });
    setResultados(data);
  } catch (error) {
    errorToast(error);
    setResultados([]);
  }
};

const getHighlightQuery = (item) => {
  const productId =
    item?.id_producto || item?.id || item?.idProducto || item?.productoId;

  const isAlmacen =
    item?.ruta?.startsWith("almacen") ||
    item?.tipo?.toLowerCase().includes("producto");

  return isAlmacen && productId ? `?highlight=${productId}` : "";
};

  // 🔥 debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      buscarGlobal(busqueda);
    }, 300);

    return () => clearTimeout(delay);
  }, [busqueda]);

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

        {Array.isArray(resultados) && resultados.length > 0 && (
          <div className="dropdownBusqueda">
            {resultados.map((item, index) => (
              <div
                key={index}
                className="itemBusqueda"
                onClick={() => {
                  const basePath = item?.ruta?.startsWith("/")
                    ? item.ruta
                    : `/${item.ruta}`;
                  const highlight = getHighlightQuery(item);
                  navigate(`/dashboard${basePath}${highlight}`);
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