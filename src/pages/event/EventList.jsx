import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// servicos
import { getEventService } from "../../services/event.services";

function EventList() {
  const navigate = useNavigate();

  const [allEvent, setAllEvent] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    try {
      const response = await getEventService();
      console.log("RESPONDE.DATA", response.data);
      setAllEvent(response.data);
      setIsFetching(false);
      navigate("/event");
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3 className="isLoading">... is Loading</h3>;
  }

  console.log(allEvent);
  return (
    <div className="list-container">
      <h1 className="title">Ver eventos</h1>
      <div className="list">
        {allEvent.map((eachEvent) => {
          return (
            <li key={eachEvent._id}>
              <div className="list-dog">
                <img className="image-dog" src={eachEvent.image} alt="image" />
                <Link
                  className="list-name-dog"
                  to={`/event/${eachEvent._id}/details`}
                >
                  {eachEvent.eventname}
                </Link>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default EventList;
