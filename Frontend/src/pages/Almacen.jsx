import "../assets/almacen.css";
import {
  Download,
  PencilLine,
  AlignHorizontalDistributeCenter,
  LayersPlus,
} from "lucide-react";

import { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../api/client";
import { AuthContext } from "../context/AuthContext";
import ProductForm from "../components/ProductForm";
import { exportToPDF } from "../utils/exportPDF";


const Almacen = () => {
  const [producto, setProducto] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [formProduct, setFormProduct] = useState(null);
  const [formMessage, setFormMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const { tenant } = useContext(AuthContext);
  const location = useLocation();
  const [highlightId, setHighlightId] = useState(null);
  const rowRefs = useRef({});

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

  // Carga productos
  useEffect(() => {
    if (!tenant) return;

    const getProductos = async () => {
      try {
        const res = await axiosClient.get("/producto", {
          headers: { "x-tenant-id": tenant?.id_tenant },
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
        console.log("ERROR productos:", error);
      }
    };

    if (tenant) getProductos();
  }, [tenant]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlight = params.get("highlight");

    if (highlight) {
      setHighlightId(String(highlight));
    }
  }, [location.search]);

  useEffect(() => {
    if (!highlightId || producto.length === 0) return;

    const row = rowRefs.current[String(highlightId)];
    if (row?.scrollIntoView) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });

      const timer = setTimeout(() => {
        setHighlightId(null);
      }, 2200);

      const params = new URLSearchParams(location.search);
      if (params.has("highlight")) {
        params.delete("highlight");
        const cleanedSearch = params.toString();
        window.history.replaceState(
          null,
          "",
          `${location.pathname}${cleanedSearch ? `?${cleanedSearch}` : ""}`
        );
      }

      return () => clearTimeout(timer);
    }
  }, [highlightId, producto, location.pathname, location.search]);

  // Carga categorias
  useEffect(() => {
    const getCategorias = async () => {
      try {
        const res = await axiosClient.get("/producto/categorias", {
          headers: { "x-tenant-id": tenant?.id_tenant },
        });
        setCategorias(res.data);
      } catch (error) {
        console.log("ERROR categorias:", error);
      }
    };

    if (tenant) getCategorias();
  }, [tenant]);

  const resetForm = () => {
    setFormVisible(false);
    setFormMode("create");
    setFormProduct(null);
    setFormMessage("");
    setFormLoading(false);
  };

  const openNewProduct = () => {
    setFormMode("create");
    setFormProduct({
      nombre: "",
      precio: 0,
      stock: 0,
      id_categoria: "",
      descripcion: "",
    });
    setFormMessage("");
    setFormVisible(true);
  };

  const openEditProduct = (item) => {
    setFormMode("edit");
    setFormProduct(item);
    setFormMessage("");
    setFormVisible(true);
  };

  const refreshProductos = async () => {
    try {
      const res = await axiosClient.get("/producto", {
        headers: { "x-tenant-id": tenant?.id_tenant },
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
      console.log("ERROR productos:", error);
    }
  };

  const handleSaveProduct = async (productData) => {
    setFormLoading(true);
    setFormMessage("");

    try {
      const headers = { "x-tenant-id": tenant?.id_tenant };

      if (formMode === "create") {
        await axiosClient.post("/producto", productData, { headers });
        setFormMessage("Producto creado correctamente.");
      } else {
        await axiosClient.put(`/producto/${productData.id_producto}`, productData, {
          headers,
        });
        setFormMessage("Producto actualizado correctamente.");
      }

      await refreshProductos();
      resetForm();
    } catch (error) {
      console.error(error);
      setFormMessage("Ocurrió un error al guardar el producto.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    setFormLoading(true);
    setFormMessage("");

    try {
      await axiosClient.delete(`/producto/${productId}`, {
        headers: { "x-tenant-id": tenant?.id_tenant },
      });

      setFormMessage("Producto eliminado correctamente.");
      await refreshProductos();
      resetForm();
    } catch (error) {
      console.error(error);
      setFormMessage("Ocurrió un error al eliminar el producto.");
    } finally {
      setFormLoading(false);
    }
  };

  const productosFiltrados = producto.filter((p) => {
    if (filtro === "Todos") return true;

    return (
      p.categoria?.trim().toLowerCase() ===
      filtro.trim().toLowerCase()
    );
  });

const handleExportPDF = () => {
  const data = productosFiltrados.map((p) => [
    p.nombre,
    p.precio,
    p.stock,
  ]);

  exportToPDF({
    title: "Reporte de Almacén",
    subtitle:
      filtro === "Todos"
        ? "Todos los productos"
        : `Categoría - ${filtro}`,
    columns: ["Nombre", "Precio", "Stock"],
    data,
    fileName:
      filtro === "Todos"
        ? "productos.pdf"
        : `productos_${filtro.toLowerCase()}.pdf`,
  });
};



  return (
    <div className="storageContent">
      <div className="storageHeader">
        <div className="storageTittle">
          <p>Inventario de Almacen</p>
          <small>Control de stock en tiempo real y gestion de suministro</small>
        </div>

        <div className="btnExportReport" onClick={handleExportPDF}>
          <Download />
          <p>Exportar Reporte</p>
        </div>

        <button type="button" className="btnExportReport" onClick={openNewProduct}>
          <LayersPlus />
          <p>Agregar Nuevo</p>
        </button>
      </div>

      {/* FILTROS DINÁMICOS */}
      {!formVisible && (
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
      )}

      <div className="TableContendorStorage">
        {formVisible && (
          <ProductForm
            product={formProduct}
            categorias={categorias}
            mode={formMode}
            onSubmit={handleSaveProduct}
            onCancel={resetForm}
            onDelete={handleDeleteProduct}
            loading={formLoading}
            message={formMessage}
          />
        )}

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
                No hay productos en esta categoría. {" "}
                <button className="linkButton" type="button" onClick={openNewProduct}>
                  Agregar Aqui
                </button>
              </p>
            ) : (
              productosFiltrados.map((item) => (
                <div
                  key={item.id_producto}
                  ref={(el) => {
                    if (el) rowRefs.current[item.id_producto] = el;
                  }}
                  className={`StorageTableItem ${highlightId === String(item.id_producto) ? "highlighted" : ""
                    }`}
                >

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
                    {item.categoria || "Sin categoría"}
                  </div>

                  <div className="stockProducto">{item.stock}</div>

                  <div className={`estateProducto ${getEstadoClass(item.estado)}`}>
                    {item.estado}
                  </div>

                  <div className="actionButtons">
                    <button
                      type="button"
                      className="actionProducto"
                      onClick={() => openEditProduct(item)}
                    >
                      <PencilLine />
                    </button>
                  </div>

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
