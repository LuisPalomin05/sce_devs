import React from "react";
import FormaPagoSelect from "./FormaPagoSelect";

const FormularioCotizacion = () => {
  return (
    <div className="formulario-cotizacion">
      <div className="datos-cliente">
        <div className="titulo-cliente">
          <p>Informacion del Cliente</p>
        </div>
        <div className="datos-cliente-inputs">
          <div className="input-cliente">
            <label className="labelDataCliente" htmlFor="">
              RUC / IDENTIFICACION <span className="input-alerta">*</span>
            </label>
            <input className="inputDataCliente" type="text" name="" id="" />
          </div>
          <div className="input-cliente">
            <label className="labelDataCliente" htmlFor="">
              NOMBRE EMPRESA <span className="input-alerta">*</span>
            </label>
            <input className="inputDataCliente" type="text" name="" id="" />
          </div>
          <div className="input-cliente">
            <label className="labelDataCliente" htmlFor="">
              DIRECCION FISCAL
            </label>
            <input className="inputDataCliente" type="text" name="" id="" />
          </div>
          <div className="input-cliente">
            <label className="labelDataCliente" htmlFor="">
              ATENCION A
            </label>
            <input className="inputDataCliente" type="text" name="" id="" />
          </div>
        </div>
      </div>
      <div className="configuracion-cotizacion">
        <div className="titulo-configuracion">
          <p>Configuracion</p>
        </div>
        <div className="configuracion-opciones">
          <div className="tipo-moneda">
            <small>TIPO MONEDA</small>
            <div className="opciones-tipo-moneda">
              <div className="opcion-moneda active">
                <p>Soles</p>
              </div>
              <div className="opcion-moneda">
                <p>Dolares</p>
              </div>
            </div>
          </div>
          {/* <div className="forma-pago">
            <small className="titulo-forma-pago">FORMA DE PAGO</small>
            <select name="" id="select-forma-pago">
              <option value="">Contado</option>
              <option value="">Credito</option>
              <option value="">Credito 7 dias</option>
              <option value="">Credito 15 dias</option>
              <option value="">Credito 30 dias</option>
            </select>
          </div> */}

          <FormaPagoSelect/>
        </div>
      </div>
    </div>
  );
};

export default FormularioCotizacion;
