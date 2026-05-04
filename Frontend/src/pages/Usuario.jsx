import "../components/usuario.css";
import { Download, PencilLine, User, LayersPlus } from "lucide-react";
import { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../api/client";
import { AuthContext } from "../context/AuthContext";
import UserForm from "../components/UserForm";
import { exportToPDF } from "../utils/exportPDF";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [formUser, setFormUser] = useState(null);
  const [formMessage, setFormMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const { tenant } = useContext(AuthContext);
  const location = useLocation();
  const [highlightId, setHighlightId] = useState(null);
  const rowRefs = useRef({});

  const getEstadoClass = (estado) => {
    const estados = {
      Activo: "activo",
      Inactivo: "inactivo",
    };
    return estados[estado] || "";
  };

  useEffect(() => {
    if (!tenant) return;

    const getUsuarios = async () => {
      try {
        const res = await axiosClient.get("/usuario", {
          headers: { "x-tenant-id": tenant?.id_tenant },
        });

        const dataFormateada = res.data.map((u) => ({
          ...u,
          estado: u.activo ? "Activo" : "Inactivo",
        }));

        setUsuarios(dataFormateada);
      } catch (error) {
      }
    };

    getUsuarios();
  }, [tenant]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlight = params.get("highlight");

    if (highlight) {
      setHighlightId(String(highlight));
    }
  }, [location.search]);

  useEffect(() => {
    if (!highlightId || usuarios.length === 0) return;

    const row = rowRefs.current[String(highlightId)];
    if (row?.scrollIntoView) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });

      const timer = setTimeout(() => {
        setHighlightId(null);
      }, 2200);

      const params = new URLSearchParams(location.search);
      if (params.has("highlight")) {
        params.delete("highlight");
        const cleanedSearch = params.toString();
        window.history.replaceState(
          null,
          "",
          `${location.pathname}${cleanedSearch ? `?${cleanedSearch}` : ""}`
        );
      }

      return () => clearTimeout(timer);
    }
  }, [highlightId, usuarios, location.pathname, location.search]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const res = await axiosClient.get("/usuario/roles", {
          headers: { "x-tenant-id": tenant?.id_tenant },
        });
        setRoles(res.data);
      } catch (error) {
      }
    };

    if (tenant) getRoles();
  }, [tenant]);

  const resetForm = () => {
    setFormVisible(false);
    setFormMode("create");
    setFormUser(null);
    setFormMessage("");
    setFormLoading(false);
  };

  const openNewUser = () => {
    setFormMode("create");
    setFormUser({
      nombres: "",
      apellidos: "",
      email: "",
      id_rol: "",
    });
    setFormMessage("");
    setFormVisible(true);
  };

  const openEditUser = (item) => {
    setFormMode("edit");
    setFormUser(item);
    setFormMessage("");
    setFormVisible(true);
  };

  const refreshUsuarios = async () => {
    try {
      const res = await axiosClient.get("/usuario", {
        headers: { "x-tenant-id": tenant?.id_tenant },
      });

      const dataFormateada = res.data.map((u) => ({
        ...u,
        estado: u.activo === 1 || u.activo === true ? "Activo" : "Inactivo",
      }));

      setUsuarios(dataFormateada);
    } catch (error) {
    }
  };

  const handleSaveUser = async (userData) => {
    setFormLoading(true);
    setFormMessage("");

    try {
      const headers = { "x-tenant-id": tenant?.id_tenant };

      if (formMode === "create") {
        await axiosClient.post("/usuario", userData, { headers });
        setFormMessage("Usuario creado correctamente.");
      } else {
        await axiosClient.put(`/usuario/${userData.id_usuario}`, userData, {
          headers,
        });
        setFormMessage("Usuario actualizado correctamente.");
      }

      await refreshUsuarios();
      resetForm();
    } catch (error) {
      console.error(error);
      setFormMessage("Ocurrió un error al guardar el usuario.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    setFormLoading(true);
    setFormMessage("");

    try {
      await axiosClient.delete(`/usuario/${userId}`, {
        headers: { "x-tenant-id": tenant?.id_tenant },
      });

      setFormMessage("Usuario eliminado correctamente.");
      await refreshUsuarios();
      resetForm();
    } catch (error) {
      console.error(error);
      setFormMessage("Ocurrió un error al eliminar el usuario.");
    } finally {
      setFormLoading(false);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    if (filtro === "Todos") return true;
    return u.rol?.trim().toLowerCase() === filtro.trim().toLowerCase();
  });

const handleExportPDF = () => {
  const data = usuariosFiltrados.map((u) => [
    `${u.nombres} ${u.apellidos}`,
    u.email,
    u.rol || "Sin rol",
    u.estado,
  ]);

  exportToPDF({
    title: "Reporte de Usuarios",
    subtitle:
      filtro === "Todos"
        ? "Todos los usuarios"
        : `Usuarios - ${filtro}`,
    columns: ["Nombre completo", "Correo", "Rol", "Estado"],
    data,
    fileName:
      filtro === "Todos"
        ? "usuarios.pdf"
        : `usuarios_${filtro.toLowerCase()}.pdf`,
  });
};

  return (
    <div className="usuarioContent">
      <div className="usuarioHeader">
        <div className="usuarioTittle">
          <p>Gestión de Usuarios</p>
          <small>Control de usuarios y permisos en el tenant</small>
        </div>

        <div className="usuarioHeaderActions">
          <button
            type="button"
            className="btnExportReport"
            onClick={handleExportPDF}
          >
            <Download />
            <p>Exportar Reporte</p>
          </button>

          <button type="button" className="btnExportReport" onClick={openNewUser}>
            <LayersPlus />
            <p>Agregar Nuevo</p>
          </button>
        </div>
      </div>

      {!formVisible && (
        <div className="filtros">
          <ul>
            <li
              className={filtro === "Todos" ? "active" : ""}
              onClick={() => setFiltro("Todos")}
            >
              Todos
            </li>

            {roles.map((rol) => (
              <li
                key={rol.id_rol}
                className={filtro === rol.nombre ? "active" : ""}
                onClick={() => setFiltro(rol.nombre)}
              >
                {rol.nombre}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="TableContendorUsuario">
        {formVisible ? (
          <UserForm
            user={formUser}
            roles={roles}
            mode={formMode}
            onSubmit={handleSaveUser}
            onCancel={resetForm}
            onDelete={handleDeleteUser}
            loading={formLoading}
            message={formMessage}
          />
        ) : (
          <div className="UsuarioTable">
            <div className="UsuarioTableHeader">
              <p>NOMBRE COMPLETO</p>
              <p>CORREO ELECTRÓNICO</p>
              <p>ROL</p>
              <p>ESTADO</p>
              <p>ACCIONES</p>
            </div>

            <div className="UsuarioTableBody">
              {usuariosFiltrados.length === 0 ? (
                <p className="alertaUser">
                  No hay usuarios en esta categoría.{" "}
                  <button className="linkButton" type="button" onClick={openNewUser}>
                    Agregar Aquí
                  </button>
                </p>
              ) : (
                usuariosFiltrados.map((item) => (
                  <div
                    key={item.id_usuario}
                    ref={(el) => {
                      if (el) rowRefs.current[item.id_usuario] = el;
                    }}
                    className={`UsuarioTableItem ${
                      highlightId === String(item.id_usuario) ? "highlighted" : ""
                    }`}
                  >
                    <div className="NombUsuarioTable">
                      <div className="itemUser">
                        <User />
                      </div>
                      <div className="NombUsuario">
                        <p>
                          {item.nombres} {item.apellidos}
                        </p>
                        <small>ID: {item.id_usuario}</small>
                      </div>
                    </div>

                    <div className="emailUsuario">{item.email}</div>
                    <div className="rolUsuario">{item.rol || "Sin rol"}</div>

                    <div className={`estadoUsuario ${getEstadoClass(item.estado)}`}>
                      {item.estado}
                    </div>

                    <div className="actionButtons">
                      <button
                        type="button"
                        className="actionUsuario"
                        onClick={() => openEditUser(item)}
                      >
                        <PencilLine />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuario;