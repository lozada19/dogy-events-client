import React from "react";
import image1 from "../images/1-perrito-muy-feliz-con-una-pelota.jpeg";
import image2 from "../images/10_caracteristicas_de_los_perros_24265_600_square.jpeg";
import image3 from "../images/6135526505f8e.jpeg";
import image4 from "../images/caminata.jpeg";
import image5 from "../images/En-Madrid-podremos-enterrar-a-nuestras-mascotas.jpeg";
import image6 from "../images/husky-siberiano-redes.jpeg";
import image7 from "../images/pngegg.png"

function Home() {
  return (
    <div className="inicio">
  
  <img className="image7" src={image7} alt="image" />
      <img className="image1" src={image1} alt="image" />
      <img className="image2" src={image2} alt="image" />
      <img className="image3" src={image3} alt="image" />
      <img className="image4" src={image4} alt="image" />
      <img className="image5" src={image5} alt="image" />
      <img className="image6" src={image6} alt="image" />
     


      <div className="information">
        <h1 className="title-home">Bienvenidos a Dogy Events</h1>
        <div>
          <a href="https://dogy-events.netlify.app/signup"><button className="button-home">Registrate</button></a>
        </div>

        
      </div>

    </div>
  );
}

export default Home;
