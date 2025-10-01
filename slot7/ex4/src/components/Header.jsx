import React from "react";

export default function Header() {
  return (
    <header 
      className="text-center py-5 d-flex justify-content-center align-items-center" 
      style={{ backgroundColor: "#e8823e", minHeight: "200px" }} // chiều cao header
    >
      <img 
        src="/image.png" 
        alt="FPT University" 
        className="img-fluid" 
        style={{ width: "40%", objectFit: "contain" }} 
      />
    </header>
  );
}
