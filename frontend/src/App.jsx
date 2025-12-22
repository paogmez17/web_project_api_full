import { useEffect, useState } from "react";
import api from "./utils/api";
import * as auth from "./utils/auth";
import CurrentUserContext from "./contexts/CurrentUserContext";

import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import EditProfile from "./components/Main/components/Form/EditProfile/EditProfile";
import EditAvatar from "./components/Main/components/Form/EditAvatar/EditAvatar";
import NewCard from "./components/Main/components/Form/NewCard/NewCard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // ================= TOKEN CHECK =================
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        loadInitialData();
      })
      .catch(() => localStorage.removeItem("jwt"));
  }, []);

  // ================= LOAD DATA =================
  function loadInitialData() {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(console.error);
  }

  // ================= USER =================
  function handleUpdateUser(data) {
    api.editUserInfo(data).then((user) => {
      setCurrentUser(user);
      setPopup(null);
    });
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data.avatar).then((user) => {
      setCurrentUser(user);
      setPopup(null);
    });
  }

  // ================= CARDS =================
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev]);
        setPopup(null);
      })
      .catch(console.error);
  }

  //  LIKE REAL (BACKEND)
  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    const request = isLiked ? api.removeLike(card._id) : api.addLike(card._id);

    request.then((updatedCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? updatedCard : c))
      );
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  // ================= AUTH =================
  function handleLogin(email, password) {
    auth.authorize(email, password).then(({ token }) => {
      localStorage.setItem("jwt", token);
      setLoggedIn(true);
      setShowLogin(false);
      loadInitialData();
    });
  }

  function handleRegister(email, password) {
    auth.register(email, password).then(() => setShowLogin(true));
  }

  // ================= POPUPS =================
  const popups = {
    editProfile: {
      title: "Editar perfil",
      children: <EditProfile onUpdate={handleUpdateUser} />,
    },
    editAvatar: {
      title: "Cambiar avatar",
      children: <EditAvatar onUpdate={handleUpdateAvatar} />,
    },
    newCard: {
      title: "Nueva tarjeta",
      children: <NewCard onAddPlace={handleAddPlaceSubmit} />,
    },
  };

  // ================= RENDER =================
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {loggedIn ? (
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onOpenPopup={setPopup}
            onClosePopup={() => setPopup(null)}
            popup={popup}
            popups={popups}
          />
        ) : showLogin ? (
          <Login
            onLogin={handleLogin}
            switchToRegister={() => setShowLogin(false)}
          />
        ) : (
          <Register
            onRegister={handleRegister}
            switchToLogin={() => setShowLogin(true)}
          />
        )}

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
