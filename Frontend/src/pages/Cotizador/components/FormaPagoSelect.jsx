import { useState } from "react";

const FormaPagoSelect = () => {
  const opciones = [
    "Contado",
    "Crédito",
    "Crédito 7 días",
    "Crédito 15 días",
    "Crédito 30 días",
  ];

  const [abierto, setAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState(opciones[0]);

  const seleccionarOpcion = (opcion) => {
    setSeleccionado(opcion);
    setAbierto(false);
  };

  return (
    <div className="forma-pago">
      <small className="titulo-forma-pago">Forma de Pago</small>

      <div className="custom-select">
        <div
          className="custom-select__selected"
          onClick={() => setAbierto(!abierto)}
        >
          <span>{seleccionado}</span>
          <span className={`flecha ${abierto ? "abierta" : ""}`}>
            ▼
          </span>
        </div>

        {abierto && (
          <div className="custom-select__options">
            {opciones.map((opcion) => (
              <div
                key={opcion}
                className="custom-select__option"
                onClick={() => seleccionarOpcion(opcion)}
              >
                {opcion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormaPagoSelect;
