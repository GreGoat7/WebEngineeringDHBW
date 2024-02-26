// config.js
// enthält die für die API-Calls nötigen Keys und URLs für server.js

module.exports = {
  geoApiOptions: {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d09f595c11msh5981d720585cd8ap176910jsn8581b4eb2959",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  },
  geoApiUrl: "https://wft-geo-db.p.rapidapi.com/v1/geo",
  weatherApiUrl: "https://api.openweathermap.org/data/2.5",
  weatherApiKey: "6ac3c637c82f51685477811e305d2a4f",
};
