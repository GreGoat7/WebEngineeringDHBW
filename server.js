const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const db = require("./src/db/database");
const cors = require("cors");
const fetch = require("node-fetch");
const config = require("./config");

// hier wird der Server mit express aufgesetzt, über den dann die sicheren API-fetches gemacht werden können und mit der Datenbank kommuniziert wird
// die API-KEYS und URLS befinden sich im config.js file

// HINWEIS: Die USER Funktionalitäten können für weitere Funktionen hier auch definiert werden und dann in den Komponenten benutzt werden
//          Das Login, Registration und Session-Cookie Zugriffe sind wie in der Aufgabe verlangt imüplementiert.
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

// Middleware zur Überprüfung des angemeldeten Benutzers
const checkAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    // Der Benutzer ist angemeldet
    next();
  } else {
    // Der Benutzer ist nicht angemeldet
    res.status(401).send({ error: "Nicht authentifizierter Benutzer" });
  }
};

// Middleware zur Überprüfung der Benutzerrolle
const checkAccess = (role) => {
  return (req, res, next) => {
    if (req.session && req.session.user && req.session.role === role) {
      // Der Benutzer hat Zugriff basierend auf seiner Rolle
      next();
    } else {
      // Der Benutzer hat keinen Zugriff basierend auf seiner Rolle
      res.status(403).send({ error: "Unzureichende Zugriffsrechte" });
    }
  };
};

// Städte abrufen mithilfe der geoDB-API
app.get("/cities", async (req, res) => {
  // Prefix wird der Eingabe beim Weather-Popup in der Komponente Search entnommen
  const { namePrefix } = req.query;
  const apiUrl = `${config.geoApiUrl}/cities?namePrefix=${namePrefix}`;

  try {
    const response = await fetch(apiUrl, config.geoApiOptions);
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Städte:", error);
    res.status(500).send({ error: "Interner Serverfehler" });
  }
});

// Aktuelles Wetter abrufen mithilfe der Openweathermap-Api
app.get("/weather", async (req, res) => {
  // lat und lon wird entweder aus automatischem GPS-Erkennung oder der Rückgabe der geo-DB Objekte entnommen
  const { lat, lon } = req.query;
  const apiUrl = `${config.weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${config.weatherApiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    console.error("Fehler beim Abrufen des aktuellen Wetters:", error);
    res.status(500).send({ error: "Interner Serverfehler" });
  }
});

// Wettervorhersage abrufen für die Woche, funktioniert analog wie bei /weather:
// openweathermap bietet kostenlos nur an, die Vorhersage für 40 x 3h = 120h, also 5 Tage: Array aus 40Objekten kommt zurück
app.get("/forecast", async (req, res) => {
  // lat und lon wird entweder aus automatischem GPS-Erkennung oder der Rückgabe der geo-DB Objekte entnommen
  const { lat, lon } = req.query;
  const apiUrl = `${config.weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${config.weatherApiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wettervorhersage:", error);
    res.status(500).send({ error: "Interner Serverfehler" });
  }
});

// Benutzeranmeldung: Kommunikation zur sqlite3-Datenbank -> Überprüfung ob eingegebener User im Login existiert
app.post("/login", (req, res) => {
  const { username, password, role } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      console.error("Fehler beim Abrufen des Benutzers:", err);
      res.status(500).send({ error: "Interner Serverfehler" });
    } else if (!user) {
      res.status(401).send({ error: "Ungültige Anmeldedaten" });
    } else {
      bcrypt.compare(password, user.password, (bcryptErr, result) => {
        if (bcryptErr) {
          console.error("Fehler beim Vergleichen des Passworts:", bcryptErr);
          res.status(500).send({ error: "Interner Serverfehler" });
        } else if (result) {
          // Setzen des Session-Status und der Benutzerrolle
          req.session.user = user.username;
          req.session.role = user.role; // Übergebe die Rolle aus dem Anmeldeformular

          res.status(200).send({ success: "Anmeldung erfolgreich" });
        } else {
          res.status(401).send({ error: "Ungültige Anmeldedaten" });
        }
      });
    }
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Fehler beim Ausloggen:", err);
      res.status(500).send({ error: "Interner Serverfehler" });
    } else {
      res.status(200).send({ success: "Ausloggen erfolgreich" });
    }
  });
});

// Überprüfen des Anmeldestatus
app.get("/checkLoginStatus", (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).send({ loggedIn: true, username: req.session.user });
  } else {
    res.status(200).send({ loggedIn: false, username: null });
  }
});

// Benutzerregistrierung in sqlite3-DB
app.post("/register", (req, res) => {
  const { username, password, email, role } = req.body;
  // Password wird gehashed für mehr Sicherheit
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Übergabe der Werte aus der Registration-Komponente und Erstellung des neuen Nutzers
  db.run(
    "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
    [username, hashedPassword, email, role],
    (err) => {
      if (err) {
        res.status(500).send({ error: "Fehler bei der Registrierung" });
      } else {
        res.status(200).send({ success: "Benutzer erfolgreich registriert" });
      }
    }
  );
});

// Beispielroute für das Profil (nur für angemeldete Benutzer zugänglich)
app.get("/profile", checkAuthenticated, (req, res) => {
  res.status(200).send({ message: "Profilseite" });
});

// Beispielroute für die "JustForRich"-Seite (nur für angemeldete Benutzer mit der Rolle "rich" zugänglich)
app.get("/justforrich", checkAuthenticated, checkAccess("rich"), (req, res) => {
  res.status(200).send({ message: "Zugriff Rich-Seite genehmigt" });
});

app.listen(5000, () => {
  console.log("Server läuft auf http://localhost:5000");
});
