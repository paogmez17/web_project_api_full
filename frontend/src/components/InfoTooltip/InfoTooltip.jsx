import "./InfoTooltip.css";
import check from "../../images/registercheck.svg"; //
import error from "../../images/registerror.svg"; //

export default function InfoTooltip({ isOpen, isSuccess, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="tooltip-overlay" onClick={onClose}>
      <div className="tooltip-container" onClick={(e) => e.stopPropagation()}>
        <button className="tooltip-close" onClick={onClose}>
          &times;
        </button>
        <img
          src={isSuccess ? check : error} //
          alt={isSuccess ? "Éxito" : "Error"}
          className="tooltip-icon"
        />
        <p className="tooltip-message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Algo salió mal. Inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}
