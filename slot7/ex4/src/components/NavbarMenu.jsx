import React from "react";

export default function NavbarMenu() {
  return (
    <nav className=" text-center py-2 "
      style={{ backgroundColor: "#ea7f38" }}  // cam đậm

    >
      <a href="#home" className="mx-2 text-light text-decoration-none">Home</a>
      <a href="#about" className="mx-2 text-light text-decoration-none">About</a>
      <a href="#contact" className="mx-2 text-light text-decoration-none">Contact</a>
    </nav>
  );
}
