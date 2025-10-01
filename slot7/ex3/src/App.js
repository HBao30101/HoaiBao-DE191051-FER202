import React from "react";
import Banner from "./component/Banner";
import NavbarMenu from "./component/Navar";
import Footer from "./component/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div>
      <Banner />
      <NavbarMenu />

      <div className="container my-4">
        {/* Hàng 1 */}
        <div className="row">
          <div className="col bg-body-secondary p-3 text-center border">First col</div>
          <div className="col bg-body-secondary p-3 text-center border">Second col</div>
        </div>

        {/* Hàng 2 */}
        <div className="row">
          <div className="col bg-body-secondary p-3 text-center border">col</div>
          <div className="col-6 bg-body-secondary p-3 text-center border">col</div>
          <div className="col bg-body-secondary p-3 text-center border">col</div>
        </div>

        {/* Hàng 3 */}
        <div className="row">
          <div className="col-2 bg-body-secondary p-3 text-center border">col</div>
          <div className="col bg-body-secondary p-3 text-center border">col</div>
          <div className="col bg-body-secondary p-3 text-center border">col</div>
          <div className="col bg-body-secondary p-3 text-center border">col</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
