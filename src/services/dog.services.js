import service from "./config.services"


const getDogService = () => {
    return service.get("/dog")
}

const getDogDetailsService = (dogId) => {
    return  service.get(`/dog/${dogId}`)
}

const addDogService = (newDog) => {
    console.log(newDog)
    return service.post("/dog",newDog)
}

const deleteDogService = (dogId) => {
    return service.delete(`/dog/${dogId}`)
}

const updateDogService = (dogId, updateDog) => {
    return service.patch(`/dog/${dogId}`, updateDog)
}

export {
    getDogService,
    getDogDetailsService,
    addDogService,
    deleteDogService,
    updateDogService
}