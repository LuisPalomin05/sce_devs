import { Bell, Search, MessageSquare } from "lucide-react";
import rostro from "../assets/rostro.avif";
import { useState, useEffect, useRef } from "react"; //aquiva el context

//hooks
import { useInfo } from "../hooks/useInfo";

import LogOut from "./LogOut";

const HeaderPage = () => {
  const containerRef = useRef(null);

  const { nombres, apellidos, email } = useInfo();
  const [isVisible, setVisible] = useState(false);

  const [txtBuscar, setTxtBuscar] = useState(
    "Buscar cotizaciones, clientes o productos.",
  );

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
    <div className="HeaderPage" ref={containerRef}>
      {false ? <></> : ``}
      <div className="SearchHeader">
        <Search color="#b7b0b0" size={16} />
        <input type="text" placeholder={txtBuscar} />
      </div>
      <div className="btnHeaderAlerts">
        <Bell size={18} />
        <MessageSquare size={18} />
      </div>
      <div className="UserInfo" onClick={() => setVisible(!isVisible)}>
        <div className="UserInfoHeader">
          <p className="fontBlack"> {nombres} </p>
          {/* <p className='fontGrayInfo'> {user.rol} </p> */}
        </div>
        <img className="HeaderImage" src={rostro} alt="" />
      </div>

      {isVisible && (
        <div id="cardPerfil">
          <strong>
            {nombres} {apellidos}
          </strong>
          <p>{email}</p>

          <div className="btnPerfil">
            <div className="btnPerfilBtn">Perfil</div>
          </div>

          <div className="btnPerfil">
            <div className="btnPerfilBtn">Configuración</div>
          </div>

          <LogOut Color="#ffffff" />
        </div>
      )}
    </div>
  );
};

export default HeaderPage;
