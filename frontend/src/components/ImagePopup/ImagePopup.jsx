import Popup from "../Main/components/Popup/Popup";
export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__exit"
          onClick={onClose}
          aria-label="Close"
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
      </div>
    </div>
  );
}
