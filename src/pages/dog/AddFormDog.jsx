
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addDogService }  from "../../services/dog.services"

function AddFormDog(props) {

    const navigate = useNavigate()

    // ESTADOS CONTROLADOS => controlan los campos
    const [nameDog, setNameDog] = useState(null)
    const [dateofBirth, setDateofBirth] = useState(null)
    const [breed, setBreed] = useState(null)
    const [aboutme, setAboutme] = useState(null)
    const [image, setImage] = useState(null)

    //FUNCIONES QUE ACTUALIZAN LOS ESTADOS 
    const handleNameDog = (event) => {
        setNameDog(event.target.value)
    }

    const handleDateofBirth = (event) => {
        setDateofBirth(event.target.value)
    }

    const handleBreed = (event) => {
        setBreed(event.target.value)
    }

    const handleAboutme = (event) => {
        setAboutme(event.target.value)
    }

    const handleImage = (event) => {
        setImage(event.target.value)
    }

    const handleSignup = async (event) => {
        event.preventDefault()
    
        const newDog = {
            namedog: nameDog,
            dateofBirth: dateofBirth,
            breed: breed,
            aboutme: aboutme,
            image: image
        }

        console.log(newDog)

        try {
            await addDogService(newDog)
            props.getDog()
        } catch (error) {
            console.log(error)
            navigate("/error")
        }
    }
    
  return (
    <div>
        <h1>crear perritos </h1>

        <form>
            <label htmlFor="nameDog">Nombre:</label>
            <input type="text" name="nameDog" onChange={ handleNameDog} value={nameDog} />
            <br />
            <label htmlFor="dateofBirth">Fecha de nacimiento:</label>
            <input type="date" name="dateofBirth" onChange={handleDateofBirth} value={dateofBirth} />
            <br />
            <label htmlFor="breed">Raza:</label>
            <input type="text" name="breed" onChange={handleBreed} value={breed} />
            <br />
            <label htmlFor="aboutme">Sobre mi:</label>
            <input type="text" name="aboutme" onChange={handleAboutme} value={aboutme} />
            <br />
            {/* PREGUNTAR POR LA IMAGEN  */}
            <label htmlFor="image">Imagen:</label>
            <input type="text" name="image" onChange={handleImage} value={image} /> 
            <br />
            <button onClick={handleSignup}>Crear</button>

        </form>
    </div>
  )
}

export default AddFormDog