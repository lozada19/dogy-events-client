import { useState } from "react";
import { useNavigate } from "react-router-dom";

//servicios
import { addEventService } from "../../services/event.services";
import { uploadService } from "../../services/upload.services";

function AddFormEvent() {
  const navigate = useNavigate();

  // ESTADOS CONTROLADOS => controlan los campos
  const [eventname, setEventname] = useState(null);
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [address, setAddress] = useState(null);

  //ESTDO PARA GUARDAR EL URL QUE VENDRA DE CLOUDINAYÇ
  const [imageUrl, setImageUrl] = useState("");

  //FUNCIONES QUE ACTUALIZAN LOS ESTADOS
  const handleEventName = (event) => {
    setEventname(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const newEvent = {
      eventname: eventname,
      date: date,
      description: description,
      address: address,
      image: imageUrl,
    };

    try {
      await addEventService(newEvent);
      navigate("/event");
    } catch (error) {
      navigate("/error");
    }
  };

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
        <div className="title">Crea un evento</div>
        <div className="input-container">
          <label htmlFor="eventname">Nombre del evento:</label>
          <input
            className="input"
            type="text"
            name="eventname"
            onChange={handleEventName}
            value={eventname}
          />
        </div>

        <div className="input-container">
          <label htmlFor="date">Fecha:</label>
          <input
            className="input"
            type="date"
            name="date"
            onChange={handleDate}
            value={date}
          />
        </div>

        <div className="input-container">
          <label htmlFor="description">Descripcion:</label>
          <textarea
            className="input"
            type="text"
            name="description"
            onChange={handleDescription}
            value={description}
          ></textarea>
        </div>
        <div className="input-container">
          <label htmlFor="addres">Direccion:</label>
          <textarea
            className="input"
            type="text"
            name="addres"
            onChange={handleAddress}
            value={address}
          ></textarea>
        </div>

        <div className="div-file">
          <p className="text">Imagen</p>
          <input id="btn" type="file" onChange={handleImgUpload} />
          
        </div>

       
        {imageUrl == null ? (<img className="image-selector" src={imageUrl} alt="image" width={80} /> ) : null }
        

        <button className="submit" onClick={handleSignup}>
          Crear
        </button>
      </form>
    </div>
  );
}

export default AddFormEvent;
