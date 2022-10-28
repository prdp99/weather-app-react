import Footer from "./components/Footer";
import Card from "./components/Card";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState({
    place: "Kathmandu",
  });
  const [weather, setWeather] = useState({
    temp_c: "",
    wind_kph: "",
    text: "",
    humidity: "",
    uv: "",
    place: "",
  });
  const [name, setName] = useState([]);
  const today = new Date();
  const td = today.getDay();
  const date = today.getDate();
  const month = today.getMonth();
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function getMonth() {
    return months[month - 1];
  }
  function getToday() {
    for (let i = 0; i < week.length; i++) {
      if (i === td) {
        return week[i];
      }
    }
  }
  const day = getToday();
  const thisMonth = getMonth();
  const key = "1abf50732008491f93983804222107";
  const q = search.place;

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${q}&aqi=no`)
      .then((response) => response.json())
      .then((response) => {
        setWeather({
          text: response.current.condition.text,
          temp_c: response.current.temp_c,
          wind_kph: response.current.wind_kph,
          humidity: response.current.humidity,
          uv: response.current.uv,
          place: response.location.name,
        });
        setName((prev) => [...prev, response.current.condition.text]);
      })
      .catch((err) => console.error(err));
  }, [search]);

  return (
    <>
      <Card
        temp={weather.temp_c}
        wind={weather.wind_kph}
        visibility={weather.text}
        humidity={weather.humidity}
        uv={weather.uv}
        location={weather.place}
        day={day}
        date={date}
        month={thisMonth}
        changeWord={(word) => setSearch(word)}
      />
    </>
  );
}

export default App;
