import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getDogService } from "../../services/dog.services"

function DogList() {

  const navigate = useNavigate()

  //
  const [allDog, setAllDog] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(()=> {
    getDog()
  },[])

  const getDog = async () => {
     try {
      const response = await getDogService()
      setAllDog(response.data)
      setIsFetching(false)
     } catch (error) {
      navigate("/error")
     }
  }

  if (isFetching === true) {
    return <h3>... is Loading</h3>
  }


  return (
    <div>
        <h1>lista de perritos</h1>
       
        {allDog.map((eachDog) =>{

          return <li key={eachDog._id}> 
            <Link to={`/dog/${eachDog._id}/details`}>{eachDog.namedog}</Link>

          </li>
        })}
    </div>
  )
}

export default DogList