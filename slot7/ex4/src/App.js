import React from "react";
import Header from "./components/Header";
import NavbarMenu from "./components/NavbarMenu";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Header />
      <NavbarMenu />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
