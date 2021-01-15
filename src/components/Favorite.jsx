import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { NavLink } from "react-router-dom";
import "./Favorite.scss";

function Favorite(props) {
  // name, key, weatherText, metricValue
  const context = useContext(AppContext);

  return (
    <NavLink
      onClick={() => {
        context.setClickedFavoriteLocation(props.city.name);
      }}
      to="/"
      className="favorite-link col-5 col-lg-3 col-xl-2 d-flex justify-content-evenly flex-column text-center"
      style={{ height: "25vh" }}
    >
        <div>
          <div>{props.city.name}</div>
          <div>{props.city.metricValue + "°C"}</div>
        </div>
        <div>{props.city.weatherText}</div> 
    </NavLink>
  );
}

export default Favorite;
