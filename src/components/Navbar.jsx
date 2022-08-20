import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

  if ( isUserActive === true ) {
    return (
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/profile">Perfil</Link>
        
         {/* <Link onClick={handleLogout} >Perfil</Link> */}
        <button onClick={handleLogout}>Cerrar sesion</button>
        <p>{user.email}</p>
      </div>
    )
  }else {
    return (
      <div>
          <Link to="/">Inicio</Link>
          <Link to="/signup">Registro</Link>
          <Link to="/login">Iniciar sesion</Link>
      </div>
    )
  }
  
}

export default Navbar