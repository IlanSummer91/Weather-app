const axios = require("axios");

const instance = axios.create({
  baseURL: "http://dataservice.accuweather.com/",
});

export const fetchCity = async (searchValue) => {
  const response = await instance.get(
    `/locations/v1/cities/autocomplete?apikey=nSN5UOxp2j18D36GgKyABJAn7iZUdS7g&q=${searchValue}`
  );
  return response.data;
};

export const fetchCurrentWeatherByCity = async (cityID) => {
  const response = await instance.get(
    `/currentconditions/v1/${cityID}?apikey=nSN5UOxp2j18D36GgKyABJAn7iZUdS7g`
  );
  return response.data;
};

export const fetchFiveDayfDailyForecasts = async (cityID) => {
  const response = await instance.get(
    `/forecasts/v1/daily/5day/${cityID}?apikey=nSN5UOxp2j18D36GgKyABJAn7iZUdS7g&metric=true`
  );
  return response.data;
};
