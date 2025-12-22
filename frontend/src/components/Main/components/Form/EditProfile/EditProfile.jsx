import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile({ onUpdate }) {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  // Cargar datos actuales del usuario en el formulario
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAbout(currentUser.about || "");
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault(); //
    onUpdate({ name, about }); //
  }

  return (
    <form className="popup__form" id="FormProfile" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        className="popup__input popup__input--name"
        id="inputname"
        name="name"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input_type_error" id="inputname-error"></span>

      <input
        type="text"
        placeholder="Acerca de mí"
        className="popup__input popup__input--about"
        id="inputprofesion"
        name="about"
        minLength="2"
        maxLength="200"
        required
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <span
        className="popup__input_type_error"
        id="inputprofesion-error"
      ></span>

      <button className="popup__submit-button" type="submit" id="save">
        Guardar
      </button>
    </form>
  );
}
