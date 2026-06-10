const ResumenCotizacion = () => {
  return (
    <div className="resumen-cotizacion">
      <h5 className="titulo-resumen" >Resumen</h5>
      <div className="resumen-detalles">
        <div className="resumen-detalles-item">
          <small className="titulo-Detale" >Monto sin IGV :</small>
          <small >2900</small>
        </div>
        <div className="resumen-detalles-item">
          <small className="titulo-Detale" >IGV (18%) :</small>
          <small>100</small>
        </div>
        <hr />
        <div className="resumen-detalles-item total">
          <strong>Total :</strong>
          <h2 className="monto-total">3000</h2>
        </div>
      </div>
    </div>
  );
};

export default ResumenCotizacion;
