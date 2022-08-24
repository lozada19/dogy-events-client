import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  // ESTADOS que controlan los campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // FUNCIONES QUE ACTUALIZAN LOS ESTADOS
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    // contactar con el servicio, se recopilar la info, enviar y crear usuario
    // se crea el usuario

    const user = {
      email: email,
      password: password,
    };

    // contactar el servicio
    try {
      const response = await loginService(user); //contactamos con el login que nos da el token
      // el token
      // estraer el token
      const authtoken = response.data.authToken; // aqui se guarda el token localStore
      // dos arguentos  primero el valor de la preiedad en ""  y el segundo el valor que va a tener
      //                       |          |
      localStorage.setItem("authToken", authtoken); // asi se resive en la consola y se guarda

      authenticateUser(); // envocamos la funcion que viene de context y contacta con el servicio de verify

      navigate("/profile");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSignup}>
          
          <div className="title">Iniciar sesion</div>
          <div className="input-container">
            {/* value el valor del estdo, onchange ejecuta la funcion */}
            <input
              id="email"
              className="input"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <div className="cut cut-short"></div>
            <label className="placeholder">Email:</label>
            <div className="cut cut-short"></div>
          </div>
     
          <div className="input-container">
            
            <input
            id="contraseña"
            className="input"
              type="password"
              name="password"
              value={password}
              onChange={handlPasswordChange}
            />
            <div class="cut"></div>
            <label className="placeholder">Contraseña:</label>
          </div>
         
          {errorMessage ? <p>{errorMessage}</p> : null}
        
          <div>
          <button className="submit" type="submit">Iniciar sesion</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
