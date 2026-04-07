import "../assets/HomeDashboard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HomeDashboard = () => {
  const { tenant } = useContext(AuthContext);

  const [data, setData] = useState({
    ventasHoy: 0,
    ventasMes: 0,
    productos: 0,
    usuarios: 0,
    grafico: [],
    actividad: [],
    pedidos: [],
    porcentajeHoy: 0,
    porcentajeMes: 0
  });

  const getDashboard = async () => {
    try {
      const res = await axiosClient.get("/dashboard", {
        headers: {
          "x-tenant-id": tenant?.id_tenant,
        },
      });

      console.log("DATA:", res.data);
      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tenant) {
      getDashboard();
    }
  }, [tenant]);

  const dias = {
    Monday: "Lun",
    Tuesday: "Mar",
    Wednesday: "Mié",
    Thursday: "Jue",
    Friday: "Vie",
    Saturday: "Sáb",
    Sunday: "Dom"
  };

  const graficoFormateado = data.grafico.map(d => ({
    ...d,
    dia: dias[d.dia] || d.dia
  }));

  return (
    <div className="ContentDashboard">
      <div>
      <h2 className="titleDashboard">Dashboard</h2>
      <p className="fontGrayInfo">Encuentra un progreso detallado y administra tus actividades recientes.</p>
      </div>

      <div className="cards">
        <div className="card">
          <h4>Ventas Hoy</h4>
          <p>S/ {data.ventasHoy}</p>

          <span className={data.porcentajeHoy >= 0 ? "positive" : "negative"}>
            {data.porcentajeHoy >= 0 ? "+" : ""}
            {data.porcentajeHoy}%
          </span>
        </div>

        <div className="card">
          <h4>Ventas Mes</h4>
          <p>S/ {data.ventasMes}</p>

          <span className={data.porcentajeMes >= 0 ? "positive" : "negative"}>
            {data.porcentajeMes >= 0 ? "+" : ""}
            {data.porcentajeMes}%
          </span>
        </div>

        <div className="card">
          <h4>Productos</h4>
          <p>{data.productos}</p>
        </div>

        <div className="card">
          <h4>Usuarios</h4>
          <p>{data.usuarios}</p>
        </div>
      </div>

      <div className="section">
        <h3>Ventas de la semana</h3>

        <div className="chartContainer">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graficoFormateado}>
              <XAxis dataKey="dia" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="gridBottom">

        <div className="section">
          <h3>Actividad reciente</h3>
          <div className="activityContainer">
            {data.actividad.map((item, index) => (
              <div className="activityItem" key={index}>

                <div className="activityIcon">
                  {item.tipo === "venta" ? "💰" : item.tipo === "usuario" ? "👤" : "⚠️"}
                </div>

                <div className="activityContent">
                  <strong>{item.texto}</strong>
                  <span className="activityTime">
                    {item.fecha && typeof item.fecha === "string"
                      ? new Date(item.fecha.replace(" ", "T")).toLocaleString()
                      : "Hace un momento"}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Historial de pedidos</h3>

          <div className="historyList">
            {data.pedidos.map((pedido, index) => (
              <div className="historyItem" key={index}>
                <div className="dot"></div>

                <div className="historyContent">
                  <h4>{pedido.titulo}</h4>
                  <p>{pedido.cliente}</p>
                  <span>{pedido.fecha}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeDashboard;