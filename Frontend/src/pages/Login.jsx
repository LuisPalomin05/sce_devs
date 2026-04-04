import "../css/login.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DynamicIcon } from "lucide-react/dynamic";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ THEME LOGIN
  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  // 🔄 Redirigir si ya está logueado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const result = await login(form.email, form.password);

      if (result.ok) {
        navigate("/dashboard");
      } else {
        toast.error(result.message || "Error al iniciar sesión");
      }

    } catch (error) {
      toast.error("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">

        <div className="logoLogin">TG</div>

        <h2>Bienvenido de nuevo</h2>
        <p>Ingresa tus credenciales</p>

        {/* EMAIL */}
        <div className="inputGroup">
          <DynamicIcon name="mail" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* PASSWORD */}
        <div className="inputGroup">
          <DynamicIcon name="lock" size={18} />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* BOTÓN */}
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

      </div>
    </div>
  );
};

export default Login;