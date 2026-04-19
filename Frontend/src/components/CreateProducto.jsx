import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/client";
import ProductForm from "./ProductForm";

const CreateProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getProducto = async () => {
      if (!id) return;

      try {
        const tenantRaw = localStorage.getItem("tenant");
        const tenant = tenantRaw ? JSON.parse(tenantRaw) : null;

        const { data } = await axiosClient.get("/producto", {
          headers: { "x-tenant-id": tenant?.id_tenant },
        });

        const productoSeleccionado = data.find((item) => String(item.id_producto) === String(id));
        setProducto(productoSeleccionado || null);
      } catch (error) {
        console.error(error);
      }
    };

    getProducto();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      const tenantRaw = localStorage.getItem("tenant");
      const tenant = tenantRaw ? JSON.parse(tenantRaw) : null;

      if (id) {
        await axiosClient.put(`/producto/${id}`, formData, {
          headers: { "x-tenant-id": tenant?.id_tenant },
        });
      } else {
        await axiosClient.post("/producto", formData, {
          headers: { "x-tenant-id": tenant?.id_tenant },
        });
      }

      navigate("/dashboard/almacen");
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    setLoading(true);
    setMessage("");

    try {
      const tenantRaw = localStorage.getItem("tenant");
      const tenant = tenantRaw ? JSON.parse(tenantRaw) : null;

      await axiosClient.delete(`/producto/${productId}`, {
        headers: { "x-tenant-id": tenant?.id_tenant },
      });

      navigate("/dashboard/almacen");
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error al eliminar el producto.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate("/dashboard/almacen");

  return (
    <ProductForm
      product={producto}
      mode={id ? "edit" : "create"}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDelete={id ? handleDelete : undefined}
      loading={loading}
      message={message}
    />
  );
};

export default CreateProducto;
