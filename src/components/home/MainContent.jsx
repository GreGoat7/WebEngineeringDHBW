import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import informatiklogo from "../../assets/früchte/Erdbeer-Q.jpeg";
import elektrotechniklogo from "../../assets/früchte/Mandarinen-Q.jpeg";
import maschinenbaulogo from "../../assets/früchte/Pizza-Q.jpeg";

// Styled Component für den Hauptcontainer des Inhalts
const MainContentContainer = styled("div")`
  padding-top: 80px;
  padding-bottom: 64px;
  overflow: auto;
  background: beige;
`;

// Styled Component für die Karten
const StyledCard = styled(Card)({
  marginBottom: "20px",
});

// Styled Component für den Container des Videos
const VideoContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
});

// Styled Component für das Video-Iframe
const VideoIframe = styled("iframe")({
  border: "none",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  width: "640px",
  height: "360px",
});

// Styled Component für die Fakultätskarte
const FacultyCard = styled(StyledCard)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

// Styled Component für den Abschnitt der Karte
const CardSection = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

// Styled Component für das Fakultätsbild
const FacultyImage = styled(CardMedia)({
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "8px",
});

// Array mit Fakultätsdaten
const faculties = [
  {
    name: "Informatik",
    image: informatiklogo,
    text: "Informatiker übertragen Vorgänge der realen Welt auf Computersysteme, indem sie die Aufgabenstellung in geeignete Modelle überführen und diese dann auf Softwaresystemen abbilden. Die Vielfalt an Anwendungsmöglichkeiten ist dabei nahezu unbegrenzt und steigt stetig mit der zunehmenden Leistungsfähigkeit der Systeme.",
  },
  {
    name: "Elektrotechnik",
    image: elektrotechniklogo,
    text: "Die Elektrotechnik bewegt und verändert die Welt: Smartphones, Assistenzsysteme, Smart Home oder Medizintechnik sind aus unserem Leben nicht mehr wegzudenken, die Energiewende ist in aller Munde. Ingenieurinnen und Ingenieure der Elektrotechnik gestalten und entwickeln die Systeme und haben so einen direkten Einfluss auf unser alltägliches Leben. Sie befassen sich nicht nur mit elektrischen und elektronischen Systemen, sondern arbeiten in einem sehr vielfältigen Arbeitsfeld, das von der Entwicklung eines Produkts über das Projektmanagement bis hin zu Marketing und Vertrieb reicht.",
  },
  {
    name: "Maschinenbau",
    image: maschinenbaulogo,
    text: "Der Maschinenbau mit seinen zahlreichen Ausprägungen verknüpft Theorie und Praxis, Naturwissenschaft und Technik. Die umfassende Ausbildung an der Dualen Hochschule Stuttgart ermöglicht es Absolventinnen und Absolventen des Studiengangs, Aufgaben in vielen Tätigkeitsfeldern zu übernehmen:",
  },
];

const MainContent = () => {
  return (
    <MainContentContainer>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Container für das Video */}
            <VideoContainer>
              {/* Video-Iframe */}
              <VideoIframe
                title="Video Title"
                src="https://youtube.com/embed/2dy9fLZEg9A"
              />
            </VideoContainer>
          </Grid>
          <Grid item xs={12}>
            {/* Karte für den allgemeinen Inhalt */}
            <StyledCard>
              <CardContent>
                <Typography>
                  Die DHBW Stuttgart steht für eine einzigartige Verbindung von
                  Theorie und Praxis: Zusammen mit rund 2.000 Unternehmen und
                  sozialen Einrichtungen (den Dualen Partnern) werden über 40
                  anerkannte Bachelor-Studienrichtungen in den Fakultäten
                  Wirtschaft, Technik und Sozialwesen angeboten
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          {/* Schleife für die Fakultätskarten */}
          {faculties.map((faculty, index) => (
            <Grid item xs={12} key={index}>
              {/* Fakultätskarte */}
              <FacultyCard>
                <CardSection item xs={4}>
                  {/* Fakultätsbild */}
                  <FacultyImage
                    component="img"
                    image={faculty.image}
                    alt={faculty.name}
                  />
                </CardSection>
                <CardSection item xs={8}>
                  {/* Fakultätsname und -text */}
                  <Typography variant="h6">{faculty.name}</Typography>
                  <Typography>{faculty.text}</Typography>
                </CardSection>
              </FacultyCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainContentContainer>
  );
};

export default MainContent;
