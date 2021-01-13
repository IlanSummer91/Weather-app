import React, { useContext } from "react";
import { AppContext } from "../AppContext";

function Favorite() {
  const context = useContext(AppContext);
  return (
    <div
      className="col-2 d-flex justify-content-center"
      style={{ backgroundColor: "skyblue", height: "10vh" }}
    >
      this is a favorite template
      {context.currentCity.name}
    </div>
  );
}

export default Favorite;
