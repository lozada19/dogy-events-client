import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

//service
import { deleteEventSernvice, getEventeDetailsService, addMyDogServise} from "../../services/event.services"

function EvenDetails() {

  const navigate = useNavigate()
  const { eventId ,} = useParams()

  const [ detailsEvent, setDetailsEvent ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  //estado controlado 
 // const [ allPet, setAllPet ] = useState(null)

  //FUNCIONES QUE ACTUALIZAN LOS ESTADOS 
  // const handleAllPet = (event) => {
  //   setAllPet(event.target.value)
  // }

  // const handleSignup = async (event) => {
  //   event.preventDefault()

  //   const newPet = {
  //     pet: allPet,
  //   }

  //   try {
  //     await addMyDogServise(newPet)
  //     //navigate("/event")
  //   } catch (error) {
  //     navigate("/error")
  //   }
  // }

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
  //console.log("ALL PET", allPet)
  return (
    <div>
        <h1>detalles de los eventos </h1>

        <p>Nombre del evento:{detailsEvent.eventname}</p>
        <p>Fecha:{detailsEvent.date}</p>
        <p>Descripcion:{detailsEvent.description}</p>
        <p>Direccion:{detailsEvent.address}</p>
        <p>Creador:{detailsEvent.owner.username}</p>
        <br />

        

        {/* <form>
        <label htmlFor="pet" >Mascota:</label>
        <select>
        {allPet.map((eachPet) => {
          return <li key={eachPet._id}>{eachPet.pet}</li>
        })}
          <option value="allPet" onChange={handleAllPet}></option>
        </select>
        <button onClick={handleSignup}>Añadir</button>
        </form>
        <br /> */}

        <button onClick={handleDelete}>Borrar</button>
        <Link to={`/event/${eventId}/edit`}><button>Editar</button></Link>


    </div>
  )
}

export default EvenDetails