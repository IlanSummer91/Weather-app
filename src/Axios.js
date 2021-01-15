const axios = require("axios");

const instance = axios.create({
  baseURL: "http://dataservice.accuweather.com/",
});
const API_KEY = "nSN5UOxp2j18D36GgKyABJAn7iZUdS7g";

export const fetchCity = async (searchValue) => {
  const response = await instance.get(
    `/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchValue}`
  );
  return response.data;
};

export const fetchCurrentWeatherByCity = async (cityID) => {
  const response = await instance.get(
    `/currentconditions/v1/${cityID}?apikey=${API_KEY}`
  );
  return response.data;
};

export const fetchFiveDayfDailyForecasts = async (cityID) => {
  const response = await instance.get(
    `/forecasts/v1/daily/5day/${cityID}?apikey=${API_KEY}&metric=true`
  );
  return response.data;
};
