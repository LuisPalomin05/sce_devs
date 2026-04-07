import "../assets/almacen.css";
import { Download, PencilLine, AlignHorizontalDistributeCenter, LayersPlus } from "lucide-react";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/client";
import { AuthContext } from "../context/AuthContext";

const Almacen = () => {
  const [producto, setProducto] = useState([]);
  const [filtro, setFiltro] = useState("Todos"); // ✅ CORRECTO aquí

  const { tenant } = useContext(AuthContext);

  const getEstadoClass = (estado) => {
    if (estado === "Disponible") return "success";
    if (estado === "Bajo stock") return "warning";
    if (estado === "Agotado") return "danger";
  };

  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axiosClient.get("/producto", {
          headers: {
            "x-tenant-id": tenant?.id_tenant,
          },
        });

        const dataFormateada = res.data.map((p) => ({
          ...p,
          estado:
            p.stock === 0
              ? "Agotado"
              : p.stock < 10
              ? "Bajo stock"
              : "Disponible",
        }));

        setProducto(dataFormateada);
      } catch (error) {
        console.log("ERROR:", error);
      }
    };

    if (tenant) {
      getProductos();
    }
  }, [tenant]);

  // ✅ FILTRO FUNCIONANDO
  const productosFiltrados = producto.filter((p) => {
    if (filtro === "Todos") return true;
    return p.categoria === filtro;
  });

  return (
    <div className="storageContent">

      <div className="storageHeader">
        <div className="storageTittle">
          <p>Inventario de Almacen</p>
          <small>Control de stock en tiempo real y gestion de suministro</small>
        </div>

        <div className="btnExportReport">
          <Download />
          <p>Exportar Reporte</p>
        </div>

        <Link to={"/dashboard/almacen/create"} className="btnExportReport">
          <LayersPlus />
          <p>Agregar Nuevo</p>
        </Link>
      </div>

      <div className="filtros">
        <ul>
          <li className={filtro === "Todos" ? "active" : ""} onClick={() => setFiltro("Todos")}>Todos</li>
          <li className={filtro === "Pernos" ? "active" : ""} onClick={() => setFiltro("Pernos")}>Pernos</li>
          <li className={filtro === "Tuercas" ? "active" : ""} onClick={() => setFiltro("Tuercas")}>Tuercas</li>
          <li className={filtro === "Barras" ? "active" : ""} onClick={() => setFiltro("Barras")}>Barras</li>
          <li className={filtro === "Herramientas" ? "active" : ""} onClick={() => setFiltro("Herramientas")}>Herramientas</li>
        </ul>
      </div>

      <div className="TableContendorStorage">
        <div className="StorageTable">

          <div className="StorageTableHeader">
            <p>NOMBRE DEL PRODUCTO</p>
            <p>CATEGORIA</p>
            <p>STOCK</p>
            <p>ESTADO</p>
            <p>ACCIONES</p>
          </div>

          <div className="StorageTableBody">
            {
              productosFiltrados.length === 0 ? (
                <p className="alertaProd">
                  No hay productos en esta categoría.{" "}
                  <Link to={"/dashboard/almacen/create"}>
                    Agregar Aqui
                  </Link>
                </p>
              ) : (
                productosFiltrados.map((item) => {
                  return (
                    <div key={item.id_producto} className="StorageTableItem">

                      <div className="NombProductoTable">
                        <div className="itemProd">
                          <AlignHorizontalDistributeCenter />
                        </div>

                        <div className="NombProducto">
                          <p>{item.nombre}</p>
                          <small>ID: {item.id_producto}</small>
                        </div>
                      </div>

                      <div className="catProducto">
                        {item.categoria || "General"}
                      </div>

                      <div className="stockProducto">
                        {item.stock}
                      </div>

                      <div className={`estateProducto ${getEstadoClass(item.estado)}`}>
                        {item.estado}
                      </div>

                      <Link
                        to={`/dashboard/almacen/edit/${item.id_producto}`}
                        className="actionProducto"
                      >
                        <PencilLine />
                      </Link>

                    </div>
                  );
                })
              )
            }
          </div>

        </div>
      </div>

    </div>
  );
};

export default Almacen;