import React, { useState } from "react";
import Search from "./search/Search";
import CurrentWeather from "./current-weather/current-weather";
import Forecast from "./forecast/forecast";
import { Box, Button } from "@mui/material";

function WeatherPreview() {
  // Zustände für aktuelles Wetter, Wettervorhersage und Verwendung des aktuellen Standorts
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  // Funktion zum Verwenden des aktuellen Standorts
  const handleUseCurrentLocation = () => {
    setUseCurrentLocation(true);
    getCurrentLocation();
  };

  // Funktion zum Abrufen der aktuellen Geolocation
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      // Verwendung der eingebauten Methode um ein Objekt zum aktuellen Standort zu erhalten
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Ermittlung von latitude und longitude für die Weiterabgabe an den API-Fetch des Wetters
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Fehler beim Abrufen der Geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation wird von diesem Browser nicht unterstützt.");
    }
  };

  // Funktion zum Abrufen der Wetterdaten für gegebene Breiten- und Längengrade
  const fetchWeatherData = (lat, lon) => {
    const currentWeatherFetch = fetch(
      // Aufruf des Servers, dieser führt dann gesichteren fetch Serverseitig aus mit übergebenen Daten
      // fetch des aktuellen Wetters
      `http://localhost:5000/weather?lat=${lat}&lon=${lon}`
    );
    const forecastFetch = fetch(
      // Aufruf des Servers, dieser führt dann gesichteren fetch Serverseitig aus mit übergebenen Daten
      // fetch des vorhergesagten Wetters
      `http://localhost:5000/forecast?lat=${lat}&lon=${lon}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        // Promise.all() wird verwendet, um die Ergebnisse beider Fetch-Anfragen zu kombinieren

        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        // Die beiden Fetch-Anfragen haben erfolgreich geantwortet und die JSON-Daten wurden extrahiert

        setCurrentWeather({
          // Aktuelle Wetterdaten werden aktualisiert
          city: weatherResponse.name,
          ...weatherResponse,
          coord: { lat, lon },
        });

        setForecast({ city: weatherResponse.name, forecastResponse });
        // Die Wettervorhersagedaten werden aktualisiert
      })
      .catch((err) => console.error(err));
    // Ein Fehler trat während der Fetch-Anfragen oder der Verarbeitung der JSON-Daten auf
  };

  // Funktion zum Handhaben der Änderung der Suchanfrage
  // wird an Search-Komponente übergeben, dort werden dann in searchData die durch GeoDB ermittelten lon und lat übergeben
  // damit kann api-call ausgeührt werden, s.o.
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setUseCurrentLocation(false);
    fetchWeatherData(lat, lon);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Wetter Daten Anzeige</h1>
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUseCurrentLocation}
        >
          Nutze aktuellen Standort
        </Button>
      </Box>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default WeatherPreview;
