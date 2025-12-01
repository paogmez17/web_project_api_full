import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar({ avatar: avatarRef.current.value });
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Avatar URL"
        className="popup__input popup__input--avatar"
        ref={avatarRef}
        required
      />
      <span className="popup__input_type_error" id="avatar-error"></span>

      <button className="popup__submit-button" type="submit">
        Guardar
      </button>
    </form>
  );
}
