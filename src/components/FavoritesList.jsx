import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import Favorite from "./Favorite";

function FavoritesList() {
  const context = useContext(AppContext);

  return (
    <div className="container bg-dark" style={{height: "95vh"}}>
      <div className="row d-flex justify-content-center justify-content-xl-start">
        {context.favoritesArray.map((city) => (
          <Favorite city={city} key={city.id} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;
