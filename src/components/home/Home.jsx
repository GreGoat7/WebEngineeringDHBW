import React from "react";
import Footer from "./Footer";
import MainContent from "./MainContent";
import NewAppBar from "./NewAppBar";

// Komponente: Home: setzt sich zusammen aus den Komponenten: Header, MainConent(Fakultäten), Footer
function Home() {
  return (
    <>
      <NewAppBar />
      <MainContent />
      <Footer />
    </>
  );
}

export default Home;
