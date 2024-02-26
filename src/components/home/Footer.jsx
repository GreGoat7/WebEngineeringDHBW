import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)`
  top: auto;
  bottom: 0;
  background-color: black;
  min-height: 40px;
  max-height: 10px;
`;

// Footer wird fixed in der Home-Komponente gerendert
function Footer() {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Typography
          variant="body2"
          align="center"
          color="inherit"
          style={{ flexGrow: 1 }}
        >
          Copyright &copy; {new Date().getFullYear()} Gregori Daiger
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Footer;
