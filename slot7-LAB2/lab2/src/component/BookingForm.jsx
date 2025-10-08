// BookingForm.jsx
import React from 'react';

const BookingForm = () => {
  return (
    <section className="booking-form-section py-5 bg-dark">
      <div className="container">
        <div class="alert alert-primary" role="alert">
            A simple primary alert—check it out!
        </div>
        <div className="modal" tabIndex="-1">

</div>




        <h2 className="text-white text-center mb-5">Book Your Table</h2>
        <form>
          <div className="row mb-4">
            {/* Trường Tên */}
            <div className="col-md-4 mb-3 mb-md-0">
              <input type="text" className="form-control" placeholder="Your Name *" required />
            </div>
            {/* Trường Email */}
            <div className="col-md-4 mb-3 mb-md-0">
              <input type="email" className="form-control" placeholder="Your Email *" required />
            </div>
            {/* Trường Chọn Dịch Vụ */}
            <div className="col-md-4">
              <select className="form-select">
                <option value="">Select a Service</option>
                <option value="dinner">Dinner</option>
                <option value="lunch">Lunch</option>
                <option value="party">Party/Event</option>
              </select>
            </div>
          </div>
          {/* Trường Bình luận */}
          <div className="row mb-4">
            <div className="col-12">
              <textarea className="form-control" rows="5" placeholder="Please write your comment"></textarea>
            </div>
          </div>
          {/* Nút Gửi */}
          <div className="row">
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-warning btn-lg px-5 py-2 fw-bold text-dark">
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;