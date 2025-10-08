import React from "react";
// Nhập các icon cần thiết từ thư viện react-icons
import { 
  FaGooglePlusG, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaTwitter, 
  FaYoutube 
} from 'react-icons/fa';
import { MdPhone, MdFax, MdMailOutline } from 'react-icons/md';

export default function Footer() {
  // Màu nền cam và chữ màu đen
  return (
    // Sử dụng style inline cho màu nền cam đậm (hoặc dùng class CSS tùy chỉnh)
    // Dùng text-dark để chữ có màu đen
    <footer className="text-light py-4" style={{ backgroundColor: '#282827' }}> 
      <div className="container">
        {/* Dùng flexbox để chia thành hai cột chính */}
        <div className="d-flex justify-content-between align-items-start flex-wrap">
          
          {/* Cột 1: Địa chỉ và Liên hệ */}
          <div className="mb-3 mb-md-0">
            <h6 className="fw-bold fs-5 mb-3">Our Address</h6>
            <p className="mb-2">Khu đô thị FPT Đà Nẵng</p>
            
            <p className="mb-2">
              {/* Icon và số điện thoại */}
              <MdPhone className="me-2" /> +84023111111 
            </p>
            <p className="mb-2">
              {/* Icon và số fax/số khác */}
              <MdFax className="me-2" /> +852 8765 4321
            </p>
            
            {/* Email: Chữ màu xanh (blue) theo hình ảnh */}
            <p className="mb-0">
              <MdMailOutline className="me-2" /> 
              <a href="mailto:fptudn@fpt.edu.vn" className="text-decoration-none" style={{ color: '#007bff' }}>fptudn@fpt.edu.vn</a>
            </p>
          </div>
          
          {/* Cột 2: Các Icon Mạng Xã Hội */}
          <div className="d-flex align-items-center">
            {/* Các icon mạng xã hội đều dùng màu đen (text-dark) */}
            <a href="#" className="text-light mx-1 fs-4"><FaGooglePlusG /></a>
            <a href="#" className="text-light mx-1 fs-4"><FaFacebookF /></a>
            <a href="#" className="text-light mx-1 fs-4"><FaLinkedinIn /></a>
            <a href="#" className="text-light mx-1 fs-4"><FaTwitter /></a>
            <a href="#" className="text-light mx-1 fs-4"><FaYoutube /></a>
            {/* Icon mail cuối cùng */}
            <a href="#" className="text-light mx-1 fs-4"><MdMailOutline /></a> 
          </div>

        </div>

        {/* Bản quyền - Đặt ở giữa và dưới cùng */}
        <div className="text-center pt-3 mt-3 border-top border-dark-50">
          <p className="mb-0">© Copyright 2023</p>
        </div>

      </div>
    </footer>
  );
}