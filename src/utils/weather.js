import axios from "axios";
const api = {
  key: process.env.REACT_APP_WEATHER_API,
  base: "https://api.openweathermap.org/data/2.5/",
};

export const getWeather = async (lat, lon) => {
  if (lat !== "" && lon !== "") {
    const res = await axios.get(
      `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`
    );
    return await res.data;
  }
};

export const getWeatherIcon = (icon = "") => {
  if (icon !== "") {
    const URL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return URL;
  }
};
