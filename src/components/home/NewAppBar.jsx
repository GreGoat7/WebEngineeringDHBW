import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../../assets/logodhbw.svg";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import WeatherPreview from "../weatherPreview/WeatherPreview";
import { ToastContainer, toast } from "react-toastify";

// Seiten für den Header
const pages = [
  "Dienste",
  "Informatik",
  "Elektrotechnik",
  "Maschinenbau",
  "Logout",
];

// Einstellung für Anzeige DHBW Logo
const Logo = styled("img")`
  max-height: 50px;
  margin-right: 10px;
`;

function NewAppBar() {
  // states um Öffnen der Dialoge zu steuern
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [weatherIsOpen, setWeatherIsOpen] = useState(false);
  const navigate = useNavigate();

  // Methode zum Öffne
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // state um PopUp "Dienste" zu steuern
  const [servicesIsOpen, setServicesIsOpen] = useState(false);

  // Methode uum Öffnen des "Dienste"-PopUps
  const openServices = () => {
    setServicesIsOpen(true);
  };

  // Schließen "Dienste"
  const closeServices = () => {
    setServicesIsOpen(false);
  };

  // Öffnen Wetter-PopUp
  const openWeather = () => {
    setWeatherIsOpen(true);
  };

  // Schließen Wetter-PopUp
  const closeWeather = () => {
    setWeatherIsOpen(false);
  };

  // Kommunikation raus zum Server um Nutzer auszuloggen, also Session zu beenden
  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Ausloggen erfolgreich");
          toast.success("Erfolgreich ausgeloggt");
          navigate("/home");
        } else {
          console.log("Fehler beim Ausloggen:", data.error);
        }
      })
      .catch((error) => {
        console.error("Fehler beim Ausloggen:", error);
      });
  };
  return (
    <AppBar position="fixed" sx={{ bgcolor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            src={logo}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DHBW Website
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={
                    page === "Dienste"
                      ? openServices
                      : page === "Logout"
                      ? handleLogout
                      : handleCloseNavMenu
                  }
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={
                    page === "Dienste"
                      ? openServices
                      : page === "Logout"
                      ? handleLogout
                      : undefined
                  }
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            component={Link}
            to="/login"
            color="inherit"
          >
            <Avatar sx={{ bgcolor: "red" }}>
              <AdbIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
        <Dialog
          open={servicesIsOpen}
          onClose={closeServices}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Link
            to="http://localhost:5000/justforrich"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Button>Zugriff nur für Rich</Button>
          </Link>
          <Button>WikiSuche</Button>
          <Button onClick={openWeather}>Wetteranzeige</Button>
          <Button onClick={closeServices}>Schließen</Button>
        </Dialog>
        <Dialog
          open={weatherIsOpen}
          onClose={closeWeather}
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <WeatherPreview />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeWeather}>Schließen</Button>
          </DialogActions>
        </Dialog>
      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </AppBar>
  );
}

export default NewAppBar;
