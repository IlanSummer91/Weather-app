import React from "react";
import Favorite from "./Favorite";

function FavoritesList() {
  return (
    <div className="row d-flex justify-content-between">
      <Favorite />
      <Favorite />
      <Favorite />
      <Favorite />
      <Favorite />
    </div>
  );
}

export default FavoritesList;
