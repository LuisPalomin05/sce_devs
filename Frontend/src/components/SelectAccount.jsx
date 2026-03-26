import { DynamicIcon } from "lucide-react/dynamic";
import { useInfo } from "../hooks/useInfo";
import { useState, useEffect, useRef } from "react";

const SelectAccount = () => {
  const containerRef = useRef(null);

  const { tenants, tenant, setTenant } = useInfo();

  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (tenants && tenants.length > 0) {
      setTenant(tenants[0]);
    }
  }, [tenants]);

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
                onClick={() => {
                  setTenant(tenantItem);
                  setVisible(false);
                }}
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
