import "../assets/config.css";
import rostro from "../assets/rostro.avif";
import { DynamicIcon } from "lucide-react/dynamic";
import { useInfo } from "../hooks/useInfo";
import { useState, useEffect, useRef } from "react";
import axiosClient from "../api/client";

const Configuracion = () => {
  // hooks
  const { nombres, apellidos, email, tenant } = useInfo();

  const containerRef = useRef(null);
  const modalRef = useRef(null);

  const [inputState, setInputState] = useState(false);
  const [dangerState, setDangerState] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    dni: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDangerState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="configuracion" ref={containerRef}>
      <div className="titleConfig">
        <h3>Configuracion y Perfil</h3>
        <p>
          Administra tu identidad digital y preferencias del ecosistema{" "}
          {tenant.razon_social}.
        </p>
      </div>

      <div className="BodyConfig">
        <div className="PerfilPanel">
          <div className="PerfilDescription">
            <img className="configImgPerfil" src={rostro} alt="rostro" />
            <p className="fontBlack"> {nombres} </p>
            <p className="fontOrange"> {apellidos} </p>
          </div>
          <div className="PanelPerfilInfo">
            <InfoUsuario txtTitle={"CORREO ELECTRONICO"} txtInfo={email} />
            <PassUsuario
              txtTitle={"CONTRASEÑA"}
              txtInfo={"*********"}
              statespass={inputState}
              funs={setInputState}
            />
            <InfoUsuario txtTitle={"NUMERO DNI"} txtInfo={"70300000"} />
          </div>
          {/* <div onClick={() => setInputState(!inputState)}>Actualizar contraseña</div> */}

          {/* <div className="PanelPerfilBtn">
            <button className="btn editarPefil fontOrange">
              Editar Perfil
            </button>
            <button
              className="btn seguridad fontBlack"
              onClick={() => setInputState(!inputState)}
            >
              Seguridad
            </button>
          </div> */}
        </div>
        <div className="PreferPanel">
          <div>
            <h3>Preferencias de interfaz</h3>
            <div className="ItemPreference">
              <DynamicIcon name={"sun-moon"} />
              <div>
                <p>Modo Oscuro</p>
                <p>Cambia entre tema oscuro y claro.</p>
              </div>
              <div>
                <input type="checkbox" name="" id="ModoTema" />
              </div>
            </div>
            <div className="ItemPreference">
              <DynamicIcon name={"languages"} />
              <div>
                <p>Idioma del sistema</p>
                <p>Selecciona el lenguaje de la plataforma.</p>
              </div>
              <div>
                <select name="idioma" id="idioma">
                  <option value="ES">Español (ES)</option>
                </select>
              </div>
            </div>
          </div>
          <div></div>
          {inputState && (
            <div className="botoneraConfig">
              <div className="btnCancelar" onClick={() => setInputState(false)}>
                Cancelar
              </div>
              {/* <button type="submit" className=" btnGuardar">Guardar Cambios</button> */}
            </div>
          )}
        </div>
      </div>

      <div className="footerConfig">
        <div className="EstadoCuenta">
          <h4 className="fontBlack">Estado de Cuenta</h4>
          <p className="fontGrayInfo">tu cuenta esta verificada y activa.</p>
        </div>

        <DangerZone setDangerState={setDangerState} />
      </div>

      {dangerState && (
        <div className="overlay">
          <DangerZoneContent
            name={nombres}
            lastname={apellidos}
            setDangerState={setDangerState}
            modalRef={modalRef}
          />
        </div>
      )}
    </div>
  );
};

const InfoUsuario = ({ txtTitle, txtInfo }) => {
  return (
    <div className="infoUsuario">
      <p className="fontGrayInfo">{txtTitle}</p>
      <p className="fontBlackInfo">{txtInfo}</p>
    </div>
  );
};

const PassUsuario = ({ txtTitle, txtInfo, statespass, funs }) => {
  const [validarPassword, setValidarPassword] = useState({
    newPassword: "",
    validatePassword: "",
  });

  const validarCampos = (newpass, validate) => {
    if (newpass !== validate) {
      alert("Las contraseñas no coinciden");
      return null;
    }

    if (newpass.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return null;
    }

    return newpass;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validacion = validarCampos(
      validarPassword.newPassword,
      validarPassword.validatePassword,
    );

    if (validacion) {
      try {
        const response = await axiosClient.put("/api/user/update-password", {
          password: validacion,
        });
        alert("Contraseña actualizada correctamente");
        setValidarPassword({
          newPassword: "",
          validatePassword: "",
        });
      } catch (error) {
        alert("Error al actualizar la contraseña");
      }
    }
  };

  return (
    <form className="formSecurity" onSubmit={handleSubmit}>
      <p className="fontGrayInfo">{txtTitle}</p>

      {statespass ? (
        <div className="infoUsuarioSecurity">
          <div className="inputPass">
            <input
              className="inputSecurity"
              type="password"
              name=""
              id=""
              placeholder="Nueva Contraseña"
              onChange={(e) =>
                setValidarPassword({
                  ...validarPassword,
                  newPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="inputPass">
            <input
              className="inputSecurity"
              type="password"
              placeholder="Confirmar Contraseña"
              onChange={(e) =>
                setValidarPassword({
                  ...validarPassword,
                  validatePassword: e.target.value,
                })
              }
            />
          </div>
          <button type="submit" className="btnGuardar">
            Aceptar
          </button>
        </div>
      ) : (
        <div className="infosecurity">
          <p className="fontBlackInfo formatpass">{txtInfo}</p>
          <UpdatePass setInputState={funs} estado={statespass} />
        </div>
      )}
    </form>
  );
};

const UpdatePass = ({ setInputState, estado }) => {
  return (
    <div className="btnGuardar" onClick={() => setInputState(!estado)}>
      Actualizar contraseña
    </div>
  );
};

const DangerZone = ({ setDangerState }) => {
  return (
    <div className="DangerZone">
      <div>
        <h4>Zona de Riesgo</h4>
        <p className="fontGrayInfo">
          una vez desactivada la cuenta no hay marcha atras.
        </p>
      </div>
      <div className="borderDanger" onClick={() => setDangerState(true)}>
        <p>Desactivar cuenta</p>
      </div>
    </div>
  );
};

const DangerZoneContent = ({ name, lastname, setDangerState, modalRef }) => {
  return (
    <div className="borderDangerContent" ref={modalRef}>
      <div className="TitleDanger">
        <p>Desactivar mi cuenta</p>{" "}
        <p onClick={() => setDangerState(false)} className="CloseDanger">
          x
        </p>
      </div>
      <div className="contentDanger">
        <p>¿Estas seguro de desactivar tu cuenta?</p>
        <p className="fntDanger">{name}</p>
        <p className="fntDanger">{lastname}</p>
      </div>
      <div className="bottomDanger">
        <button>Desactivar cuenta</button>
      </div>
    </div>
  );
};

export default Configuracion;
