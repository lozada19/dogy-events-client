import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import Icon from "../images/menu.png";

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
        <div className="navbar-logo">
          <img className="botton-burger" onClick={handleToggle} src={Icon} />
          <div className="logo2" />
          <div className="logo">Dogy Events</div>
        </div>
        
        <ul className={`${navbarOpen ? " showMenu" : "navBurger"}`}>
          <NavLink
            style={selecStyle}
            to="/profile"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Perfil
          </NavLink>
          <hr className="solid" />
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
          <hr className="solid" />
          <NavLink
            style={selecStyle}
            to="/dog/add-form"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Crear perritos
          </NavLink>
          <hr className="solid" />
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
          <hr className="solid" />
          <NavLink
            style={selecStyle}
            to="/event/add-form"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Crear evento
          </NavLink>
          <hr className="solid" />
          {/* <Link onClick={handleLogout} >Perfil</Link> */}
          <button
            className="button-cerrar"
            onClick={handleLogout}
            activeClassName="active-link"
            exact
          >
            Cerrar sesion
          </button>
          <hr className="solid" />
          {/* <p>{user.email}</p>  */}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="menu-navbar">
        <div className="navbar-logo">
          <img className="botton-burger" onClick={handleToggle} src={Icon} />
          <div className="logo2" />
          <div className="logo">Dogy Events</div>
        </div>

        <ul className={`${navbarOpen ? " showMenu" : "navBurger"}`}>
          <NavLink
            style={selecStyle}
            to="/"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Inicio
          </NavLink>
          <hr className="solid" />
          <NavLink
            style={selecStyle}
            to="/signup"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Registro
          </NavLink>
          <hr className="solid" />
          <NavLink
            style={selecStyle}
            to="/login"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Iniciar sesion
          </NavLink>
          <hr className="solid" />
        </ul>
      </div>
    );
  }
}

export default Navbar;
