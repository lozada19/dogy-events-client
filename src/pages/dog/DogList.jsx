import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getDogService } from "../../services/dog.services";

function DogList() {
  const navigate = useNavigate();

  //
  const [allDog, setAllDog] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getDog();
  }, []);

  const getDog = async () => {
    try {
      const response = await getDogService();
      setAllDog(response.data);
      setIsFetching(false);
      navigate("/dog");
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3 className="isLoading">... is Loading</h3>;
  }



  return (
    <div className="list-container">
      <h1 className="title">Lista de perritos</h1>

      <div className="list">
        {allDog.map((eachDog) => {
          return (
            <li key={eachDog._id}>
          
                <div className="list-dog">
                  <img className="image-dog" src={eachDog.image} alt="image" />
                  <Link
                    className="list-name-dog"
                    to={`/dog/${eachDog._id}/details`}
                  >
                    {eachDog.namedog}
                  </Link>
                </div>
             
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default DogList;
