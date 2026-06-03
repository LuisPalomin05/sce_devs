const FormularioCotizacion = () => {
  return (
    <div>
      <div>
        <div>
          <p>Datos del Cliente</p>
        </div>
        <div>
          <div>
            <label htmlFor="">RUC / IDENTIFICACION</label>
            <input type="text" name="" id="" />
          </div>
          <div>
            <label htmlFor="">NOMBRE EMPRESA</label>
            <input type="text" name="" id="" />
          </div>
          <div>
            <label htmlFor="">DIRECCION FISCAL</label>
            <input type="text" name="" id="" />
          </div>
          <div>
            <label htmlFor="">ATENCION A </label>
            <input type="text" name="" id="" />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Configuracion</p>
        </div>
        <div>
          <div>
            <small>TIPO MONEDA</small>
            <div>
                <div>
                    <p>Soles</p>
                </div>
                <div>
                    <p>Dolares</p>
                </div>
            </div>
          </div>
          <div>
            <small>FORMA DE PAGO</small>
          <select name="" id="">
            <option value="">Contado</option>
            <option value="">Credito</option>
            <option value="">Credito 7 dias</option>
            <option value="">Credito 15 dias</option>
            <option value="">Credito 30 dias</option>
          </select>
          
          </div>
        </div>
      </div>
    </div>
  );
};


export default FormularioCotizacion;