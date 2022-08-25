import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDogService } from "../../services/dog.services";
import { uploadService } from "../../services/upload.services";

function AddFormDog() {
  const navigate = useNavigate();

  // ESTADOS CONTROLADOS => controlan los campos
  const [nameDog, setNameDog] = useState(null);
  const [dateofBirth, setDateofBirth] = useState(null);
  const [breed, setBreed] = useState(null);
  const [aboutme, setAboutme] = useState(null);

  //ESTDO PARA GUARDAR EL URL QUE VENDRA DE CLOUDINAYÇ
  const [imageUrl, setImageUrl] = useState("");

  //FUNCIONES QUE ACTUALIZAN LOS ESTADOS
  const handleNameDog = (event) => {
    setNameDog(event.target.value);
  };

  const handleDateofBirth = (event) => {
    setDateofBirth(event.target.value);
  };

  const handleBreed = (event) => {
    setBreed(event.target.value);
  };

  const handleAboutme = (event) => {
    setAboutme(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const newDog = {
      namedog: nameDog,
      dateofBirth: dateofBirth,
      breed: breed,
      aboutme: aboutme,
      image: imageUrl,
    };

    console.log(newDog);

    try {
      await addDogService(newDog);
      navigate("/dog");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  // IMAGEN
  const handleImgUpload = async (event) => {
    console.log(event.target.files[0]);
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
          <div className="title">Crea un perrito</div>
          <div className="input-container">
            <label htmlFor="nameDog">Nombre</label>
            <input
              className="input"
              type="text"
              name="nameDog"
              onChange={handleNameDog}
              value={nameDog}
            />
          </div>
          <div className="input-container">
            <label htmlFor="dateofBirth">Fecha de nacimiento</label>
            <input
              className="input"
              type="date"
              name="dateofBirth"
              onChange={handleDateofBirth}
              value={dateofBirth}
            />
          </div>
          <div className="input-container">
            <label htmlFor="breed">Raza</label>
            <input
              className="input"
              type="text"
              name="breed"
              onChange={handleBreed}
              value={breed}
            />
          </div>
          <div className="input-container">
            <label htmlFor="aboutme">Sobre mi</label>
            <textarea
              className="input"
              type="text"
              name="aboutme"
              onChange={handleAboutme}
              value={aboutme}
            ></textarea>
          </div>
          <div className="input-container">
            <label >Imagen</label>
            <input type="file" onChange={handleImgUpload} />
            
          </div>
          <img className="image-selector" src={imageUrl} alt="image" width={80} />

          <div>
            <button className="submit" onClick={handleSignup}>
              Crear
            </button>
          </div>
        </form>

    </div>
  );
}

export default AddFormDog;
