import {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { deleteDogService, getDogDetailsService } from "../../services/dog.services"


function DogDetails() {

  const navigate = useNavigate()
  const { dogId } = useParams()
  
  const [ detailsDog, setDetailsDog ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    getDetailsDog()
  }, [])

  const getDetailsDog = async () => {
    try {
      const response = await getDogDetailsService(dogId)
      console.log("RESPONSE DOG", response.data)
      setDetailsDog(response.data)
      setIsFetching(false)
    } catch (error) {
      navigate("/error")
    }
  }

  const handleDelete = async () => {
    try {
      await deleteDogService(dogId)
      navigate("/dog")
    } catch (error) {
      navigate("/error")
      
    }
  }

  if (isFetching === true) {
    return <h3>... is Loading</h3>
  }

 console.log("DETALLES DOG", detailsDog)
  return (
    <div>
        <h1>ver detalles de los perritos</h1>
        <p>Nomnbre: {detailsDog.namedog}</p>
        <p>Fecha de nacimiento:{detailsDog.dateofBirth}</p>
        <p>Raza: {detailsDog.breed}</p>
        <p>Sobre mi: {detailsDog.aboutme}</p>
        <p>imagen:{detailsDog.image}</p>
        <p>Dueño:{detailsDog.owner.username}</p>

        <button onClick={handleDelete}>Borrar</button>
        <Link to={`/dog/${dogId}/edit`}><button>Editar</button></Link>
    </div>
  )
}

export default DogDetails