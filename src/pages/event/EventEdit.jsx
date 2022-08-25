import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//servicios
import {
  getEventeDetailsService,
  updateEventService,
} from "../../services/event.services";
import { uploadService } from "../../services/upload.services";

function EventEdit() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  // estdos controlados
  const [eventname, setEventName] = useState(null);
  const [date, setDateEvent] = useState(null);
  const [description, setDescriptionEvent] = useState(null);
  const [addres, setAddressEvent] = useState(null);

  //ESTDO PARA GUARDAR EL URL QUE VENDRA DE CLOUDINAYÇ
  const [imageUrl, setImageUrl] = useState(""); // imagen

  //FUNCIONES QUE ACTUALIZAN LOS ESTADOS
  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleDateEventChange = (event) => {
    setDateEvent(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionEvent(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddressEvent(event.target.value);
  };

  useEffect(() => {
    getDetailsEvent();
  }, []);

  const getDetailsEvent = async () => {
    try {
      const response = await getEventeDetailsService(eventId);
    
      setEventName(response.data.eventname);
      setDateEvent(response.data.date);
      setDescriptionEvent(response.data.description);
      setAddressEvent(response.data.address);
      setImageUrl(response.data.image); //image se llama en bd
    } catch (error) {
      
      navigate("/error");
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    const eventObj = {
      eventname: eventname,
      date: date,
      description: description,
      address: addres,
      image: imageUrl,
    };

    try {
      
      await updateEventService(eventId, eventObj);
      navigate("/event");
    } catch (error) {
      navigate("/error");
    }
  };
  // IMAGEN

  const handleImgUpload = async (event) => {
    
    const form = new FormData();
    form.append("image", event.target.files[0]);
    try {
      const response = await uploadService(form);
   
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="container">
      <form>
        <div className="title">Editar eventos</div>
        <div className="input-container">
          <label htmlFor="eventname">Nombre del evento:</label>
          <input
          className="input"
            type="text"
            name="eventname"
            value={eventname}
            onChange={handleEventNameChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="date">Fecha:</label>
          <input
          className="input"
            type="date"
            name="date"
            value={date}
            onChange={handleDateEventChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Descripcion:</label>
          <input
          className="input"
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          ></input>
        </div>

        <div className="input-container">
          <label htmlFor="addres">Direccion:</label>
          <input
          className="input"
            type="text"
            name="addres"
            value={addres}
            onChange={handleAddressChange}
          ></input>
        </div>
        <div className="input-container">
          <input type="file" onChange={handleImgUpload} />
    
        </div>
        <img src={imageUrl} alt="image" width={200} />

        <button className="submit" onClick={handleEdit}>Editar</button>
      </form>
    </div>
  );
}

export default EventEdit;
