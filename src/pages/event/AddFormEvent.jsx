import { useState } from "react"
import { useNavigate } from "react-router-dom"

//servicios
import { addEventService } from "../../services/event.services"
import { uploadService } from "../../services/upload.services"



function AddFormEvent() {

  const navigate = useNavigate()

  // ESTADOS CONTROLADOS => controlan los campos
  const [ eventname, setEventname ] = useState(null)
  const [ date, setDate ] = useState(null)
  const [ description, setDescription ] = useState(null)
  const [ address, setAddress ] = useState(null) 

   //ESTDO PARA GUARDAR EL URL QUE VENDRA DE CLOUDINAYÇ
   const [imageUrl, setImageUrl] = useState("")


   //FUNCIONES QUE ACTUALIZAN LOS ESTADOS 
  const handleEventName = (event) => {
    setEventname(event.target.value)
  }

  const handleDate = (event) => {
    setDate(event.target.value)
  }

  const handleDescription = (event) => {
    setDescription(event.target.value)
  }

  const handleAddress = (event) => {
    setAddress(event.target.value)
  }

  const handleSignup = async (event) => {
    event.preventDefault()

    const newEvent = {
      eventname: eventname,
      date: date,
      description: description,
      address: address,
      image: imageUrl
    }

    try {
      await addEventService(newEvent)
      navigate("/event")
    } catch (error) {
      navigate("/error")
    }
  }

  const handleImgUpload = async (event) => {
    console.log(event.target.files[0])
    const form = new FormData()
    form.append("image", event.target.files[0])
    try {
        const response = await uploadService(form)
        setImageUrl(response.data.imageUrl)
    } catch (error) {
        navigate("/error")
        
    }
}


   
  return (
    <div>
        <h1>crear eventos </h1>
        <form>
          <label htmlFor="eventname">Nombre del evento:</label>
          <input type="text" name="eventname" onChange={handleEventName} value={eventname}/>
          <br />
          <label htmlFor="date">Fecha:</label>
          <input type="date" name="date" onChange={handleDate} value={date}/>
          <br />
          <label htmlFor="description">Descripcion:</label>
          <textarea type="text" name="description" onChange={handleDescription} value={description}
          ></textarea> 
          <br />
          <label htmlFor="addres">Direccion:</label>
          <textarea type="text" name="addres" onChange={handleAddress} value={address}
          ></textarea> 
          <br />
          <button onClick={handleSignup}>Crear</button>

          <div>
            <h5>Añade una foto del evento:</h5>
            <input type="file" onChange={handleImgUpload} />
            <img src={imageUrl} alt="image" width={80} />
          </div>
          

        </form>
    </div>
  )
}

export default AddFormEvent