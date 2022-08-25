import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getMyDogServise } from "../services/dog.services";

function MydDog() {
  const navigate = useNavigate();

  const [myDog, setMyDog] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getMyDog();
  }, []);

  const getMyDog = async () => {
    try {
      const response = await getMyDogServise();
      console.log("RESPONSEMYDOG", response.data);
      setMyDog(response.data);
      setIsFetching(false);
      // navigate("/profile") no se redireccion
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>... is Loading</h3>;
  }

  return (
    <div>
     <h1 className="list">Mis perritos</h1>
      {myDog.map((eachMyDog) => {
        return (
          <li key={eachMyDog._id}>
            <div className="list">
              <div className="list-dog">
                <img className="image-dog" src={eachMyDog.image} alt="image" />
                <Link  className="list-name-dog" to={`/dog/${eachMyDog._id}/details`}>
                  {eachMyDog.namedog}
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default MydDog;
