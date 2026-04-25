import "./usuario.css";
import { useEffect, useState } from "react";
import {
  Save,
  User,
  Trash2,
  X,
  Mail,
  Lock,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";

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
  const [password, setPassword] = useState("");
  const [id_rol, setIdRol] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (mode === "edit" && user) {
      setNombres(user.nombres || "");
      setApellidos(user.apellidos || "");
      setEmail(user.email || "");
      setPassword("");
      setIdRol(user.id_rol || "");
    } else {
      setNombres("");
      setApellidos("");
      setEmail("");
      setPassword("");
      setIdRol("");
    }
    setShowPassword(false);
  }, [user, mode]);

  const submitLabel = mode === "edit" ? "Actualizar" : "Guardar";

  const clean = (text) => text.replace(/\s+/g, " ").trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const nombresClean = clean(nombres);
    const apellidosClean = clean(apellidos);
    const emailClean = email.trim();

    if (!nombresClean) return setError("El nombre es obligatorio");
    if (!apellidosClean) return setError("El apellido es obligatorio");
    if (!emailClean) return setError("El correo es obligatorio");
    if (mode === "create" && !password.trim()) {
      return setError("La contraseña es obligatoria");
    }
    if (!id_rol) return setError("Selecciona un rol");

    const payload = {
      ...user,
      nombres: nombresClean,
      apellidos: apellidosClean,
      email: emailClean,
      id_rol: Number(id_rol),
    };

    if (password.trim()) {
      payload.password = password.trim();
    }

    onSubmit?.(payload);
  };

  return (
    <div className="FormPanelWrap">
      <form className="CrearProd formCard" onSubmit={handleSubmit} autoComplete="off">
        <div className="TittleCreate">
          <section className="titleIconWrap">
            <User className="cardLayer" />
          </section>

          <section className="textTitleCreate">
            <div className="routeLayer">
              <span className="bnj">
                {mode === "edit" ? "Actualizar usuario" : "Crear usuario"}
              </span>
            </div>

            <h3>Usuario</h3>

            <small>
              {mode === "edit"
                ? "Edita la información del usuario"
                : "Agrega un nuevo usuario al sistema"}
            </small>
          </section>
        </div>

        {message && <div className="formMessage">{message}</div>}
        {error && <div className="formMessage formMessageError">{error}</div>}

        <div className="InputCreate oneColumn">
          <div className="InputItenCreate">
            <label>Nombres</label>
            <div className="inputWithIcon">
              <User size={18} />
              <input
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Mario"
                autoComplete="off"
                name="new-name"
              />
            </div>
          </div>

          <div className="InputItenCreate">
            <label>Apellidos</label>
            <div className="inputWithIcon">
              <User size={18} />
              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Quispe Flores"
                autoComplete="off"
                name="new-lastname"
              />
            </div>
          </div>

          <div className="InputItenCreate">
            <label>Correo</label>
            <div className="inputWithIcon">
              <Mail size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mario@email.com"
                autoComplete="off"
                name="new-email"
              />
            </div>
          </div>

          <div className="InputItenCreate">
            <label>{mode === "edit" ? "Nueva Contraseña" : "Contraseña"}</label>
            <div className="inputWithIcon passwordWrap">
              <Lock size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                name="new-password"
              />
              <button
                type="button"
                className="togglePassword"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="InputItenCreate">
            <label>Rol</label>
            <div className="inputWithIcon selectWrap">
              <Shield size={18} />
              <select
                value={id_rol}
                onChange={(e) => setIdRol(e.target.value)}
                name="new-role"
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
        </div>

        <div className="FormFooter">
          <div className="footerHint">
            {mode === "create"
              ? "Completa los campos para registrar un nuevo usuario."
              : "Puedes modificar los datos o actualizar la contraseña."}
          </div>

          <div className="ButtonCreate">
            <button type="button" className="btnCancel" onClick={onCancel}>
              <X size={18} />
              Cancelar
            </button>

            {mode === "edit" && onDelete && (
              <button
                type="button"
                className="btnDelete"
                onClick={() => onDelete(user?.id_usuario)}
              >
                <Trash2 size={18} />
                Eliminar
              </button>
            )}

            <button type="submit" className="btnSave" disabled={loading}>
              <Save size={18} />
              {loading ? "Guardando..." : submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;