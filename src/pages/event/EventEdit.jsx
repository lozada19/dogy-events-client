import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//servicios
import { getEventeDetailsService, updateEventService } from "../../services/event.services"

function EventEdit() {

  const navigate = useNavigate()
  const { eventId } = useParams()

  // estdos controlados
  const [ eventname, setEventName ] = useState(null)
  const [ date, setDateEvent ] = useState(null)
  const [ description, setDescriptionEvent ] = useState(null)
  const [ addres, setAddressEvent ] = useState(null)

  //FUNCIONES QUE ACTUALIZAN LOS ESTADOS
  const handleEventNameChange = (event) => {
    setEventName(event.target.value)
  }

  const handleDateEventChange = (event) => {
    setDateEvent(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescriptionEvent(event.target.value)
  }

  const handleAddressChange = (event) => {
    setAddressEvent(event.target.value)
  }

  useEffect(() => {
    getDetailsEvent()
  }, [])

  const getDetailsEvent = async () => {
    try {
      const response = await getEventeDetailsService(eventId)
      console.log("RESPONSE EVENT EDIT",response.data)
      setEventName(response.data.eventname)
      setDateEvent(response.data.date)
      setDescriptionEvent(response.data.description)
      setAddressEvent(response.data.address)
    } catch (error) {
      console.log("ERROR EVENT", error)
      navigate("/error")
      
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault()

    const eventObj = {
      eventame: eventname,
      date: date,
      description: description,
      address: addres
    }

    try {
      await updateEventService(eventId, eventObj)
      navigate("/event")
    } catch (error) {
      navigate("/error")
    }
  }


  return (
    <div>
      <h1>editar evento</h1>
      <form >
      <label htmlFor="eventname">Nombre del evento:</label>
          <input type="text" name="eventname" value={eventname} onChange={handleEventNameChange} />
          <br />
          <label htmlFor="date">Fecha:</label>
          <input type="date" name="date" value={date} onChange={handleDateEventChange} />
          <br />
          <label htmlFor="description">Descripcion:</label>
          <input type="text" name="description" value={description} onChange={handleDescriptionChange} 
          ></input> 
          <br />
          <label htmlFor="addres">Direccion:</label>
          <input type="text" name="addres" value={addres} onChange={handleAddressChange} 
          ></input> 
          <br />
          <button onClick={handleEdit}>Editar</button>
      </form>


    </div>
  )
}

export default EventEdit