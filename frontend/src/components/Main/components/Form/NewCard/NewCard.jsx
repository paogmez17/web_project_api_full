import { useState } from "react";
import api from "../../../../../utils/api";

export default function NewCard({ onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        onAddPlace(newCard); // actualiza estado en App
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        className="popup__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Enlace imagen"
        className="popup__input"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <button type="submit" className="popup__submit-button">
        Crear
      </button>
    </form>
  );
}
