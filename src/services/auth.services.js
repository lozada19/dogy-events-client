import service from "./config.services"

const signupService = (newUser) => { // () envia la info en el body que usa el baken para crear el usuario 
    return service.post("/auth/signup", newUser)// se conecta 
}

const loginService = (user) => {
    return service.post("/auth/login", user)
}

const verifyService = () => {
    return service.get("/auth/verify")// aqui se envia el token 
}

export {
    signupService,
    loginService,
    verifyService,
}