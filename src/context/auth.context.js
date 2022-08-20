import { createContext, useEffect } from "react";
import { verifyService } from "../services/auth.services";
import { useState } from "react";

const AuthContext = createContext() // primer componente

function AuthWrapper(props) { // siempre resive props
 // todos los estdos que determinan el usuario activo 
 const [isUserActive, setIsUserActive] = useState(false) 
 const [ user, setUser ] = useState(null) 
 const [isFetching, setFetching ] = useState(true)

 useEffect(() => {
    authenticateUser()
 }, [])

 const authenticateUser = async () => {
    // esta funcion verifica si el usuario
    try {
        const response = await verifyService()// resive el token y verifica si el es valido o no 
        setIsUserActive(true) 
        setUser(response.data)
        setFetching(false)
    } catch (error) {
        setIsUserActive(false)
        setUser(null)
        setFetching(false)
    }
 }

 
 const passedContext = {
    isUserActive,
    user,
    authenticateUser
 }

 if (isFetching === true) {
    return <h3>... Is validating User </h3>
 }

 return (     // se retorna un jsx 
  <AuthContext.Provider value={passedContext}>
    {props.children}
  </AuthContext.Provider>
 ) 

}// el que envuelve app

export {
    AuthContext,
    AuthWrapper,
}
 