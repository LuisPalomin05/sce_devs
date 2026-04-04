import "../assets/dashboard.css";
import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

const Ventas = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [productos] = useState([
    { id: 1, nombre: "Producto A", precio: 50 },
    { id: 2, nombre: "Producto B", precio: 30 },
  ]);

  const [detalle, setDetalle] = useState([]);

  const agregarProducto = (producto) => {
    const existe = detalle.find((d) => d.id === producto.id);

    if (existe) {
      setDetalle(
        detalle.map((d) =>
          d.id === producto.id
            ? { ...d, cantidad: d.cantidad + 1 }
            : d
        )
      );
    } else {
      setDetalle([
        ...detalle,
        { ...producto, cantidad: 1 },
      ]);
    }
  };

  const cambiarCantidad = (id, cantidad) => {
    setDetalle(
      detalle.map((d) =>
        d.id === id ? { ...d, cantidad: Number(cantidad) } : d
      )
    );
  };

  const total = detalle.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Ventas</h2>

      {/* HEADER */}
      <div className="ventasHeader">
        <div className="SearchHeader">
          <DynamicIcon name="search" size={18} />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="btnPrimary" onClick={() => setShowModal(true)}>
          <DynamicIcon name="plus" size={18} />
          Nueva Venta
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modalContent">

            <h3>Registrar Venta</h3>

            {/* PRODUCTOS */}
            <div className="productosList">
              {productos.map((p) => (
                <div key={p.id} className="productoItem">
                  <span>{p.nombre} - S/ {p.precio}</span>
                  <button onClick={() => agregarProducto(p)}>Agregar</button>
                </div>
              ))}
            </div>

            {/* DETALLE */}
            <div className="detalleVenta">
              <h4>Detalle</h4>

              {detalle.map((item) => (
                <div key={item.id} className="detalleItem">
                  <span>{item.nombre}</span>

                  <input
                    type="number"
                    value={item.cantidad}
                    onChange={(e) =>
                      cambiarCantidad(item.id, e.target.value)
                    }
                  />

                  <span>S/ {item.precio * item.cantidad}</span>
                </div>
              ))}
            </div>

            <h3>Total: S/ {total}</h3>

            {/* BOTONES */}
            <div className="modalActions">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btnPrimary">Guardar Venta</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;