import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ErrorPage = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div>
      <h1>!Ups¡ Parece que algo anda mal</h1>
      <p>La página que buscas no existe o ha habido un error en el servidor</p>
      <button onClick={() => window.history.back()}>Volver</button>
      <Link to="/" onClick={() => (isAuthenticated ? logout() : null)}>
        Volver login
      </Link>
    </div>
  );
};

export default ErrorPage;
