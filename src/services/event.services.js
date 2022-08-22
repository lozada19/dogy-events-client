import service from "./config.services"

const getEventService = () => {
    return service.get("/event")
}

const getEventeDetailsService = (eventId) => {
    return service.get(`/event/${eventId}`)
}

const addEventService = (newEvent) => {
    return service.post("/event", newEvent)
}

const deleteEventSernvice = (eventId) => {
    return service.delete(`/event/${eventId}`)
}

const updateEventService = (eventId, updateEvent) => {
    return service.patch(`/event/${eventId}`, updateEvent)
}

export {
    getEventService,
    getEventeDetailsService,
    addEventService,
    deleteEventSernvice,
    updateEventService
}