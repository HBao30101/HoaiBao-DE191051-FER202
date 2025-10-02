// App.jsx
import React from 'react';

// Import các component từ folder components
import Header from './component/Header';
import HeroSlider from './component/HeroSlider';
import MenuSection from './component/MenuSection';
import BookingForm from './component/BookingForm';
// Import Bootstrap CSS (nếu chưa import trong index.js)
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="app-container bg-dark min-vh-100 text-white">
      {/* 1. Header */}
      <Header />

      {/* 2. Hero Slider */}
      <HeroSlider />

      {/* 3. Menu Section */}
      <MenuSection />

      {/* 4. Booking Form */}
      <BookingForm />

    </div>
  );
};

export default App;
