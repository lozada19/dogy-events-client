import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
//service
import {
  deleteEventSernvice,
  getEventeDetailsService,
  addMyDogServise,
} from "../../services/event.services";
import { getMyDogServise } from "../../services/dog.services";

function EvenDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const { user } = useContext(AuthContext);

  //ESTADOS
  const [detailsEvent, setDetailsEvent] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  //estado controlado
  const [myDog, setMyDog] = useState(null);
  const [choosenDog, setChoosenDog] = useState(null);

  //FUNCIONES QUE ACTUALIZAN LOS ESTADOS

  useEffect(() => {
    getDetailsEvent();
    getMydog(); // estado controlado
  }, []);
  //parte del formulario
  const getMydog = async () => {
    try {
      const response = await getMyDogServise();
     
      setMyDog(response.data);
    } catch (error) {}
  };

  const getDetailsEvent = async () => {
    try {
      const response = await getEventeDetailsService(eventId);
      
      setDetailsEvent(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEventSernvice(eventId);
      navigate("/event");
    } catch (error) {
      navigate("/error");
    }
  };
  // parte del formulario

  const handleMyDog = (event) => {
    
    setChoosenDog(event.target.value);
  };

  const addMyDog = async (event) => {
    event.preventDefault();

    const newPet = {
      pet: choosenDog,
    };

    try {
      

      const response = await addMyDogServise(eventId, choosenDog);
      
      setDetailsEvent(response.data); // actulaiza la lista al momento de añadir al perrito

      //navigate("/event")
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3 className="isLoading">... is Loading</h3>;
  }

  
  return (
    <div className="container-events">
      <div className="cart-events">
        <p className="title">Detalles de los eventos </p>
        <div className="cart-text">
          <img
            className="image-details"
            src={detailsEvent.image}
            alt="image"
            width={150}
          />
          <div className="cart-text2">
            <p>Nombre del evento:{detailsEvent.eventname}</p>
            <p>Fecha:{detailsEvent.date}</p>
            <p>Descripcion:{detailsEvent.description}</p>
            <p>Direccion:{detailsEvent.address}</p>
            <p>Creador:{detailsEvent.owner.username}</p>
            <div className="cart-button">
              {user._id == detailsEvent.owner._id ? (
                <button className="button" onClick={handleDelete}>
                  Borrar
                </button>
              ) : null}
              {user._id == detailsEvent.owner._id ? (
                <Link to={`/event/${eventId}/edit`}>
                  <button className="button">Editar</button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
          <form className="forn-añadir" onSubmit={addMyDog}>
            <label htmlFor="myDog">Mascota</label>
            <select className="input-añadir" name="myDog" onChange={handleMyDog}>
              {myDog.map((eachDog) => {
                return <option value={eachDog._id}>{eachDog.namedog}</option>;
              })}
            </select>
            <button className="button-añadir" type="submit">Añadir</button>
          </form>
        </div>
        <div>
          <p className="title2"> Perritos apuntados:</p>
          {/* {detailsEvent.map((eachDog))} de esta manera no pasa nada no entra al pet ya que esta en un array */}
          {detailsEvent.pet.map((eachDog) => {
            return <li className="list-añadir" key={eachDog._id}>{eachDog.namedog}</li>;
          })}
        </div>
    </div>
  );
}

export default EvenDetails;
