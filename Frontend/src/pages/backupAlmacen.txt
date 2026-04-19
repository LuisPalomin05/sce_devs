import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  PencilLine,
  AlignHorizontalDistributeCenter,
  LayersPlus,
} from "lucide-react";

import "../assets/almacen.css";
import axiosClient from "../api/client";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../hooks/useNotifications";

const Almacen = () => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [categorias, setCategorias] = useState([]);
  const { tenant } = useContext(AuthContext);
  const { errorToast } = useToast();

  const getEstadoClass = (estado) => {
    const estados = {
      Disponible: "success",
      "Bajo stock": "warning",
      Agotado: "danger",
    };
    return estados[estado] || "";
  };

  const formatearProductos = (data) => {
    return data.map((p) => ({
      ...p,
      estado:
        p.stock === 0 ? "Agotado" : p.stock < 10 ? "Bajo stock" : "Disponible",
    }));
  };

  useEffect(() => {
    if (!tenant) return;

    const fetchProductos = async () => {
      try {
        const res = await axiosClient.get("/productos/get-all", {
          headers: {
            "x-tenant-id": tenant.id_tenant,
          },
        });
        setProductos(formatearProductos(res.data));
      } catch (error) {
        errorToast("ERROR: " + error.message);
      }
    };
    fetchProductos();
  }, [tenant]);

  useEffect(() => {
    if (!tenant) return;

    const fetchCategorias = async () => {
      try {
        const res = await axiosClient.get("/categoria/get-all", {
          headers: {
            "x-tenant-id": tenant.id_tenant,
          },
        });
        setCategorias(res.data);
      } catch (error) {
        errorToast("ERROR: " + error.message);
      }
    };

    fetchCategorias();
  }, [tenant]);

  const productosFiltrados =
    filtro === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === filtro);

  // const crearCategoria = async () => {
  //   try {
  //     const res = await axiosClient.post("/categoria/create",{aquivalaacategoria} {
  //       headers: {
  //         "x-tenant-id": tenant.id_tenant,
  //       },
  //     });
  //     setCategorias((prev) => [...prev, { nombre: "Mi categoría" }]);
  //   } catch (error) {
  //     errorToast("ERROR: " + error.message);
  //   }
  // };

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

        <Link to="/dashboard/almacen/create" className="btnExportReport">
          <LayersPlus />
          <p>Agregar Nuevo</p>
        </Link>
      </div>

      <div className="filtros">
        <ul>
          <li
            className={filtro === "Todos" ? "active" : ""}
            onClick={() => setFiltro("Todos")}
          >
            Todos
          </li>

          {categorias.map((cat) => (
            <li
              key={cat.id_categoria}
              className={filtro === cat.nombre ? "active" : ""}
              onClick={() => setFiltro(cat.nombre)}
            >
              {cat.nombre}
            </li>
          ))}
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
            {productosFiltrados.length === 0 ? (
              <p className="alertaProd">
                No hay productos en esta categoría.{" "}
                <Link to="/dashboard/almacen/create">Agregar Aqui</Link>
              </p>
            ) : (
              productosFiltrados.map((item) => (
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

                  <div className="stockProducto">{item.stock}</div>

                  <div
                    className={`estateProducto ${getEstadoClass(item.estado)}`}
                  >
                    {item.estado}
                  </div>

                  <Link
                    to={`/dashboard/almacen/edit/${item.id_producto}`}
                    className="actionProducto"
                  >
                    <PencilLine />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Almacen;
