import { useState } from "react";
import "./Register.css";
import Logo from "../../assets/Vector.svg";

export default function Register({ onRegister, switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="register">
      <div className="register__header">
        <img src={Logo} alt="Logo" className="register__logo" />
        <h2 className="register__header-title">Regístrate</h2>
      </div>

      <form className="register__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="register__input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="register__input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="register__button">
          Registrarme
        </button>
      </form>

      <p className="register__text">
        ¿Ya tienes una cuenta?{" "}
        <a
          href="#"
          className="register__link"
          onClick={(e) => {
            e.preventDefault();
            switchToLogin();
          }}
        >
          Inicia sesión aquí
        </a>
      </p>
    </div>
  );
}
