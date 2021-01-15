import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import "./Header.scss";

function Header() {
  const location = useLocation();
  const context = useContext(AppContext);

  return (
    <div className="container-fluid header">
      <nav
        className="row d-flex justify-content-start justify-content-sm-center justify-content-md-end bg-secondary"
        style={{ height: "5vh" }}
      >
        <Link
          onClick={() => context.setClickedFavoriteLocation("tel aviv")}
          to="/"
          className={
            (location.pathname === "/" ? "selected " : "") +
            "link d-flex col-6 col-sm-4 col-md-3 col-xl-2 justify-content-center align-items-center"
          }
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className={
            (location.pathname === "/favorites" ? "selected " : "") +
            "link d-flex col-6 col-sm-4 col-md-3 col-xl-2 p-0 justify-content-center align-items-center"
          }
        >
          Favorites
        </Link>
      </nav>
    </div>
  );
}

export default Header;
