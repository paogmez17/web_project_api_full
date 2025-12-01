import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfile from "./Main/components/Form/EditProfile/EditProfile";
import EditAvatar from "./Main/components/Form/EditAvatar/EditAvatar";
import NewCard from "./Main/components/Form/NewCard/NewCard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  // -------------------------
  // Verificar token al cargar
  // -------------------------
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    auth
      .checkToken(jwt)
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
        loadInitialData();
      })
      .catch((err) => console.log("Token inválido:", err.message || err));
  }, []);

  // -------------------------
  // Cargar usuario + tarjetas si hay login
  // -------------------------
  const loadInitialData = () => {
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((err) =>
        console.error("Error cargando usuario:", err.message || err)
      );

    api
      .getInitialCards()
      .then((cards) => setCards(cards))
      .catch((err) =>
        console.error("Error cargando tarjetas:", err.message || err)
      );
  };

  // -------------------------
  // Actualizar usuario
  // -------------------------
  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        setPopup(null);
      })
      .catch((err) =>
        console.error("Error actualizando usuario:", err.message || err)
      );
  };

  // -------------------------
  // Actualizar avatar
  // -------------------------
  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data.avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        setPopup(null);
      })
      .catch((err) =>
        console.error("Error actualizando avatar:", err.message || err)
      );
  };

  // -------------------------
  // Card handlers
  // -------------------------
  const handleAddPlaceSubmit = (newCard) => {
    setCards([newCard, ...cards]);
  };

  const handleCardLike = (cardToLike) => {
    setCards(
      cards.map((c) =>
        c._id === cardToLike._id ? { ...c, isLiked: !c.isLiked } : c
      )
    );
  };

  const handleCardDelete = (cardToDelete) => {
    setCards(cards.filter((c) => c._id !== cardToDelete._id));
  };

  // -------------------------
  // Popups configurados
  // -------------------------
  const popups = {
    editProfilePopup: { title: "Edit profile", children: <EditProfile /> },
    editAvatarPopup: { title: "Edit avatar", children: <EditAvatar /> },
    newCardPopup: {
      title: "New place",
      children: <NewCard onAddPlace={handleAddPlaceSubmit} />,
    },
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header />

        {loggedIn && (
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onOpenPopup={setPopup}
            onClosePopup={() => setPopup(null)}
            popup={popup}
            popups={popups}
          />
        )}

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
