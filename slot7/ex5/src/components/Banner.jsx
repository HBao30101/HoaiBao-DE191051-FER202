import React from "react";

export default function Banner() {
  return (
    <div className=" text-center py-3"
    style={{ backgroundColor: "#eb8213" }}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHMTvk8XB-ltobATN-7L616pVxCgw0c6wzSw&s"
        alt="Students"
        className="img-fluid"
        style={{ 
            width: "90%", height: "500px", objectFit: "cover" }}
      />
    </div>
  );
}
