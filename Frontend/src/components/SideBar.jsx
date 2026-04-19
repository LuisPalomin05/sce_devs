import "../assets/sidebar.css";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link, useLocation } from "react-router-dom";
import SelectAccount from "./SelectAccount";
import LogOut from "./LogOut";

const SideBar = () => {
  const location = useLocation();

  const menu = [
    { target: "", label: "Dashboard", icon: "layout-dashboard" },
    { target: "users", label: "Usuarios", icon: "users" },
    { target: "ventas", label: "Ventas", icon: "shopping-cart" },
    { target: "almacen", label: "Almacen", icon: "warehouse" },
    { target: "settings", label: "Configuración", icon: "settings" },
  ];

  return (
    <div className="SideBar ">
      <SelectAccount />

      <div className="SideBardList">
        <div className="listBar">
          {menu.map((item) => {
            const path =
              item.target === ""
                ? "/dashboard"
                : `/dashboard/${item.target}`;

            const isActive =
              location.pathname === path ||
              (item.target === "" && location.pathname === "/dashboard");

            return (
              <SideBarTarget
                key={item.target}
                Target={item.target}
                icon={item.icon}
                label={item.label}
                active={isActive}
              />);
          })}
        </div>

        <LogOut Color="#535050" />
      </div>
    </div>
  );
};

const SideBarTarget = ({ Target, icon, label, active }) => {
  const path =
    Target === "" ? "/dashboard" : `/dashboard/${Target}`;

  return (
    <Link to={path}>
      <div className={`SideBarTarget ${active ? "active" : ''}`}>
        <DynamicIcon
          name={icon}
          size={22}
          color={active ? "#fff" : "#535050"}
        />
        <p>{label}</p>
      </div>
    </Link>
  );
};

export default SideBar;
