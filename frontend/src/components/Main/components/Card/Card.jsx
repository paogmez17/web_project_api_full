import Trash from "../../../../images/Trash.svg";
import Heart from "../../../../images/group.png";
import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext) || {};

  // ⚠️ PROTECCIÓN: si aún no hay card, no renderizar
  if (!card) return null;

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes?.some((id) => id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <div className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />

      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          aria-label="Delete card"
          style={{ backgroundImage: `url(${Trash})` }}
          onClick={handleDeleteClick}
        />
      )}

      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>

        <div className="card__like-container">
          <button
            aria-label="Like card"
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button--active" : ""
            }`}
            style={{ backgroundImage: `url(${Heart})` }}
            onClick={handleLikeClick}
          />
          <span className="card__like-count">{card.likes?.length || 0}</span>
        </div>
      </div>
    </div>
  );
}
