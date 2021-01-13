import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  const [clickedLink, setClickedLink] = useState("Home");

  return (
    <div className="container-fluid">
      <nav
        className="row d-flex justify-content-end bg-secondary"
        style={{ height: "5vh" }}
      >
        <Link
          onClick={() => setClickedLink("Home")}
          to="/"
          className={
            (clickedLink === "Home" ? "selected " : "") +
            "link d-flex col-2 col-sm-1 justify-content-center align-items-center"
          }
        >
          Home
        </Link>
        <Link
          onClick={() => setClickedLink("Favorites")}
          to="/favorites"
          className={
            (clickedLink === "Favorites" ? "selected " : "") +
            "link d-flex col-2 col-lg-1 p-0 justify-content-center align-items-center"
          }
        >
          Favorites
        </Link>
      </nav>
    </div>
  );
}

export default Header;
