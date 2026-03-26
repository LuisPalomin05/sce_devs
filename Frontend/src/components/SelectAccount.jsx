import { DynamicIcon } from "lucide-react/dynamic";
import { useInfo } from "../hooks/useInfo";
import { useState, useEffect, useRef } from "react";
import axiosClient from '../api/client';

// se realiza el codigo para el uso de una sola empres y que se guarde en el estado local.

const SelectAccount = () => {
  const containerRef = useRef(null);

  const { empresas, empresa, setEmpresa } = useInfo();

  const [isVisible, setVisible] = useState(false);

  // useEffect(() => {
  //   if (empresas && empresas.length > 0) {
  //     setEmpresa(empresas[0]);
  //   }
  // }, [empresas]);

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
        <p className="fontBlack">{empresa.razon_social}</p>
        <p className="fontGrayInfo">ruc: {empresa.ruc}</p>
      </div>

      <div className="cambiarEmpresa" onClick={() => setVisible(!isVisible)}>
        <DynamicIcon name={"arrow-right-left"} size={22} color="#535050" />
      </div>

      {isVisible && (
        <div id="cardAccounts">
          <p>Selecciona la empresa a administrar :</p>
          {empresas.map((empresaItem, index) => {
            return (
              <div
                className="AccountJobs"
                key={index}
                onClick={async () => {
                  setEmpresa(empresaItem);
                  localStorage.setItem("empresa", JSON.stringify(empresaItem));

                  await axiosClient.post("/users/set-empresa", {
                    empresa_id: empresaItem.id_empresa
                  });

                  setVisible(false);
                }}
              >
                <div>
                  <div className="orangebg">
                    <DynamicIcon name={"store"} size={22} color="#efebeb" />
                  </div>
                </div>
                <div>
                  <strong>{empresaItem.razon_social}</strong>
                  <p>{empresaItem.ruc}</p>
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
