import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  deleteDogService,
  getDogDetailsService,
} from "../../services/dog.services";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function DogDetails() {
  const navigate = useNavigate();
  const { dogId } = useParams();

  const { user } = useContext(AuthContext);

  const [detailsDog, setDetailsDog] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getDetailsDog();
  }, []);

  const getDetailsDog = async () => {
    try {
      const response = await getDogDetailsService(dogId);
      console.log("RESPONSE DOG", response.data);
      setDetailsDog(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDogService(dogId);
      navigate("/dog");
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3 className="isLoading">... is Loading</h3>;
  }

  console.log("DETALLES DOG", detailsDog);
  return (
    <div className="container-details">
      <div className="cart-details">
        <p className="title">Detalles de los perritos</p>

        <div className="cart-text">
          <img className="image-details" src={detailsDog.image} alt="image" width={200} />
          <div className="cart-text2">
            <p>Nombre: {detailsDog.namedog}</p>
            <p>Fecha de nacimiento:{detailsDog.dateofBirth}</p>
            <p>Raza: {detailsDog.breed}</p>
            <p>Sobre mi: {detailsDog.aboutme}</p>
            <p>Dueño:{detailsDog.owner.username}</p>

            <div className="cart-button">
              {user._id == detailsDog.owner._id ? (
                <button className="button" onClick={handleDelete}>Borrar</button>
              ) : null}
              {user._id == detailsDog.owner._id ? (
                <Link to={`/dog/${dogId}/edit`}>
                  <button className="button" >Editar</button>
                </Link>
              ) : null}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogDetails;
