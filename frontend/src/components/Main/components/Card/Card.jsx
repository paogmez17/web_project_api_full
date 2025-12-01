import Trash from "../../../../images/Trash.svg";
import Heart from "../../../../images/group.png";
import React from "react";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const { name, link, isLiked } = card;

  // Evita pasar src vacío
  const cardLink = link || null;

  return (
    <div className="card">
      <img
        className="card__image"
        src={cardLink}
        alt={name}
        onClick={() => onCardClick(card)}
        style={{ cursor: "pointer" }}
      />

      <button
        className="card__delete-button"
        type="button"
        aria-label="Delete card"
        style={{ backgroundImage: `url(${Trash})` }}
        onClick={() => onCardDelete(card)} // ✅ ahora viene como prop
      ></button>

      <h2 className="card__title">{name}</h2>

      <button
        aria-label="Like card"
        type="button"
        className={`card__like-button ${
          isLiked ? "card__like-button--active" : ""
        }`}
        onClick={() => onCardLike(card)}
      ></button>
    </div>
  );
}
