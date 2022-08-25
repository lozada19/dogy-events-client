import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMyEventService } from "../services/event.services";

function MyEvent() {
  const navigate = useNavigate();

  const [myEvent, setMyEvent] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getMyEvent();
  }, []);

  const getMyEvent = async () => {
    try {
      const response = await getMyEventService();
      setMyEvent(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>... is Loading</h3>;
  }

  return (
    <div>
      
      <h1 className="list">Mis Eventos creados</h1>

      {myEvent.map((eachMyEvent) => {
        return (
          <li key={eachMyEvent._id}>
            <div className="list">
              <div className="list-dog">
                <img className="image-dog" src={eachMyEvent.image} alt="image" />
                <Link
                  className="list-name.dog"
                  to={`/event/${eachMyEvent._id}/details`}
                >
                  {eachMyEvent.eventname}
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default MyEvent;
