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
  const context = useContext(AppContext);
  const arrayTest = [
    {
      Date: "2021-01-13T07:00:00+02:00",
      Temperature: { Maximum: { Value: 38 } },
      EpochDate: 1610514000,
    },
    {
      Date: "2021-01-14T07:00:00+02:00",
      Temperature: { Maximum: { Value: 38 } },
      EpochDate: 1610600400,
    },
    {
      Date: "2021-01-15T07:00:00+02:00",
      Temperature: { Maximum: { Value: 38 } },
      EpochDate: 1610686800,
    },
    {
      Date: "2021-01-16T07:00:00+02:00",
      Temperature: { Maximum: { Value: 38 } },
      EpochDate: 1610773200,
    },
    {
      Date: "2021-01-17T07:00:00+02:00",
      Temperature: { Maximum: { Value: 38 } },
      EpochDate: 1610859600,
    },
  ];

  const searchHandler = async () => {
    const searchValue = searchRef.current.value;
    // const result = await fetchCity(searchValue || "tel aviv");

    const result = [
      {
        Key: 213,
        LocalizedName: "Tel Aviv",
      },
      {
        Key: 214,
        LocalizedName: "Haifa",
      },
    ];

    const currentWeather = [
      {
        WeatherText: "Partly cloudy with a thunderstorm",
        Temperature: { Metric: { Value: 24.0 } },
      },
    ];

    setDailyForecastArray(arrayTest);

    // const result = [];
    // const currentWeather = [];

    const foundCity = result.find(
      (cityObj) =>
        cityObj.LocalizedName.toLowerCase() === searchValue.toLowerCase() ||
        "tel aviv"
    );
    if (result.length <= 0) {
      alert("City doesn't exist! please make sure to only use English letters");
    } else if (foundCity !== undefined) {
      // const currentWeather = await fetchCurrentWeatherByCity(foundCity.Key);
      // setDailyForecastArray(
      //   (await fetchFiveDayfDailyForecasts(foundCity.Key)).DailyForecasts
      // );
      if (currentWeather.length <= 0) {
        alert("Something is wrong, please contact our support team");
      } else {
        console.log("got here")
        setCity({
          key: foundCity.Key,
          name: foundCity.LocalizedName,
          weatherText: currentWeather[0].WeatherText,
          metricValue: Math.round(currentWeather[0].Temperature.Metric.Value),
        });
        console.log(city);
        context.setCurrentCity(city);
      }
    }
    searchRef.current.value = "";
  };

  useEffect(() => {
    searchHandler();
  }, []);

  return (
    <div
      className="container-fluid home bg-dark"
      style={{ height: "95vh", backgroundColor: "" }}
    >
      <div className="row">
        <div className="d-flex justify-content-center m-4">
          <input
            className="col-4"
            ref={searchRef}
            onKeyUp={(e) => e.code === "Enter" && searchHandler()}
            type="search"
            placeholder="&#xf002; Search"
          />
        </div>
      </div>
      <div className="row search-container m-5" style={{ height: "10vh" }}>
        <div className="col d-flex justify-content-between">
          <div>
            <h3>{city.name}</h3>
            <span>{city.metricValue + "°C"}</span>
          </div>
          <button className="d-flex align-items-center h-25 btn btn-outline-light">
            Add to Favorites
          </button>
        </div>
      </div>
      <div className="row h-25">
        <div className="col d-flex justify-content-center display-1">
          {city.weatherText}
        </div>
      </div>
      <div
        className="row d-flex justify-content-around"
        style={{ height: "20vh" }}
      >
        {dailyForecastArray.map((todaysWeather) => (
          <div
            key={todaysWeather.EpochDate}
            className="col-5 col-md-1 border d-flex justify-content-around align-items-center flex-column"
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
  );
}

export default Home;
