import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel.jsx";
import MovieCard from "../components/Card/MovieCard.jsx";
import Filter from "../components/Filter/Filter.jsx";
import { Nav } from "react-bootstrap/esm/index.js";
import Navbar from "../components/NavBar/NavBar.jsx";

export default function HomePage() {
  return (
    <div>
      <div className="pb-3 pt-2">
        <Navbar />
      </div>
      {/* Carousel đầu trang */}
      <HomeCarousel />
      {/* Featured Movies */}
      <div className="mt-5 container">
        <h4 className="mb-3 fw-bold text-uppercase">🎬 Featured Movies Collections</h4>
        <p className="text-secondary mb-4">
          Dưới đây là danh sách các bộ phim nổi bật được chọn lọc đặc biệt dành cho bạn.
        </p>
         <Filter />
        {/* Nhúng MovieCard vào đây */}
        <MovieCard />
      </div>
    </div>
  );
}
