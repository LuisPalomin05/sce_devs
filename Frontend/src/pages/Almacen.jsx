import "../assets/almacen.css";
import { Download, PencilLine, AlignHorizontalDistributeCenter, LayersPlus } from "lucide-react";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/client";
import { AuthContext } from "../context/AuthContext";

const Almacen = () => {
  const [producto, setProducto] = useState([]);
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
          <li>Todos</li>
          <li>Pernos</li>
          <li>Tuercas</li>
          <li>Barras</li>
          <li>Maquinaria</li>
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
              producto.length === 0 ? (
                <p className="alertaProd">
                  No hay productos por mostrar.{" "}
                  <Link to={"/dashboard/almacen/create"}>
                    Agregar Aqui
                  </Link>
                </p>
              ) : (
                producto.map((item) => {
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
                        <p>{item.categoria || "General"}</p>
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