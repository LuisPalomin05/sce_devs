import "../assets/sidebar.css";
import { DynamicIcon } from "lucide-react/dynamic";

import { Link } from "react-router-dom";
import SelectAccount from "./SelectAccount";
import LogOut from "./LogOut";

const SideBar = () => {
  const menu = [
    { target: "users", icon: "users" },
    { target: "settings", icon: "settings" },
    // { target: "logout", icon: "log-out", label: "Cerrar Sesión" }
  ];

  return (
    <div className="SideBar">
      <SelectAccount />

      <div className="SideBardList">
        <div className="listBar">
          <Link to={"/dashboard"}>
            <div className="SideBarTarget">
              <DynamicIcon
                name={"layout-dashboard"}
                size={22}
                color="#535050"
              />
              <p>Dashboard</p>
            </div>
          </Link>
          {menu.map((item) => (
            <SideBarTarget
              key={item.target}
              Target={item.target}
              icon={item.icon}
            />
          ))}
        </div>

        <LogOut Color="#535050" />
      </div>
    </div>
  );
};

const SideBarTarget = ({ Target, icon }) => {
  return (
    <Link to={`/dashboard/${Target}`}>
      <div className="SideBarTarget">
        <DynamicIcon name={icon} size={22} color="#535050" />

        <p>{Target}</p>
      </div>
    </Link>
  );
};

export default SideBar;
