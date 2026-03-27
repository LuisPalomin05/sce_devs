import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useNotifications";
import '../assets/login.css';
import torque from '../assets/icot.png';
import { DynamicIcon } from "lucide-react/dynamic";


const Login = () => {
  const { login } = useContext(AuthContext);
  const { success, errorToast, warning } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(form.email, form.password);

      if (result.ok) {
        success("Sesión iniciada");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        errorToast(result.message);
      }


    } catch (error) {
      warning('error al servir la informacion');
    }
  };

  return (
    <div className="cntLogin">
      <div className="tittleLogin">
        <div className="nameLogin">
          {/* <img src="" alt="" /> */}
          <p>SCE</p>
        </div>
        <div>Soporte Tecnico</div>
      </div>
      <div className="LoginPanel">
        <div className="cntLoginPanel">
          <div className="LoginImage">
            <img className="icnLogin" src={torque} alt="Rostro de usuario" />
            <p className="LoginTittle">Bienvenido de nuevo</p>
            <p>Inicia sesión con tus credenciales</p>
          </div>

          <form onSubmit={handleSubmit} className="formLogin">

            <div className="inputsContendor">

              <div className="inputGroup">
                <div>
                  <p className="boldtxt">Correo electrónico</p>
                </div>
                <div className="itmInput">
                  <DynamicIcon name="mail" size={16} color="#b3aaaa" />
                  <input
                    type="email"
                    name="email"
                    className="inputformItem"
                    placeholder="ejemplo@torqueg46.com.pe"
                    onChange={handleChange}
                    required
                  /></div>
              </div>

              <div className="inputGroup">
                <div className="passcnt">
                  <p className="boldtxt">Contraseña</p>
                  <p className="alertOrange">¿Olvidaste tu contraseña?</p>
                </div>
                <div className="itmInput">
                  <DynamicIcon name="lock-keyhole" size={16} color="#b3aaaa" />
                  <input
                    type="password"
                    name="password"
                    className="inputformItem"
                    placeholder="*********"
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

            </div>
            <div className="footerLogin">
              <div className="checkItems">
                <input type="checkbox" name="recordar" id="recordar" />
                <label htmlFor="recordar">Recordar Sesion  </label>
              </div>
              <button type="submit" className="BottonLogin">Inicia Sesion</button>
            </div>


          </form>

        </div>

        <div className="footLogin">
          <div className="leyendafooter"><p>¿No tienes cuenta?</p> <p className="alertOrange boldtxt pointer">Contactar Administrador</p></div>
          <div className="leyenda boldtxt">
            SCE SISTEMAS - 2026 SOFTWARE DE GESTION EMPRESARIAL
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;