import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { uploadService } from "../../services/upload.services"

import {
  getDogDetailsService,
  updateDogService,
} from "../../services/dog.services";

function DogEdit() {
  const navigate = useNavigate();
  const { dogId } = useParams();

  // estdos controlados
  const [nameDog, setNameDog] = useState(null);
  const [dateofBirth, setDateofBirth] = useState(null);
  const [breed, setBreed] = useState(null);
  const [aboutme, setAboutme] = useState(null);
  const [imageUrl, setImageUrl] = useState("") // imagen 

  //FUNCIONES QUE ACTUALIZAN LOS ESTADOS
  const handleNameDogChange = (event) => {
    setNameDog(event.target.value);
  };

  console.log("",  dateofBirth)

  const handleDateofBirthChange = (event) => {
    console.log("", event.target.value)
    setDateofBirth(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleAboutmeChange = (event) => {
    setAboutme(event.target.value);
  };

  const handleImagechange = (event) => {
    setImageUrl(event.target.files[0]) //imagen 
  }


  useEffect(() => {
    getDetailsDog()
  }, [])

  const getDetailsDog = async () => {
    try {
      const response = await getDogDetailsService(dogId)
      setNameDog(response.data.namedog)
      setDateofBirth(response.data.dateofBirth)
      setBreed(response.data.breed)
      setAboutme(response.data.aboutme)
      setImageUrl(response.data.imageUrl) // imagen 
    } catch (error) {
      navigate("/error")
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault()

    const dogObj = {
      namedog: nameDog,
      dateofBirth: dateofBirth,
      breed: breed,
      aboutme: aboutme,
      image: imageUrl // imagen
    }

    try {
      await updateDogService(dogId, dogObj)
      navigate("/dog")
    } catch (error) {
      navigate("/error")
    }

  }

  


  return (
    <div>
      <h1>editar perritos</h1>

      <form>
            <label htmlFor="nameDog">Nombre:</label>
            <input type="text" name="nameDog" value={nameDog} onChange={handleNameDogChange}  />
            <br />
            <label htmlFor="dateofBirth">Fecha de nacimiento:</label>
            <input type="date" name="dateofBirth" value={dateofBirth} onChange={handleDateofBirthChange}/>
            <br />
            <label htmlFor="breed">Raza:</label>
            <input type="text" name="breed" value={breed} onChange={handleBreedChange}/>
            <br />
            <label htmlFor="aboutme">Sobre mi:</label>
            <input type="text" name="aboutme" value={aboutme} onChange={handleAboutmeChange}/>
            <br />
            {/* PREGUNTAR POR LA IMAGEN  */}
            <input type="file" value={imageUrl} onChange={handleImagechange} />
            <img src={imageUrl} alt="image" width={80} />
            <br />
            <button onClick={handleEdit}>Editar</button>

        </form>
    </div>
  );
}

export default DogEdit;
