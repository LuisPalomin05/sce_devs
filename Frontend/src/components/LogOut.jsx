import { DynamicIcon } from "lucide-react/dynamic";
import { useLogOut } from "../hooks/useLogOut";

const LogOut = ({ Color }) => {
  const logout = useLogOut();

  return (
    <div
      className="SideBarTarget"
      onClick={logout}
      style={{ border: `1px solid ${Color}` }}
    >
      <DynamicIcon name={"log-out"} size={22} color={Color} />
      <p style={{ color: `${Color}` }}>Cerrar Sesion</p>
    </div>
  );
};

export default LogOut;
