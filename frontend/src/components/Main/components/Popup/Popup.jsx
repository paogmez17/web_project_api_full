import Close from "../../../../images/CloseIcon.png";

export default function Popup({ onClose, title, children }) {
  if (!children && !title) return null; // si no hay contenido, no mostrar nada

  return (
    <div className={`popup popup_opened`}>
      <div className="popup__container">
        <button
          className="popup__exit"
          type="button"
          aria-label="Close"
          onClick={onClose}
        ></button>

        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
