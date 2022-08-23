import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

//service
import { deleteEventSernvice, getEventeDetailsService, addMyDogServise} from "../../services/event.services"
import { getMyDogServise } from "../../services/dog.services"

function EvenDetails() {

  const navigate = useNavigate()
  const { eventId } = useParams()
  
  //ESTADOS
  const [ detailsEvent, setDetailsEvent ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  //estado controlado 
  const [ myDog, setMyDog ] = useState(null)
  const [ choosenDog, setChoosenDog ] = useState(null)

  //FUNCIONES QUE ACTUALIZAN LOS ESTADOS 

  useEffect(() => {
    getDetailsEvent()
    getMydog() // estado controlado 
  }, [])
  //parte del formulario 
   const getMydog = async () => {
   try {
     const response = await getMyDogServise()
     console.log("GETMYDOG",response.data) // los perritos de una persona
      setMyDog(response.data)
    } catch (error) {
      
    }
  }

  const getDetailsEvent = async () => {
    try {
      const response = await getEventeDetailsService(eventId)
      console.log("pet", response.data.pet) // un array vacio 
      console.log("RESPONSE EVENT", response.data) // el evento 
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
// parte del formulario

  const handleMyDog = (event) => {
    console.log("HANDLEMYDOG",event.target.value)
    setChoosenDog(event.target.value)
  }

  const addMyDog = async (event) => {
    event.preventDefault()
    
    const newPet ={
      pet: choosenDog
    }

    try {
      console.log("perrito añadido",choosenDog)
      console.log(eventId)

      await addMyDogServise(eventId, choosenDog)
      
       //navigate("/event")
    } catch (error) {
       navigate("/error")
    }
   }

  if (isFetching === true) {
    return <h3>... is Loading</h3>
  }
  
  console.log("DETALLES EVENT", detailsEvent) 
  console.log("MYDOG", myDog) // mis perritos
  console.log()

  return (
    <div>
        <h1>detalles de los eventos </h1>

        <p>Nombre del evento:{detailsEvent.eventname}</p>
        <p>Fecha:{detailsEvent.date}</p>
        <p>Descripcion:{detailsEvent.description}</p>
        <p>Direccion:{detailsEvent.address}</p>
        <p>Creador:{detailsEvent.owner.username}</p>

        <br />
        <button onClick={handleDelete}>Borrar</button>
        <Link to={`/event/${eventId}/edit`}><button>Editar</button></Link>
        <br />

        <form onSubmit={addMyDog}> 
              <label htmlFor="myDog">Mascota</label>
              <select name="myDog" onChange={handleMyDog}>
                {myDog.map((eachDog)=>{
                  return(
                    <option value={eachDog._id}>{eachDog.namedog}</option>
                    
                  )
                })}
              </select>
              <button type='submit'>Añadir</button>
        </form>

        <h3> perritos apuntados</h3>
        {detailsEvent.pet.map((eachDog) => {
          return (
            <li key={eachDog._id}>{eachDog.namedog}</li>
          )
        })}
        

        

        

    

    </div>
  )
}

export default EvenDetails