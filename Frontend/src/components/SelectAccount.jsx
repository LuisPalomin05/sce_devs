import { DynamicIcon } from "lucide-react/dynamic";
import { useInfo } from "../hooks/useInfo";
import { useState, useEffect, useRef } from "react";
import axiosClient from "../api/client";
import { useToast } from "../hooks/useNotifications";

const SelectAccount = () => {
  const containerRef = useRef(null);
  const {success, errorToast} = useToast();
  const { tenants, tenant, setTenant } = useInfo();

  const [isVisible, setVisible] = useState(false);

const validarTenant = async (tenantItem) => {
  try {
    await axiosClient.post("/users/set-tenant", {
      tenant_id: tenantItem.id_tenant,
    });

    setTenant(tenantItem);

    localStorage.setItem("tenant", JSON.stringify(tenantItem));

    const theme = tenantItem.razon_social.toLowerCase().includes("iron")
      ? "theme-irontools"
      : "theme-torque";

    document.body.classList.remove("theme-torque", "theme-irontools");
    document.body.classList.add(theme);

    setVisible(false);

    success("Empresa cambiada correctamente");

  } catch (error) {
    errorToast("Error al Seleccionar servicio");
  }
};
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="EmpresaTitle" ref={containerRef}>
      <div className="orangebg">
        <DynamicIcon name={"store"} size={22} color="#efebeb" />
      </div>

      <div className="InfoSideTitle">
        <p className="fontBlack">{tenant.razon_social}</p>
        <p className="fontGrayInfo">ruc: {tenant.ruc}</p>
      </div>

      <div className="cambiarEmpresa" onClick={() => setVisible(!isVisible)}>
        <DynamicIcon name={"arrow-right-left"} size={22} color="#535050" />
      </div>

      {isVisible && (
        <div id="cardAccounts">
          <p>Selecciona la empresa a administrar :</p>
          {tenants.map((tenantItem, index) => {
            return (
              <div
                className="AccountJobs"
                key={index}
                onClick={() => validarTenant(tenantItem)}
              >
                <div>
                  <div className="orangebg">
                    <DynamicIcon name={"store"} size={22} color="#efebeb" />
                  </div>
                </div>
                <div>
                  <strong>{tenantItem.razon_social}</strong>
                  <p>{tenantItem.ruc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectAccount;
