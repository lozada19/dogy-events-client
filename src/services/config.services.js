import axios from "axios" 

const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`
})

// interceptar la llamda y agregar el token 
service.interceptors.request.use((config) => {
    // buscar el token 
    const authToken = localStorage.getItem("authToken")

    // se agrega el token al request
    if ( authToken){
        config.headers = {
            authorization: `Bearer ${authToken}`
        }
    }
    return config 
})

export default service