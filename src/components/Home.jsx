import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.scss";
import "../Axios";
import {
  fetchCity,
  fetchCurrentWeatherByCity,
  fetchFiveDayfDailyForecasts,
} from "../Axios";
import { AppContext } from "../AppContext";

function Home() {
  const searchRef = useRef(null);
  const [city, setCity] = useState({});
  const [dailyForecastArray, setDailyForecastArray] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const context = useContext(AppContext);

  const searchHandler = async (
    location = context.clickedFavoriteLocation || "tel aviv"
  ) => {
    const searchValue = searchRef.current.value || location;
    const result = await fetchCity(searchValue || "tel aviv");

    const foundCity = result.find(
      (cityObj) =>
        cityObj.LocalizedName.toLowerCase() === searchValue.toLowerCase()
    );
    if (result.length <= 0) {
      alert("City doesn't exist! please make sure to only use English letters");
    } else if (foundCity !== undefined) {
      const currentWeather = await fetchCurrentWeatherByCity(foundCity.Key);
      setDailyForecastArray(
        (await fetchFiveDayfDailyForecasts(foundCity.Key)).DailyForecasts
      );
      if (currentWeather.length <= 0) {
        alert("Something is wrong, please contact our support team");
      } else {
        setCity({
          id: foundCity.Key,
          name: foundCity.LocalizedName,
          weatherText: currentWeather[0].WeatherText,
          metricValue: Math.round(currentWeather[0].Temperature.Metric.Value),
        });
        const existsInFavoriteArray = context.favoritesArray.find(
          (element) => element.name === foundCity.LocalizedName
        );
        existsInFavoriteArray === undefined
          ? setIsFavorited(false)
          : setIsFavorited(true);
      }
    }
    searchRef.current.value = "";
  };

  const addToFavoritesHandler = () => {
    const isFavoriteAlreadyAdded = context.favoritesArray.find(
      (element) => element.name === city.name
    );
    if (isFavoriteAlreadyAdded === undefined) {
      context.setFavoritesArray([...context.favoritesArray, city]);
      setIsFavorited(true);
    } else {
      alert("This location has already been added to your favorites!");
    }
  };

  const removeFromFavoritesHandler = () => {
    const newArray = context.favoritesArray.filter(
      (item) => item.name !== city.name
    );
    if (context.favoritesArray.length === newArray.length) {
      alert("This location does not exist in your favorites list!");
    } else {
      context.setFavoritesArray(newArray);
      setIsFavorited(false);
    }
  };

  useEffect(() => {
    searchHandler();
  }, []);

  return (
    <div className="home">
      <div className="row search-row" style={{ height: "15vh" }}>
        <div className="d-flex justify-content-center align-items-center m-4">
          <input
            className="col-4 h-50"
            ref={searchRef}
            onKeyUp={(e) => e.code === "Enter" && searchHandler()}
            type="search"
            placeholder="&#xf002; Search"
          />
          <button
            className="h-50"
            style={{ fontSize: "16px", width: "80px" }}
            onClick={() => searchHandler()}
          >
            Search
          </button>
        </div>
      </div>
      <div className="container bg-dark" style={{ height: "80vh" }}>
        <div
          className="row favorites-row overflow-hidden"
          style={{ height: "26%" }}
        >
          <div className="col m-5 d-flex justify-content-between">
            <div>
              <h3 className="overflow-hidden">{city.name}</h3>
              <span>{city.metricValue + "°C"}</span>
            </div>
            <div>
              <div className="d-flex justify-content-center align-items-center">
                {isFavorited ? (
                  <i
                    className="favorited star fa fa-star p-2"
                    aria-hidden="true"
                    onClick={removeFromFavoritesHandler}
                  ></i>
                ) : (
                  <i
                    className="star fa fa-star p-2"
                    aria-hidden="true"
                    onClick={addToFavoritesHandler}
                  ></i>
                )}
                {isFavorited ? (
                  <button
                    className="d-flex align-items-center justify-content-center btn btn-outline-light favorite-button overflow-hidden"
                    onClick={removeFromFavoritesHandler}
                  >
                    Remove from Favorites
                  </button>
                ) : (
                  <button
                    className="d-flex align-items-center justify-content-center btn btn-outline-light favorite-button overflow-hidden"
                    onClick={addToFavoritesHandler}
                  >
                    Add <br /> to Favorites
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row m-2 h-25 weather-text-row">
          <div className="col d-flex justify-content-center display-1">
            {city.weatherText}
          </div>
        </div>
        <div className="row d-flex justify-content-around five-day-row m-2">
          {dailyForecastArray.map((todaysWeather) => (
            <div
              key={todaysWeather.EpochDate}
              className="col-5 col-md-3 col-xl-2 border d-flex justify-content-evenly align-items-center flex-column m-3"
              style={{ height: "25vh" }}
            >
              <div>
                {new Date(todaysWeather.Date).toLocaleDateString("en-us", {
                  weekday: "long",
                })}
              </div>
              <div>
                {Math.round(todaysWeather.Temperature.Maximum.Value) + "°C"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
