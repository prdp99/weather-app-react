import React, { useEffect, useState } from "react";
import PartlyCloud from "../icons/partly-cloudy-2.png";
import ligthRain from "../icons/light-rain.png";
import patchyRain from "../icons/patchy-rain.png";
import locationIcon from "../icons/location.svg";
import sunny from "../icons/sunny.png";
import mist from "../icons/mist.png";
import cloudy from "../icons/cloudy.png";
import fog from "../icons/fog.png";
import moderateRain from "../icons/moderate-rain.png";
import clear from "../icons/clear.png";
import snow from "../icons/patchy-snow.png";
import searchIcon from "../icons/search.png";
import modRainHeavyThunder from "../icons/mod-rain-heavy-thunder.png";

export default function Card(props) {
  const [search, setSearch] = useState({
    place: "",
  });
  let arr = props.visibility.split("");
  let sorted = [];
  let image = "";
  function getImage() {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === " ") {
        arr[i] = "-";
      }
      sorted.push(arr[i].toLowerCase());
    }

    if (props.visibility === "Light rain" || "Light rain shower") {
      image = ligthRain;
    }
    if (props.visibility === "Patchy rain") {
      image = patchyRain;
    }

    if (props.visibility === "Mist") {
      image = mist;
    }
    if (props.visibility === "Snow") {
      image = snow;
    }
    if (props.visibility === "Clear") {
      image = clear;
    }
    if (props.visibility === "Moderate rain") {
      image = moderateRain;
    }
    if (props.visibility === "Moderate or heavy rain with thunder") {
      image = modRainHeavyThunder;
    }
    if (props.visibility === "Fog") {
      image = fog;
    }
    if (props.visibility === "Cloudy") {
      image = cloudy;
    }
    if (props.visibility === "Partly cloudy") {
      image = PartlyCloud;
    }
    if (props.visibility === "Sunny") {
      image = sunny;
    }
  }
  getImage();

  function handleChange(event) {
    const { name, type, value } = event.target;

    setSearch({
      [name]: value,
    });
  }

  function getData() {
    props.changeWord(search);
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13) props.changeWord(search);
  }
  const [suggestion, setSuggestion] = useState({});

  return (
    <div className="card">
      <div className="card-container">
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            name="place"
            value={search.place}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            id="search"
          />
          <button onClick={getData}>
            {/* <span className="material-symbols-outlined" id="search-icon">
              search
            </span> */}
            <img src={searchIcon} className="search-icon" />
            {/* <img src={searchIcon} className="search-icon search-icon-glow" /> */}
          </button>
        </div>

        <header className="header">
          <div className="location">
            <span className="material-symbols-outlined">location_on</span>
            <p className="location-name">{props.location}</p>
          </div>
          <img src={image} className="icons" />
          <p className="fade">{props.visibility}</p>
          <h2 className="temp">{props.temp}°C</h2>
          <h2 className="date">
            {props.day}, {props.date} {props.month}
          </h2>
        </header>
        <footer>
          <div className="temp-container">
            <div className="temp-detail wind">
              <p>{props.wind} km/h</p>
              <p className="fade">Wind</p>
            </div>
            <div className="temp-detail humidity">
              <p>{props.humidity} %</p>
              <p className="fade">Humidity</p>
            </div>
            <div className="temp-detail rain">
              <p>{props.uv}</p>
              <p className="fade">UV - index</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
