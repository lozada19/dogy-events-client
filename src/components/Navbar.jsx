import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();

  const [navbarOpen, setNavbarOpen] = useState(false);

  const { isUserActive, user, authenticateUser } = useContext(AuthContext);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  const handleLogout = () => {
    // aqui vamos a destruir el token
    localStorage.removeItem("authToken");
    // autenticar el usuario
    authenticateUser();
    // se redirecciona al usuario
    navigate("/");
  };

  const activesStyles = {
    color: "black",
    textDecoration: "underline",
    // margin: "10px"
  };

  const inactiveStyles = {
    color: "black",
    textDecoration: "none",
    //margin: "10px"
  };

  const selecStyle = (navinfo) =>
    navinfo.isActive === true ? activesStyles : inactiveStyles;

  if (isUserActive === true) {
    return (
      <div className="menu-navbar">
        <button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</button>

        <ul className={`nav-bar ${navbarOpen ? " showMenu" : "navBurger"}`}>
          <NavLink
            style={selecStyle}
            to="/profile"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Perfil
          </NavLink>

          <NavLink
            style={selecStyle}
            to="/dog"
            end={true}
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Ver Perritos
          </NavLink>

          <NavLink
            style={selecStyle}
            to="/dog/add-form"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Crear perritos
          </NavLink>
          <NavLink
            style={selecStyle}
            to="/event"
            end={true}
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Ver eventos
          </NavLink>
          <NavLink
            style={selecStyle}
            to="/event/add-form"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Crear evento
          </NavLink>
          {/* <Link onClick={handleLogout} >Perfil</Link> */}
          <button
            className="button-cerrar"
            onClick={handleLogout}
            activeClassName="active-link"
            exact
          >
            Cerrar sesion
          </button>
          {/* <p>{user.email}</p>  */}
        </ul>
        <div className="logo">Dogy Events</div>
      </div>
    );
  } else {
    return (
      <div className="menu-navbar">
        
        <button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</button>
        <ul className={`nav-bar ${navbarOpen ? " showMenu" : "navBurger"}`}>
          <NavLink
            style={selecStyle}
            to="/"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Inicio
          </NavLink>
          <NavLink
            style={selecStyle}
            to="/signup"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Registro
          </NavLink>
          <NavLink
            style={selecStyle}
            to="/login"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Iniciar sesion
          </NavLink>
        </ul>
        <div className="logo">Dogy Events</div>
      </div>
    );
  }
}

export default Navbar;
