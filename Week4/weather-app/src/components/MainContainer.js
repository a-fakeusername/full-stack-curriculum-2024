import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css"; // Import the CSS file for MainContainer

function MainContainer(props) {

  function formatDate(daysFromNow = 0) {
    let output = "";
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }

  /*
  STEP 1: IMPORTANT NOTICE!

  Before you start, ensure that both App.js and SideContainer.js are complete. The reason is MainContainer 
  is dependent on the city selected in SideContainer and managed in App.js. You need the data to flow from 
  App.js to MainContainer for the selected city before making an API call to fetch weather data.
  */
  
  /*
  STEP 2: Manage Weather Data with State.
  
  Just like how we managed city data in App.js, we need a mechanism to manage the weather data 
  for the selected city in this component. Use the 'useState' hook to create a state variable 
  (e.g., 'weather') and its corresponding setter function (e.g., 'setWeather'). The initial state can be 
  null or an empty object.
  */
  
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  
  /*
  STEP 3: Fetch Weather Data When City Changes.
  
  Whenever the selected city (passed as a prop) changes, you should make an API call to fetch the 
  new weather data. For this, use the 'useEffect' hook.

  The 'useEffect' hook lets you perform side effects (like fetching data) in functional components. 
  Set the dependency array of the 'useEffect' to watch for changes in the city prop. When it changes, 
  make the API call.

  After fetching the data, use the 'setWeather' function from the 'useState' hook to set the weather data 
  in your state.
  */
  
  useEffect(() => {
    if (props.selectedCity) {
      let historyAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&appid=${props.apiKey}&units=imperial`;
			let currentAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&appid=${props.apiKey}&units=imperial`;
			let aqiAPI = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&appid=${props.apiKey}`;

			fetch(currentAPI)
				.then((response) => response.json())
				.then((data) => {
					setWeather({
						currentTemp: data.main.temp,
						weather: data.weather[0].description,
						icon: data.weather[0].icon
					});
				})
				.then(() => fetch(historyAPI))
				.then((response) => response.json())
				.then((data) => {
					setForecast(data.list);
				})
				.then(() => fetch(aqiAPI))
				.then((response) => response.json())
				.then((data) => {
					setAqi(data.list[0].main.aqi);
				});
    }
  }, [props.selectedCity]);
  
  return (
    <div id="main-container">
      <div id="weather-container">
        {/* 
        STEP 4: Display Weather Data.
        
        With the fetched weather data stored in state, use conditional rendering (perhaps the ternary operator) 
        to display it here. Make sure to check if the 'weather' state has data before trying to access its 
        properties to avoid runtime errors. 

        Break down the data object and figure out what you want to display (e.g., temperature, weather description).
        This is a good section to play around with React components! Create your own - a good example could be a WeatherCard
        component that takes in props, and displays data for each day of the week.
        */
        (weather && (
          <>
            <h2 id='date'>{formatDate()}</h2>
            <h1 id='cityName'>Weather for {props.selectedCity.fullName}</h1>
            <br />
            <br />
            <div id="weather-info">
              <span>
                <h2 id="weather">{weather.weather}</h2>
                <h1 id="current-temp">{Math.round(weather.currentTemp)}°F</h1>
                <h2 id="aqi">AQI: {aqi}</h2>
              </span>
              <img id='weather-icon' src={`./icons/${weather.icon}.svg`} alt={weather.weather} />
            </div>
            <br />
            <br />
            <ul id="forecast">
              {forecast && forecast.map((day, index) => (
                index % 8 === 7 &&
                <li key={index} className="forecast-item">
                  <h3>{formatDate(index)}</h3>
                  <img src={`./icons/${day.weather[0].icon}.svg`} alt={day.weather[0].description} />
                  <h4>{Math.round(day.main.temp)}°F</h4>
                </li>
              ))}
            </ul>
          </>
        ))
        }
      </div>
    </div>
  );
}


export default MainContainer;

