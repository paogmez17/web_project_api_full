import { useState } from "react";

export default function NewCard({ onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <div className="popup__container">
      <form className="popup__form" onSubmit={handleSubmit}>
        <input
          className="popup__input"
          maxLength="30"
          minLength="1"
          placeholder="Título"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="popup__input"
          placeholder="Enlace de la imagen"
          required
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button className="popup__submit-button" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}
