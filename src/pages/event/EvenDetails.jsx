import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

//service
import { deleteEventSernvice, getEventeDetailsService } from "../../services/event.services"

function EvenDetails() {

  const navigate = useNavigate()
  const { eventId } = useParams()

  const [ detailsEvent, setDetailsEvent ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    getDetailsEvent()
  }, [])

  const getDetailsEvent = async () => {
    try {
      const response = await getEventeDetailsService(eventId)
      console.log("RESPONSE EVENT", response.data)
      setDetailsEvent(response.data)
      setIsFetching(false)
    } catch (error) {
      navigate("/error")
    }
  }

  const handleDelete = async () => {
    try {
      await deleteEventSernvice(eventId)
      navigate("/event")
    } catch (error) {
      navigate("/error")
    }
  }

  if (isFetching === true) {
    return <h3>... is Loading</h3>
  }
  
  console.log("DETALLES EVENT", detailsEvent)
  return (
    <div>
        <h1>detalles de los eventos </h1>

        <p>Nombre del evento:{detailsEvent.eventname}</p>
        <p>Fecha:{detailsEvent.date}</p>
        <p>Descripcion:{detailsEvent.description}</p>
        <p>Direccion:{detailsEvent.address}</p>
        <p>Creador:{detailsEvent.owner.username}</p>

        <button onClick={handleDelete}>Borrar</button>
        <Link to={`/event/${eventId}/edit`}><button>Editar</button></Link>

    </div>
  )
}

export default EvenDetails