import { useEffect, useState } from "react";
import { Save, User, Mail, Shield, Trash2 } from "lucide-react";

const UserForm = ({
  user = null,
  roles = [],
  mode = "create",
  onSubmit,
  onCancel,
  onDelete,
  loading = false,
  message = "",
}) => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [id_rol, setIdRol] = useState("");

  useEffect(() => {
    if (user) {
      setNombres(user.nombres || "");
      setApellidos(user.apellidos || "");
      setEmail(user.email || "");
      setIdRol(user.id_rol || "");
    } else {
      setNombres("");
      setApellidos("");
      setEmail("");
      setIdRol("");
    }
  }, [user]);

  const submitLabel = mode === "edit" ? "Actualizar" : "Guardar";
  const titleLabel = mode === "edit" ? "Editar Usuario" : "Crear Usuario";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombres.trim() || !apellidos.trim() || !email.trim()) {
      return;
    }

    onSubmit?.({
      ...user,
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      email: email.trim(),
      id_rol: id_rol ? Number(id_rol) : null,
    });
  };

  return (
    <form className="CrearProd formCard" onSubmit={handleSubmit}>
      <div className="TittleCreate">
        <section>
          <User className="cardLayer" />
        </section>
        <section className="textTitleCreate">
          <div className="routeLayer">
            <span className="bnj">{titleLabel}</span>
          </div>
          <p>{titleLabel}</p>
          <small>{mode === "edit" ? "Actualiza los datos del usuario" : "Agrega un nuevo usuario al sistema"}</small>
        </section>
      </div>

      {message && <div className="formMessage">{message}</div>}

      <div className="InputCreate">
        <div className="InputItenCreate">
          <label htmlFor="nombres">Nombres</label>
          <input
            id="nombres"
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            placeholder="Ej. Juan Carlos"
          />
        </div>

        <div className="InputItenCreate">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            id="apellidos"
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            placeholder="Ej. Pérez García"
          />
        </div>

        <div className="InputItenCreate">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ej. juan.perez@email.com"
          />
        </div>

        <div className="InputItenCreate">
          <label htmlFor="id_rol">Rol</label>
          <select
            id="id_rol"
            value={id_rol}
            onChange={(e) => setIdRol(e.target.value)}
          >
            <option value="">-- Selecciona un rol --</option>
            {(roles || []).map((rol) => (
              <option key={rol.id_rol} value={rol.id_rol}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ButtonCreate">
        <button type="button" className="btnCancel" onClick={onCancel}>
          Cancelar
        </button>
        {mode === "edit" && onDelete && (
          <button type="button" className="btnDelete" onClick={() => onDelete(user?.id_usuario)}>
            <Trash2 />
            Eliminar
          </button>
        )}
        <button type="submit" className="btnSave" disabled={loading}>
          <Save />
          {loading ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default UserForm;