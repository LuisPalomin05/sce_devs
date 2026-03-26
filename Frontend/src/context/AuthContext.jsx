import { createContext, useState, useEffect } from "react";
import axiosClient from "../api/client";

//se actualiza el nombramiento de variables de empresa a tenant
//bajo supervision para coincidir con las reglas de negocio y backend

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState({});

  const [loading, setLoading] = useState(true);
  //CONSULTAR USUARIO
  const fetchUser = async () => {
    try {
      const response = await axiosClient.get("/users/me");
      const userData = response.data;

      setUser(userData);

      setTenant(userData.tenant_activa);

      localStorage.setItem("tenant", JSON.stringify(userData.tenant_activa));
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      await fetchUser();
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
      setUser(null);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    tenant,
    setTenant,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
