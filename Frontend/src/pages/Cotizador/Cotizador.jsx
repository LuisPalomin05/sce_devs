import React from "react";
import "./Cotizador.css";
import TituloCotizacion from "./components/TituloCotizacion";
import FormularioCotizacion from "./components/FormularioCotizacion";
import TablaCotizacion from "./components/TablaCotizacion";
import ResumenCotizacion from "./components/ResumenCotizacion";
import OpcionesCotizacion from "./components/OpcionesCotizacion";

const Cotizador = () => {
  return (
    <div>
      <TituloCotizacion />
      <FormularioCotizacion />
      <div className="enlinea">
        <TablaCotizacion />
        <div>
          <ResumenCotizacion />
          <OpcionesCotizacion />
        </div>
      </div>
    </div>
  );
};

export default Cotizador;
