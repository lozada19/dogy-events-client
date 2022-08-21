import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useContext } from 'react'

import { AuthContext } from '../context/auth.context'


function Navbar() {

  const navigate = useNavigate()

  const { isUserActive, user, authenticateUser } = useContext(AuthContext)

  const handleLogout = () => {
    // aqui vamos a destruir el token 
    localStorage.removeItem("authToken")
    // autenticar el usuario 
    authenticateUser()
    // se redirecciona al usuario
    navigate("/")

  }

  const activesStyles = {
    color: "pink",
    textDecoration: "underline",
    margin: "10px"
  }

  const inactiveStyles = {
    color: "black",
    textDecoration: "none",
    margin: "10px"
  }

  const selecStyle = (navinfo) => navinfo.isActive === true ? activesStyles : inactiveStyles

  if ( isUserActive === true ) {
    return (
      <div>
        <NavLink style={selecStyle} to="/home">Inicio</NavLink>
        <NavLink style={selecStyle} to="/profile">Perfil</NavLink>
        <NavLink style={selecStyle}  to="/dog" end={true}>Ver Perritos</NavLink>
        <NavLink style={selecStyle}  to="/dog/add-form"  >Crear perritos</NavLink>
        <NavLink style={selecStyle} to="/event" end={true}>Ver eventos</NavLink>
        <NavLink style={selecStyle}  to="/event/add-form" >Crear evento</NavLink>
        {/* <Link onClick={handleLogout} >Perfil</Link> */}
        <button onClick={handleLogout}>Cerrar sesion</button>
        <p>{user.email}</p>
      </div>
    )
  }else {
    return (
      <div>
          <NavLink style={selecStyle} to="/home">Inicio</NavLink>
          <NavLink style={selecStyle} to="/signup">Registro</NavLink>
          <NavLink style={selecStyle} to="/login">Iniciar sesion</NavLink>
      </div>
    )
  }
  
}

export default Navbar