import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getMyEventService } from "../services/event.services"

function MyEvent() {

  const navigate = useNavigate()

  const [ myEvent, setMyEvent ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    getMyEvent()
  }, [])

  const getMyEvent = async () => {
    try {
      const response = await getMyEventService()
      setMyEvent(response.data)
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
      <h3>Mis Eventos creados</h3>
      
      {myEvent.map((eachMyEvent) => {
        return <li key={eachMyEvent._id}>
          <Link to={`/event/${eachMyEvent._id}/details`}>{eachMyEvent.eventname}</Link>
        </li>
      })}

    </div>
  )
}

export default MyEvent