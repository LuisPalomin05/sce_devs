import { useState, useEffect, useContext } from "react";
import "../assets/almacen.css";
import {
  Save,
  ChevronRight,
  LayersPlus,
  X,
  DollarSign,
  ListPlus,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../hooks/useNotifications";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/client";

const CreateProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { tenant } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { success, errorToast, warning } = useToast();
  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({
    descripcion: "",
    nombre: "",
    precio: 0,
    stock: 0,
    id_categoria: 0,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await axiosClient.put(`/productos/update/${id}`, producto, {
          headers: {
            "x-tenant-id": tenant.id_tenant,
          },
        });
      } else {
        if (!producto.descripcion || !producto.precio) {
          warning("Completa los campos obligatorios");
          return;
        }
        await axiosClient.post("/productos/create", producto, {
          headers: {
            "x-tenant-id": tenant.id_tenant,
          },
        });
      }
      success("Producto guardado correctamente");
      navigate("/dashboard/almacen");
    } catch (error) {
      errorToast(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(producto);
  };

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
        errorToast(error.response?.data?.message || error.message);
      }
    };

    fetchCategorias();
  }, [tenant]);

  useEffect(() => {
    if (!id) return;

    const fetchProducto = async () => {
      try {
        const res = await axiosClient.get(`/productos/get-by-id/${id}`, {
          headers: {
            "x-tenant-id": tenant.id_tenant,
          },
        });
        setProducto(res.data);
      } catch (error) {
        errorToast(error.response?.data?.message || error.message);
      }
    };

    fetchProducto();
  }, [id, tenant]);

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
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            placeholder="Ej. ARANDELA PLANA ZINCADA 1/2"
          />
        </div>
        <div className="GroupItem">
          <div className="InputItenCreate">
            <label htmlFor="precio">Precio</label>
            <div className="inputCreates">
              <DollarSign />
              <input
                type="number"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="InputItenCreate">
            <label htmlFor="stock">Cantidad</label>
            <div className="inputCreates">
              <ListPlus />
              <input
                type="number"
                name="stock"
                value={producto.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
          <div className="InputItenCreate">
            <label htmlFor="categoria">Categoria</label>
            <div className="inputCreates">
              <ListPlus />
              <select
                name="id_categoria"
                id="id_categoria"
                value={producto.id_categoria}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoria</option>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.id_categoria}
                    value={categoria.id_categoria}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </select>
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
