import { useState } from "react"
import { useNavigate } from "react-router-dom"

//servicios
import { addEventService } from "../../services/event.services"



function AddFormEvent() {

  const navigate = useNavigate()

  // ESTADOS CONTROLADOS => controlan los campos
  const [ eventname, setEventname ] = useState(null)
  const [ date, setDate ] = useState(null)
  const [ description, setDescription ] = useState(null)
  const [ address, setAddress ] = useState(null) 


   //FUNCIONES QUE ACTUALIZAN LOS ESTADOS 
  const handleEventName = (event) => {
    setEventname(event.target.value)
  }

  const handleDate = (event) => {
    setDate(event.target.value)
  }

  const handleDescription = (event) => {
    setDescription(event.target.value)
  }

  const handleAddress = (event) => {
    setAddress(event.target.value)
  }

  const handleSignup = async (event) => {
    event.preventDefault()

    const newEvent = {
      eventname: eventname,
      date: date,
      description: description,
      address: address
    }

    try {
      await addEventService(newEvent)
      navigate("/event")
    } catch (error) {
      navigate("/error")
    }
  }


   
  return (
    <div>
        <h1>crear eventos </h1>
        <form>
          <label htmlFor="eventname">Nombre del evento:</label>
          <input type="text" name="eventname" onChange={handleEventName} value={eventname}/>
          <br />
          <label htmlFor="date">Fecha:</label>
          <input type="date" name="date" onChange={handleDate} value={date}/>
          <br />
          <label htmlFor="description">Descripcion:</label>
          <textarea type="text" name="description" onChange={handleDescription} value={description}
          ></textarea> 
          <br />
          <label htmlFor="addres">Direccion:</label>
          <textarea type="text" name="addres" onChange={handleAddress} value={address}
          ></textarea> 
          <br />
          <button onClick={handleSignup}>Crear</button>
          

        </form>
    </div>
  )
}

export default AddFormEvent