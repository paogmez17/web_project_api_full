import { useState } from "react";
import "./Login.css";
import Logo from "../../assets/Vector.svg";

export default function Login({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="login">
      <div className="login__header">
        <img src={Logo} alt="Logo" className="login__logo" />
        <h2 className="login__header-title">Iniciar sesión</h2>
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login__input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login__input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login__button">
          Iniciar sesión
        </button>
      </form>

      <p className="login__text">
        ¿Aún no eres miembro?{" "}
        <a
          href="#"
          className="login__link"
          onClick={(e) => {
            e.preventDefault();
            switchToRegister();
          }}
        >
          Regístrate aquí
        </a>
      </p>
    </div>
  );
}
