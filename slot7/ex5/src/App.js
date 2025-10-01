import React from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Students from "./components/Students";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


function App() {
  return (
    <div>
      <Header />
      <Banner />
      <Students />
      <Footer />
    </div>
  );
}

export default App;
