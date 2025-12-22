import { useState } from "react";

export default function EditAvatar({ onUpdate }) {
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate({ avatar });
  }

  return (
    <div className="popup__container">
      <form
        className="popup__form"
        name="avatar-form"
        onSubmit={handleSubmit}
        style={{ alignContent: "center" }}
      >
        <input
          type="url"
          name="avatar"
          className="popup__input"
          placeholder="Enlace de la imagen"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          style={{ alignContent: "center" }}
        />
        <button type="submit" className="popup__submit-button">
          Guardar
        </button>
      </form>
    </div>
  );
}
