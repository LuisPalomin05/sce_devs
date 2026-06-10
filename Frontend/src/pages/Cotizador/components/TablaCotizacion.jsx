import React from "react";

const TablaCotizacion = () => {
  return (
    <div className="tabla-cotizacion">
      <div className="tabla-cotizacion-titulo">
        <div className="titulo-tabla">
          <p>Detalle de Productos</p>
        </div>
        <div className="opciones-tabla">
          <div className="agregar-producto">
            <p>Agregar Producto</p>
          </div>
          <div className="limpiar-tabla">
            <p>limpiar Tabla</p>
          </div>
        </div>
        
      </div>
      <div className="tabla-cotizacion-header">
        
          <div>
            <input type="checkbox" name="" id="" />
          </div>
          <div>DESCRIPCION</div>
          <div>CANTIDAD</div>
          <div>PRECIO UNIT.</div>
          <div>SUBTOTAL</div>
          <div>ACCIONES</div>
        
      </div>
      <div className="tabla-cotizacion-body">

      </div>
    </div>
  );
};

export default TablaCotizacion;