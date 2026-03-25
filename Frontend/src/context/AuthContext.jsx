import { createContext, useState, useEffect } from "react";
import axiosClient from "../api/client";

//se esta realizando la implementacion para multiempresa

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [empresa, setEmpresa] = useState({});
  // const [workerjob, setWorkerjob] =useState({});
  const [loading, setLoading] = useState(true);
  //CONSULTAR USUARIO
const fetchUser = async () => {
  try {
    const response = await axiosClient.get("/users/me");
    setUser(response.data);
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  // LOGIN
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









