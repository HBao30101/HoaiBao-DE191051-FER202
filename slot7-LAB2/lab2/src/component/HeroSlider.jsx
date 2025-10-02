// HeroSlider.jsx
import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'; 

const HeroSlider = () => {
  const heroImages = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/1200px-Supreme_pizza.jpg',
      title: 'Supreme Pizza',
      caption: 'The ultimate combination of meats and veggies for a satisfying meal!',
    },
    {
      url: 'https://daylambanh.edu.vn/wp-content/uploads/2024/04/cach-lam-banh-pizza.jpg',
      title: 'Four Cheese Pizza',
      caption: 'A delicious blend of four distinct cheeses on a perfect crust.',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg',
      title: 'Neapolitan Pizza',
      caption: 'If you are looking for a traditional Italian pizza, the Neapolitan is the best option!',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = heroImages[currentIndex];

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % heroImages.length;
    setCurrentIndex(nextIndex);
  };

  const goToPrevious = () => {
    const previousIndex = (currentIndex - 1 + heroImages.length) % heroImages.length;
    setCurrentIndex(previousIndex);
  };

  // Inline style chỉ dùng cho hiệu ứng chữ nổi (text-shadow)
  const textStyle = {
    // 💡 Text-shadow không có class Bootstrap tương đương, nên phải dùng style
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
    // Nếu muốn chữ có font Seriff như ảnh, cần thêm 'fontFamily: "Georgia, serif"'
  };

  return (
    <section
      className="hero-slider-section position-relative d-flex align-items-center"
      style={{
        backgroundImage: `url(${currentSlide.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        color: 'white',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      {/* Overlay mờ */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      ></div>

      {/* Nội dung chính */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center">
          {/* Nút điều hướng trái */}
          <div className="col-auto">
            <button
              className="btn btn-outline-light rounded-circle shadow-lg"
              onClick={goToPrevious}
            >
              <BsChevronLeft size={24} /> 
            </button>
          </div>

          {/* Nội dung slider: text-center để căn giữa nội dung */}
          <div className="col text-center">
            {/* ⭐️ Tiêu đề: Dùng class Bootstrap display-1/2 và fw-normal/light ⭐️ */}
            <h1 
              className="display-2 mb-3 fw-light" // Dùng fw-light để chữ mảnh hơn
              style={textStyle}
            >
              {currentSlide.title}
            </h1>
            
            {/* ⭐️ Chú thích: Dùng class Bootstrap lead ⭐️ */}
            <p 
              className="lead mt-4 fw-normal" 
              style={textStyle}
            >
              {currentSlide.caption}
            </p>
          </div>

          {/* Nút điều hướng phải */}
          <div className="col-auto">
            <button
              className="btn btn-outline-light rounded-circle shadow-lg"
              onClick={goToNext}
            >
              <BsChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;