import "../assets/ventas.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/client";
import { DynamicIcon } from "lucide-react/dynamic";
import { TrashIcon, Eye } from "lucide-react";

const Ventas = () => {
  const { tenant } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [showVentaDetail, setShowVentaDetail] = useState(false);

  // Cargar productos y ventas
  useEffect(() => {
    if (tenant) {
      getProductos();
      getVentas();
    }
  }, [tenant]);

  const getProductos = async () => {
    try {
      const res = await axiosClient.get("/producto", {
        headers: { "x-tenant-id": tenant?.id_tenant },
      });
      setProductos(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Error al cargar productos");
    }
  };

  const getVentas = async () => {
    try {
      const res = await axiosClient.get("/venta", {
        headers: { "x-tenant-id": tenant?.id_tenant },
      });
      setVentas(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Error al cargar ventas");
    }
  };

  const getVentaDetail = async (ventaId) => {
    try {
      const res = await axiosClient.get(`/venta/${ventaId}`, {
        headers: { "x-tenant-id": tenant?.id_tenant },
      });
      setSelectedVenta(res.data);
      setShowVentaDetail(true);
    } catch (error) {
      console.error(error);
      setMessage("Error al cargar detalle de venta");
    }
  };

  const agregarProducto = (producto) => {
    try {
      if (!producto || !producto.id_producto) {
        setMessage("Producto inválido");
        return;
      }

      const existe = detalle.find((d) => d.id_producto === producto.id_producto);

      if (existe) {
        setDetalle(
          detalle.map((d) =>
            d.id_producto === producto.id_producto
              ? {
                  ...d,
                  cantidad: d.cantidad + 1,
                  subtotal: (d.cantidad + 1) * d.precio_unitario,
                }
              : d
          )
        );
      } else {
        setDetalle([
          ...detalle,
          {
            id_producto: producto.id_producto,
            nombre: producto.nombre || "Producto",
            precio_unitario: Number(producto.precio) || 0,
            cantidad: 1,
            subtotal: Number(producto.precio) || 0,
          },
        ]);
      }
    } catch (error) {
      console.error("ERROR al agregar producto:", error);
      setMessage("Error al agregar producto");
    }
  };

  const cambiarCantidad = (id, cantidad) => {
    const numCantidad = Number(cantidad);
    setDetalle(
      detalle.map((d) =>
        d.id_producto === id
          ? {
              ...d,
              cantidad: numCantidad,
              subtotal: numCantidad * d.precio_unitario,
            }
          : d
      )
    );
  };

  const eliminarDetalle = (id) => {
    setDetalle(detalle.filter((d) => d.id_producto !== id));
  };

  const total = detalle.reduce((acc, item) => acc + item.subtotal, 0);

  const guardarVenta = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axiosClient.post(
        "/venta",
        { detalles: detalle },
        {
          headers: { "x-tenant-id": tenant?.id_tenant },
        }
      );

      setDetalle([]);
      setShowModal(false);
      getVentas();
      setMessage("Venta registrada exitosamente");
    } catch (error) {
      console.error(error);
      setMessage("Error al guardar venta");
    } finally {
      setLoading(false);
    }
  };

  const deleteVenta = async (ventaId) => {
    if (!window.confirm("¿Eliminar esta venta?")) return;

    try {
      await axiosClient.delete(`/venta/${ventaId}`, {
        headers: { "x-tenant-id": tenant?.id_tenant },
      });
      getVentas();
      setMessage("Venta eliminada correctamente");
    } catch (error) {
      console.error(error);
      setMessage("Error al eliminar venta");
    }
  };

  const filteredProductos = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ventasContent">
      <div className="ventasHeader">
        <div className="ventasTitle">
          <h2>Ventas</h2>
        </div>

        <div className="SearchHeader">
          <DynamicIcon name="search" size={18} />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="btnPrimary" onClick={() => setShowModal(true)}>
          <DynamicIcon name="plus" size={18} />
          Nueva Venta
        </button>
      </div>

      {message && <div className={`messageAlert ${message.includes("Error") || message.includes("error") ? "error" : "success"}`}>{message}</div>}

      {/* TABLA DE VENTAS */}
      <div className="ventasTableContainer">
        <h3>Historial de Ventas</h3>
        <table className="ventasTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendedor</th>
              <th>Items</th>
              <th>Total</th>
              <th>Fecha</th>
              <th style={{ textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id_venta}>
                <td>#{venta.id_venta}</td>
                <td>{venta.nombres || "Sistema"}</td>
                <td>{venta.cantidad_items || 0}</td>
                <td>S/ {parseFloat(venta.total).toFixed(2)}</td>
                <td>{new Date(venta.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="actionsCell">
                    <button className="btnView" onClick={() => getVentaDetail(venta.id_venta)}>
                      <Eye size={18} />
                    </button>
                    <button className="btnDelete" onClick={() => deleteVenta(venta.id_venta)}>
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL NUEVA VENTA */}
      {showModal && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h3>Registrar Venta</h3>

            {/* PRODUCTOS */}
            <div className="productosList">
              {filteredProductos.length === 0 ? (
                <div className="emptyDetail">No hay productos disponibles para venta</div>
              ) : (
                filteredProductos.map((p) => (
                  <div key={p.id_producto} className="productoItem" onClick={(e) => { e.stopPropagation(); agregarProducto(p); }}>
                    <strong>{p.nombre}</strong>
                    <p>S/ {parseFloat(p.precio).toFixed(2)}</p>
                    <small>Stock: {p.stock}</small>
                  </div>
                ))
              )}
            </div>

            {/* DETALLE */}
            <div className="detalleVenta">
              <h4>Detalle de Venta</h4>

              {detalle.length === 0 ? (
                <p className="emptyDetail">Sin productos agregados</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th style={{ textAlign: "center" }}>Precio</th>
                      <th style={{ textAlign: "center" }}>Cantidad</th>
                      <th style={{ textAlign: "right" }}>Subtotal</th>
                      <th style={{ textAlign: "center" }}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalle.map((item) => (
                      <tr key={item.id_producto}>
                        <td>{item.nombre}</td>
                        <td style={{ textAlign: "center" }}>S/ {parseFloat(item.precio_unitario).toFixed(2)}</td>
                        <td style={{ textAlign: "center" }}>
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) =>
                              cambiarCantidad(item.id_producto, e.target.value)
                            }
                          />
                        </td>
                        <td style={{ textAlign: "right" }}>S/ {parseFloat(item.subtotal).toFixed(2)}</td>
                        <td style={{ textAlign: "center" }}>
                          <button className="btnRemove" onClick={() => eliminarDetalle(item.id_producto)}>
                            <TrashIcon size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="totalVenta">Total: S/ {total.toFixed(2)}</div>

            {/* BOTONES */}
            <div className="modalActions">
              <button className="btnCancel" onClick={() => { setShowModal(false); setDetalle([]); }}>Cancelar</button>
              <button className="btnSave" disabled={detalle.length === 0 || loading} onClick={guardarVenta}>
                {loading ? "Guardando..." : "Guardar Venta"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VER DETALLE */}
      {showVentaDetail && selectedVenta && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && setShowVentaDetail(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h3>Detalle de Venta #{selectedVenta.id_venta}</h3>

            <div style={{ marginTop: "15px" }}>
              <p><strong>Vendedor:</strong> {selectedVenta.nombres || "Sistema"}</p>
              <p><strong>Fecha:</strong> {new Date(selectedVenta.created_at).toLocaleString()}</p>

              <h4>Productos</h4>
              <table className="ventasTable">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th style={{ textAlign: "center" }}>Cantidad</th>
                    <th style={{ textAlign: "right" }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedVenta.detalles?.map((d) => (
                    <tr key={d.id_detalle}>
                      <td>{d.nombre}</td>
                      <td style={{ textAlign: "center" }}>{d.cantidad}</td>
                      <td style={{ textAlign: "right" }}>S/ {parseFloat(d.subtotal).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="totalVenta">Total: S/ {parseFloat(selectedVenta.total).toFixed(2)}</div>
            </div>

            <div className="modalActions">
              <button className="btnCancel" onClick={() => setShowVentaDetail(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;