import { createContext, useState, useEffect } from "react";
import axiosClient from "../api/client";
import useTheme from "../hooks/useTheme";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState(() => {
    const stored = localStorage.getItem("tenant");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const response = await axiosClient.get("/users/me");
      const userData = response.data;

      setUser(userData);

      const storedTenant = JSON.parse(localStorage.getItem("tenant"));

    const validTenant = userData.tenants?.find(
      (t) => t.id_tenant === storedTenant?.id_tenant
    );

      const finalTenant = validTenant || userData.tenant_activa || null;

      setTenant(finalTenant);
      localStorage.setItem("tenant", JSON.stringify(finalTenant));
    } catch (error) {
      localStorage.removeItem("token");
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

      return { ok: true };
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);

        return { ok: false, message: "Credenciales incorrectas" };
      }
      return { ok: false, message: "Error del servidor" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tenant");
    setUser(null);
    setTenant(null);

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
    isDark,
    toggleTheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
