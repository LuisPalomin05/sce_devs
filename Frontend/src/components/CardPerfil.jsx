import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useInfo } from "../hooks/useInfo";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom"

import LogOut from "./LogOut";

const CardPerfil = () => {
  const { nombres, apellidos, email } = useInfo();
  const { isDark, toggleTheme } = useContext(AuthContext);

  return (
    <div id="cardPerfil">
      <div>
        <div></div>
        <div className="infoCardPerfil">
          <strong>
            {nombres} {apellidos}
          </strong>
          <small>{email}</small>
        </div>
      </div>

      <button className="btnTheme" onClick={toggleTheme}>
        <p>Tema: </p>
        {isDark ? (
          <div className="btnThemeOption">
            <p> Claro</p>
            <Sun />
          </div>
        ) : (
          <div className="btnThemeOption">
            <p>Oscuro</p>
            <Moon />
          </div>
        )}
      </button>
      <Link to={'/dashboard/perfil'}>
        <div className="btnPerfil">
          <div className="btnPerfilBtn">Perfil</div>
        </div>
      </Link>
      <Link to={'/dashboard/settings'}>

        <div className="btnPerfil">
          <div className="btnPerfilBtn">Configuración</div>
        </div>
      </Link>
      <LogOut Color="#ffffff" />
    </div>
  );
};

export default CardPerfil;
