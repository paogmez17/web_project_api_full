import logo from "../../assets/Vector.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} className="header__logo-vector" alt="logo" />
      </div>
    </header>
  );
}

export default Header;
