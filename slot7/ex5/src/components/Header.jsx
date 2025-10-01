import React from "react";
import { FaHome, FaBook, FaBullhorn, FaUserGraduate } from "react-icons/fa";

export default function Header() {
  return (
    <header
      className="py-2 border-bottom"
      style={{ backgroundColor: "#f9b873" }} // nền cam nhạt
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div>
          <img
            src="https://it.fpt.edu.vn/static/images/fpt-logo.png"
            alt="FPT Logo"
            style={{ height: "40px" }}
          />
        </div>

        {/* Navigation */}
        <nav className="d-flex align-items-center">
          <a
            href="#"
            className="me-4 d-flex align-items-center text-decoration-none"
            style={{ color: "#e8823e", fontWeight: 400 }}
          >
            <FaHome className="me-1" /> Trang chủ
          </a>
          <a
            href="#"
            className="me-4 d-flex align-items-center text-decoration-none"
            style={{ color: "#e8823e", fontWeight: 400 }}
          >
            <FaBook className="me-1" /> Ngành học
          </a>
          <a
            href="#"
            className="me-4 d-flex align-items-center text-decoration-none"
            style={{ color: "#e8823e", fontWeight: 400 }}
          >
            <FaBullhorn className="me-1" /> Tuyển sinh
          </a>
          <a
            href="#"
            className="d-flex align-items-center text-decoration-none"
            style={{ color: "#e8823e", fontWeight: 400 }}
          >
            <FaUserGraduate className="me-1" /> Sinh viên
          </a>
        </nav>

        {/* Search box */}
        <div>
          <input type="text" placeholder="Search..." className="form-control" />
        </div>
      </div>
    </header>
  );
}
