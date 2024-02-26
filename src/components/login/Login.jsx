import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // Zustände für Benutzername und Passwort
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Verwendung von useNavigate aus react-router-dom zum Navigieren auf andere Seiten
  const navigate = useNavigate();

  // Funktion zum Aktualisieren des Benutzernamens
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Funktion zum Aktualisieren des Passworts
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Funktion zum Ausführen des Anmeldevorgangs
  const handleLogin = () => {
    const user = {
      username: username,
      password: password,
    };

    // POST-Anfrage an den Server, um den Benutzer anzumelden
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Anmeldung erfolgreich");
          toast.success(`Angemeldet als: ${username}`); // Erfolgreiche Anmeldung
          setTimeout(() => {
            navigate("/home");
          }, 2000); // Verzögerung von 2 Sekunden, bevor zur Startseite weitergeleitet wird
        } else {
          console.log("Fehler bei der Anmeldung:", data.error);
          toast.error("Anmeldung fehlgeschlagen"); // Fehlgeschlagene Anmeldung
        }
      })
      .catch((error) => {
        console.error("Fehler:", error);
        toast.error("Anmeldung fehlgeschlagen"); // Fehlgeschlagene Anmeldung
      });
  };

  // Funktion zum Fortfahren ohne Login
  const handleContinueWithoutLogin = () => {
    navigate("/home");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={2}
      bgcolor="white"
      borderRadius={8}
      boxShadow={1}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login DHBW-Seite Gregori Daiger
      </Typography>
      <TextField
        label="Benutzername"
        variant="outlined"
        value={username}
        onChange={handleUsernameChange} // Aktualisiert den Benutzernamen beim Eingeben
        margin="normal"
      />
      <TextField
        label="Passwort"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePasswordChange} // Aktualisiert das Passwort beim Eingeben
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Anmelden
      </Button>
      <Box mt={2} display="flex" alignItems="center">
        <Typography variant="body1" component="p" marginRight={1}>
          Noch kein Benutzer?{" "}
          <Link to="/registration">Hier zur Registrierung</Link>
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinueWithoutLogin}
      >
        Fortfahren ohne Login
      </Button>
      <ToastContainer mt={2} position="top-right" autoClose={3000} />
    </Box>
  );
};

export default Login;
