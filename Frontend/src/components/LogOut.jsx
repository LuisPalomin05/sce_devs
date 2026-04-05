import { DynamicIcon } from "lucide-react/dynamic";
import { useLogOut } from "../hooks/useLogOut";

const LogOut = ({ Color }) => {
  const logout = useLogOut();

  return (
    <div
      className="SideBarTarget"
      onClick={logout}
      style={{ border: `1px solid ${Color}`, background: '#ffffff' }}
    >
      <DynamicIcon name={"log-out"} size={22} color={Color} />
      <p style={{ color: `${Color}`, background: '#ffffff' }}>Cerrar Sesion</p>
    </div>
  );
};

export default LogOut;
