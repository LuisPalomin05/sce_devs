import { useState, useEffect } from "react";
import "../assets/almacen.css";
import {
  Save,
  ChevronRight,
  LayersPlus,
  X,
  DollarSign,
  ListPlus,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "../hooks/useNotifications";

const CreateProducto = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const { success, errorToast, warning } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await axiosClient.put(`/productos/${id}`, producto);
      } else {
        await axiosClient.post("/productos", producto);
      }
    } catch (error) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  };

  const [producto, setProducto] = useState({
    descripcion: "",
    precio: "",
    cantidad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="CrearProd">
      <div className="TittleCreate">
        <section>
          <LayersPlus className="cardLayer" />
        </section>
        <section className="textTitleCreate">
          <div className="routeLayer">
            <Link className="bnj" to={"/dashboard/almacen"}>
              <small>Almacen</small>
            </Link>
            <ChevronRight size={10} />
            <small>{id ? "Editar" : "Crear"} Producto</small>
          </div>
          <p>{id ? "Editar" : "Crear"} Producto</p>
          {id ? "" : <small>Anade un nuevo producto a el almacen</small>}
        </section>
        <Link to={"/dashboard/almacen"}>
          <section className="cerrar">
            <X />
          </section>
        </Link>
      </div>
      <div className="InputCreate">
        <div className="InputItenCreate">
          <label htmlFor="descripcion">Descripcion del producto</label>
          <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            placeholder="Ej. ARANDELA PLANA ZINCADA 1/2"
          />
        </div>
        <div className="GroupItem">
          <div className="InputItenCreate">
            <label htmlFor="percio">Precio</label>
            <div className="inputCreates">
              <DollarSign />
              <input
                type="text"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="InputItenCreate">
            <label htmlFor="cantidad">Cantidad</label>
            <div className="inputCreates">
              <ListPlus />
              <input
                type="text"
                name="cantidad"
                value={producto.cantidad}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div className="descriptionCreate">
          <div className="descpTittle">
            <p>Descripcion</p>
            <small>Ingresa una descripcion del producto</small>
          </div>

          <textarea
            name="descripcion"
            id="descripcion"
            placeholder="Especifique dimensiones, tamaño, origen, acabados o informacion adicional"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="btnCreateContent">
        <div className="bnk"></div>
        <div className="btnsCreate">
          <Link to={"/dashboard/almacen"} className="createBtn">
            CANCELAR
          </Link>
          <button className="createBtn" type="submit">
            <Save /> GUARDAR
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProducto;
