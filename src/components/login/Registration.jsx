import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  // Zustände für Benutzername, E-Mail, Passwort und Rolle
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("poor");

  // Verwendung von useNavigate aus react-router-dom zum Navigieren auf andere Seiten
  const navigate = useNavigate();

  // Funktion zum Aktualisieren des Benutzernamens
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Funktion zum Aktualisieren der E-Mail
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Funktion zum Aktualisieren des Passworts
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Funktion zum Aktualisieren der Rolle
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Funktion zum Ausführen des Registrierungsvorgangs
  const handleRegistration = () => {
    const user = {
      username: username,
      email: email,
      password: password,
      role: role,
    };

    // POST-Anfrage an den Server, um den Benutzer zu registrieren
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Benutzer erfolgreich registriert");
          toast.success(`Registriert als: ${username}`); // Erfolgreiche Registrierung
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Verzögerung von 2 Sekunden, bevor zur Anmeldeseite weitergeleitet wird
        } else {
          console.log("Fehler bei der Registrierung:", data.error);
          toast.error("Fehler bei der Registrierung"); // Fehler bei der Registrierung
        }
      })
      .catch((error) => {
        console.error("Fehler:", error);
        toast.error("Fehler bei der Registrierung"); // Fehler bei der Registrierung
      });
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
        Registrierung
      </Typography>
      <TextField
        label="Benutzername"
        variant="outlined"
        value={username}
        onChange={handleUsernameChange} // Aktualisiert den Benutzernamen beim Eingeben
        margin="normal"
      />
      <TextField
        label="E-Mail"
        variant="outlined"
        value={email}
        onChange={handleEmailChange} // Aktualisiert die E-Mail beim Eingeben
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
      <Box mt={2}>
        <Select
          label="Rolle"
          variant="outlined"
          value={role}
          onChange={handleRoleChange} // Aktualisiert die Rolle bei der Auswahl
        >
          <MenuItem value="rich">Rich</MenuItem>
          <MenuItem value="poor">Poor</MenuItem>
        </Select>
      </Box>
      <Button variant="contained" color="primary" onClick={handleRegistration}>
        Registrieren
      </Button>
      <Box mt={2}>
        <Typography variant="body1" component="p">
          Bereits registriert? <Link to="/login">Hier anmelden</Link>
        </Typography>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default Registration;
