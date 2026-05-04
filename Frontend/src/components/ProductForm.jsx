import { useEffect, useState } from "react";
import { Save, DollarSign, ListPlus, LayersPlus, Trash2 } from "lucide-react";

const ProductForm = ({
  product = null,
  categorias = [],
  mode = "create",
  onSubmit,
  onCancel,
  onDelete,
  loading = false,
  message = "",
}) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [id_categoria, setIdCategoria] = useState("");

  useEffect(() => {
    if (product) {
      setNombre(product.nombre || "");
      setPrecio(product.precio ?? "");
      setStock(product.stock ?? "");
      setDescripcion(product.descripcion || "");
      setIdCategoria(product.id_categoria || "");
    } else {
      setNombre("");
      setPrecio("");
      setStock("");
      setDescripcion("");
      setIdCategoria("");
    }
  }, [product]);

  const submitLabel = mode === "edit" ? "Actualizar" : "Guardar";
  const titleLabel = mode === "edit" ? "Editar Producto" : "Crear Producto";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre.trim()) {
      return;
    }

    onSubmit?.({
      ...product,
      nombre: nombre.trim(),
      precio: Number(precio) || 0,
      stock: Number(stock) || 0,
      descripcion: descripcion.trim(),
      id_categoria: id_categoria ? Number(id_categoria) : null,
    });
  };

  return (
    <form className="CrearProd formCard" onSubmit={handleSubmit}>
      <div className="TittleCreate">
        <section>
          <LayersPlus className="cardLayer" />
        </section>
        <section className="textTitleCreate">
          <div className="routeLayer">
            <span className="bnj">{titleLabel}</span>
          </div>
          <p>{titleLabel}</p>
          <small>{mode === "edit" ? "Actualiza los datos del producto" : "Agrega un nuevo producto al almacén"}</small>
        </section>
      </div>

      {message && <div className="formMessage">{message}</div>}

      <div className="InputCreate">
        <div className="InputItenCreate">
          <label htmlFor="nombre">Nombre del producto</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. ARANDELA PLANA ZINCADA 1/2"
          />
        </div>

        <div className="InputItenCreate">
          <label htmlFor="id_categoria">Categoría</label>
          <select
            id="id_categoria"
            value={id_categoria}
            onChange={(e) => setIdCategoria(e.target.value)}
          >
            <option value="">-- Selecciona una categoría --</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="GroupItem">
          <div className="InputItenCreate">
            <label htmlFor="precio">Precio</label>
            <div className="inputCreates">
              <DollarSign />
              <input
                id="precio"
                type="number"
                min="0"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value.slice(0, 7))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="InputItenCreate">
            <label htmlFor="stock">Cantidad</label>
            <div className="inputCreates">
              <ListPlus />
              <input
                id="stock"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value.slice(0, 3))}  
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="descriptionCreate">
          <div className="descpTittle">
            <p>Descripción</p>
            <small>Información adicional del producto</small>
          </div>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Dimensiones, origen, acabados o información adicional"
          />
        </div>
      </div>

      <div className="btnCreateContent">
        <div className="bnk"></div>
        <div className="btnsCreate">
          <button type="button" className="createBtn cancelBtn" onClick={onCancel}>
            CANCELAR
          </button>
          {mode === "edit" && onDelete && (
            <button
              type="button"
              className="createBtn deleteBtn"
              onClick={() => onDelete(product?.id_producto)}
            >
              <Trash2 /> ELIMINAR
            </button>
          )}
          <button type="submit" className="createBtn submitBtn" disabled={loading}>
            <Save /> {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;