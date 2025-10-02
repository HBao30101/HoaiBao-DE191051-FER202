// Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <a className="navbar-brand fs-3 fw-bold" href="#">Pizza House</a>
        
        {/* Nút điều hướng cho mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
          
          {/* Thanh tìm kiếm */}
          <form className="d-flex" role="search">
            <div className="input-group">
              <input 
                className="form-control" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
              />
              <button className="btn btn-danger" type="submit">
                <i className="bi bi-search"></i> {/* Cần import Bootstrap Icons */}
              </button>
            </div>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;