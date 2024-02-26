import "./current-weather.css";
import d1 from "../../../assets/weather-icons/01d.png";
import n1 from "../../../assets/weather-icons/01n.png";
import d2 from "../../../assets/weather-icons/02d.png";
import n2 from "../../../assets/weather-icons/02n.png";
import d3 from "../../../assets/weather-icons/03d.png";
import n3 from "../../../assets/weather-icons/03n.png";
import d4 from "../../../assets/weather-icons/04d.png";
import n4 from "../../../assets/weather-icons/04n.png";
import d9 from "../../../assets/weather-icons/09d.png";
import n9 from "../../../assets/weather-icons/09n.png";
import d10 from "../../../assets/weather-icons/10d.png";
import n10 from "../../../assets/weather-icons/10n.png";
import d11 from "../../../assets/weather-icons/11d.png";
import n11 from "../../../assets/weather-icons/11n.png";
import d13 from "../../../assets/weather-icons/13d.png";
import n13 from "../../../assets/weather-icons/13n.png";
import d50 from "../../../assets/weather-icons/50d.png";
import n50 from "../../../assets/weather-icons/50n.png";

// Wetter-Symbole mit entsprechenden Bildpfaden
const weatherIcons = {
  "01n": n1,
  "02n": n2,
  "03n": n3,
  "04n": n4,
  "09n": n9,
  "10n": n10,
  "11n": n11,
  "13n": n13,
  "50n": n50,
  "01d": d1,
  "02d": d2,
  "03d": d3,
  "04d": d4,
  "09d": d9,
  "10d": d10,
  "11d": d11,
  "13d": d13,
  "50d": d50,
};

// Wetter-Beschreibungen in Deutsch
const WEATHER_DESCRIPTIONS = {
  "clear sky": "klarer Himmel",
  "few clouds": "einige Wolken",
  "scattered clouds": "verstreute Wolken",
  "broken clouds": "aufgelockerte Bewölkung",
  "overcast clouds": "bedeckter Himmel",
  mist: "Nebel",
  smoke: "Rauch",
  haze: "leichter Dunst",
  "sand/ dust whirls": "Sand-/Staubwirbel",
  fog: "Nebel",
  sand: "Sand",
  dust: "Staub",
  "volcanic ash": "Vulkanasche",
  squalls: "Windböen",
  tornado: "Tornado",
  "light rain": "leichter Regen",
  "moderate rain": "mäßiger Regen",
  "heavy intensity rain": "starker Regen",
  "very heavy rain": "sehr starker Regen",
  "extreme rain": "extremer Regen",
  "freezing rain": "Gefrierender Regen",
  "light intensity shower rain": "leichter Schauerregen",
  "shower rain": "Schauerregen",
  "heavy intensity shower rain": "starker Schauerregen",
  "ragged shower rain": "unregelmäßiger Schauerregen",
  "light snow": "leichter Schneefall",
  snow: "Schnee",
  "heavy snow": "starker Schneefall",
  sleet: "Schneeregen",
  "shower sleet": "Schneeregen",
  "light rain and snow": "leichter Regen und Schnee",
  "rain and snow": "Regen und Schnee",
  "light shower snow": "leichter Schneeschauer",
  "shower snow": "Schneeschauer",
  "heavy shower snow": "starker Schneeschauer",
  "thunderstorm with light rain": "Gewitter mit leichtem Regen",
  "thunderstorm with rain": "Gewitter mit Regen",
  "thunderstorm with heavy rain": "Gewitter mit starkem Regen",
  "light thunderstorm": "leichtes Gewitter",
  thunderstorm: "Gewitter",
  "heavy thunderstorm": "starkes Gewitter",
  "ragged thunderstorm": "unregelmäßiges Gewitter",
  "thunderstorm with light drizzle": "Gewitter mit leichtem Nieselregen",
  "thunderstorm with drizzle": "Gewitter mit Nieselregen",
  "thunderstorm with heavy drizzle": "Gewitter mit starkem Nieselregen",
};

// prop: data enthält Objekt aus dem API-Call in WeatherPreview an openweathermap
const CurrentWeather = ({ data }) => {
  const currentWeatherIcon = weatherIcons[data.weather[0].icon];

  return (
    <div className="weather">
      <div className="top">
        <div>
          {/* Anzeige des Stadtnamens */}
          <p className="city">{data.city}</p>
          {/* Anzeige der Wetterbeschreibung */}
          <p className="weather-description">
            {/* Übersetzung der Wetterbeschreibung oder Verwendung der Originalbeschreibung */}
            {WEATHER_DESCRIPTIONS[data.weather[0].description] ||
              data.weather[0].description}
          </p>
        </div>
        {/* Anzeige des aktuellen Wetter-Symbols */}
        <img alt="weather" className="weather-icon" src={currentWeatherIcon} />
      </div>
      <div className="bottom">
        {/* Anzeige der gefühlten Temperatur */}
        <p className="temperature">{Math.round(data.main.feels_like)}°C</p>
        <div className="details">
          {/* Weitere Details hier */}
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Gefühlt</span>
            <span className="parameter-value">
              {Math.round(data.main.temp)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Windstärke</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feuchigkeit</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Druck</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
