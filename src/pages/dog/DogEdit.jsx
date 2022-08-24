import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//servicios
import { uploadService } from "../../services/upload.services";
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

  //ESTDO PARA GUARDAR EL URL QUE VENDRA DE CLOUDINAYÇ
  const [imageUrl, setImageUrl] = useState(""); // imagen

  //FUNCIONES QUE ACTUALIZAN LOS ESTADOS
  const handleNameDogChange = (event) => {
    setNameDog(event.target.value);
  };

  console.log("DATEOFBIRTH", dateofBirth);

  const handleDateofBirthChange = (event) => {
    console.log("EVENT TARGET", event.target.value);
    setDateofBirth(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleAboutmeChange = (event) => {
    setAboutme(event.target.value);
  };

  useEffect(() => {
    getDetailsDog();
  }, []);

  const getDetailsDog = async () => {
    try {
      const response = await getDogDetailsService(dogId);
      setNameDog(response.data.namedog);
      setDateofBirth(response.data.dateofBirth);
      setBreed(response.data.breed);
      setAboutme(response.data.aboutme);
      setImageUrl(response.data.image);
      console.log("HANLE", response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleEdit = async (event) => {
    console.log("HANLE", handleEdit);
    event.preventDefault();

    const dogObj = {
      namedog: nameDog,
      dateofBirth: dateofBirth,
      breed: breed,
      aboutme: aboutme,
      image: imageUrl, // imagen
    };

    try {
      await updateDogService(dogId, dogObj);
      navigate("/dog");
    } catch (error) {
      navigate("/error");
    }
  };
  // IMAGEN
  const handleImgUpload = async (event) => {
    console.log("TARGET IMAGEN", event.target.files[0]);
    const form = new FormData();
    form.append("image", event.target.files[0]);
    try {
      const response = await uploadService(form);
      console.log("RESPONSE IMG URL", response.data.imageUrl);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="container">
    
        <form>
          <div className="title">Editar perritos</div>
          <div className="input-container">
            <label htmlFor="nameDog">Nombre</label>
            <input
             className="input"
              type="text"
              name="nameDog"
              value={nameDog}
              onChange={handleNameDogChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="dateofBirth">Fecha de nacimiento:</label>
            <input
             className="input"
              type="date"
              name="dateofBirth"
              value={dateofBirth}
              onChange={handleDateofBirthChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="breed">Raza:</label>
            <input
             className="input"
              type="text"
              name="breed"
              value={breed}
              onChange={handleBreedChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="aboutme">Sobre mi:</label>
            <textarea
             className="input"
              type="text"
              name="aboutme"
              value={aboutme}
              onChange={handleAboutmeChange}
            ></textarea>
          </div>
          <div className="input-container">
            <input type="file" onChange={handleImgUpload} />
          </div>
          <img src={imageUrl} alt="image" width={200}  />

      
          <button className="submit" onClick={handleEdit}>Editar</button>
       
        </form>
      </div>

  );
}

export default DogEdit;
