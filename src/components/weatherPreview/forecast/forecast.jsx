import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

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

const WEEK_DAYS = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

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

// prop: data enthält Objekt aus dem API-Call in WeatherPreview an openweathermap (Array mit 40 x 3h = 120h , also 5 Tage)
const Forecast = ({ data }) => {
  // Bestimmen des heutigen Wochentags
  const today = new Date().getDay();
  console.log(today);

  // Erstellen einer neuen Array mit den Wochentagen basierend auf dem heutigen Tag
  const forecastDays = WEEK_DAYS.slice(today, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, today)
  );

  // Aufteilen der Vorhersagegruppen in 5 Gruppen (für 5 Tage)
  const forecastGroups = [];
  for (let i = 0; i < 5; i++) {
    forecastGroups.push(data.forecastResponse.list.slice(i * 8, (i + 1) * 8));
  }

  // Render-Methode der Komponente
  return (
    <>
      <label className="title">Vorschau für 5 Tage</label>
      <Accordion allowZeroExpanded>
        {forecastGroups.map((group, idx) => {
          let maxTemp = -Infinity;
          let minTemp = Infinity;
          let totalTemp = 0;
          let totalHumidity = 0;
          let totalWindSpeed = 0;

          // Durchlaufen der einzelnen Vorhersage-Elemente in der Gruppe
          group.forEach((item) => {
            if (item.main.temp_max > maxTemp) maxTemp = item.main.temp_max;
            if (item.main.temp_min < minTemp) minTemp = item.main.temp_min;
            totalTemp += item.main.temp;
            totalHumidity += item.main.humidity;
            totalWindSpeed += item.wind.speed;
          });

          // Berechnen der durchschnittlichen Temperatur, Luftfeuchtigkeit und Windgeschwindigkeit
          const avgTemp = totalTemp / group.length;
          const avgHumidity = totalHumidity / group.length;
          const avgWindSpeed = totalWindSpeed / group.length;

          // Rendern eines Accordion-Items für jeden Tag
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      src={weatherIcons[group[0].weather[0].icon]}
                      className="icon-small"
                      alt="weather"
                    />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">
                      {WEATHER_DESCRIPTIONS[group[0].weather[0].description] ||
                        group[0].weather[0].description}
                    </label>
                    <label className="min-max">
                      {Math.round(maxTemp)}°C / {Math.round(minTemp)}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Tagesdurchschnittstemperatur:</label>
                    <label>{Math.round(avgTemp)}°C</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Luftfeuchtigkeit:</label>
                    <label>{Math.round(avgHumidity)}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Windgeschwindigkeit:</label>
                    <label>{Math.round(avgWindSpeed * 100) / 100} m/s</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
