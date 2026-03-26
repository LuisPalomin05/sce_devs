import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useInfo = () => {
  const { user, setTenant, tenant } = useContext(AuthContext);

  if (!user) {
    return {
      nombres: "",
      apellidos: "",
      email: "",
      tenants: [],
    };
  }

  const { nombres, apellidos, email, tenants } = user;

  return { nombres, apellidos, email, tenants, setTenant, tenant };
};

export { useInfo };
