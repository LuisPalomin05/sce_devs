import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useInfo = () =>{
    const {user, setEmpresa, empresa} = useContext(AuthContext);

        if (!user) {
        return {
            nombres: "",
            apellidos: "",
            email: "",
            empresas: []
        };
    }

    const { nombres, apellidos, email, empresas } = user;

    return {nombres, apellidos, email, empresas, setEmpresa, empresa};
    
}

export {useInfo};