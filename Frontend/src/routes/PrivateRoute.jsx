import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {

  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
  return (
    <div style={{display:"flex", justifyContent:"center", marginTop:"100px"}}>
      <p>Cargando sistema...</p>
    </div>
  );
}

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;