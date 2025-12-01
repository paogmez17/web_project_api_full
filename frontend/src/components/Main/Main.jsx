import editButton from "../../images/editbutton.png";
import addButton from "../../images/addbutton.png";
import Popup from "../Main/components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "../ImagePopup/ImagePopup";
import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onOpenPopup,
  onClosePopup,
  popup,
  popups,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => setSelectedCard(card);
  const handleCloseImagePopup = () => setSelectedCard(null);

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-area">
            <img
              className="profile__picture"
              src={currentUser.avatar || ""}
              alt="perfil"
            />
            <button
              type="button"
              className="profile__avatar-edit-button"
              onClick={() => onOpenPopup(popups.editAvatarPopup)}
            >
              <img src={editButton} alt="Editar avatar" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__edit">
              <h2 className="profile__info-name">{currentUser.name || ""}</h2>
              <button
                className="profile__edit-button"
                type="button"
                onClick={() => onOpenPopup(popups.editProfilePopup)}
              >
                <img src={editButton} alt="edit button" />
              </button>
            </div>
            <h3 className="profile__info-career">{currentUser.about || ""}</h3>
          </div>
          <div className="profile__add">
            <button
              aria-label="Add card"
              className="profile__add-button"
              type="button"
              onClick={() => onOpenPopup(popups.newCardPopup)}
            >
              <img
                src={addButton}
                alt="add button"
                className="profile__add-vector"
              />
            </button>
          </div>
        </div>
      </section>

      <section className="elements" id="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={handleCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup
          card={selectedCard}
          onClose={handleCloseImagePopup}
          isOpen={!!selectedCard}
        />
      )}
    </main>
  );
}
