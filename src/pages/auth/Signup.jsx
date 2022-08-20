import React from 'react'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signupService } from '../../services/auth.services'


function Signup() {

    const navigate = useNavigate()
    // ESTADOS que controlan los campos 
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    // FUNCIONES QUE ACTUALIZAN LOS ESTADOS 
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    } 

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        // contactar con el servicio, se recopilar la info, enviar y crear usuario 
        // se crea el usuario 

        const user = {
          username: username,
          email: email,
          password: password,          
        }

        // contactar el servicio 

        try {
            await signupService(user)
            navigate("/login")
            
        } catch (error) {

            if(error.response.status === 400){
                setErrorMessage(error.response.data.errorMessage)
            }else {
                navigate("/error")
            }
        }
    }

  return (
    <div>
        <form onSubmit={handleSignup} >
            <br />
            <label>Nombre:</label>
            {/* value el valor del estdo, onchange ejecuta la funcion */}
            <input type="text" name="username" value={username} onChange={handleUsernameChange}/> 
            <br />
            <label>Email:</label>
            <input type="text" name="email" value={email} onChange={handleEmailChange}/>
            <br />
            <label>Contraseña:</label>
            <input type="password" name="password" value={password} onChange={handlPasswordChange}/>
            <br />
            {errorMessage ?  <p>{errorMessage}</p> : null} 
            <br />
            <button type='submit'>Registrar</button>
        </form>

    </div>
  )
  
}

export default Signup