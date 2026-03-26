import { createContext, useState, useEffect } from "react";
import axiosClient from "../api/client";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [empresa, setEmpresa] = useState({});
  const [loading, setLoading] = useState(true);
  //CONSULTAR USUARIO
 const fetchUser = async () => {
  try {
    const response = await axiosClient.get("/users/me");
    const userData = response.data;

    setUser(userData);

    setEmpresa(userData.empresa_activa);

    localStorage.setItem("empresa", JSON.stringify(userData.empresa_activa));

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
        password
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
    empresa,
    setEmpresa,
    isAuthenticated: !!user,
    loading
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );


};









