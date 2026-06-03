import React from 'react';
import './Cotizador.css';
import TituloCotizacion from './component/TituloCotizacion';
import FormularioCotizacion from './component/FormularioCotizacion';
import TablaCotizacion from './component/TablaCotizacion';
import ResumenCotizacion from './component/ResumenCotizacion';
import OpcionesCotizacion from './component/OpcionesCotizacion';

const Cotizador = () => {

    return(
        <div>
        <TituloCotizacion/>
        <FormularioCotizacion/>
        <TablaCotizacion/>
        <ResumenCotizacion/>
        <OpcionesCotizacion/>
        
        </div>
    )
}

export default Cotizador;