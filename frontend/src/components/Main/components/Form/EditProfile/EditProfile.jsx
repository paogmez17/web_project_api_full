import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Cuando currentUser cambie, llenar las cajitas
  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description }); // Llama a la función del contexto
  };

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
        onChange={handleNameChange}
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
        value={description}
        onChange={handleDescriptionChange}
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
