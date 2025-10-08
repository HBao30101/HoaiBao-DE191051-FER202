// PizzaCard.jsx
import React from 'react';

const PizzaCard = ({ name, price, oldPrice, tag, imageUrl }) => {
  // Xác định class cho tag
  let tagClass = '';
  if (tag === 'SALE') tagClass = 'bg-danger';
  else if (tag === 'NEW') tagClass = 'bg-warning text-dark';

  // Format tiền
  const formatPrice = (value) =>
    new Intl.NumberFormat('en-VN', { style: 'currency', currency: 'VND' }).format(value);

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card text-white bg-dark border-0 position-relative shadow-sm hover-scale">
        {/* Ảnh pizza */}
        <img
          src={imageUrl || '/default-pizza.jpg'}
          className="card-img-top"
          alt={name}
          style={{ height: '250px', objectFit: 'cover' }}
        />

        {/* Badge tag */}
        {tag && (
          <span
            className={`badge ${tagClass} position-absolute top-0 start-0 m-2 px-3 py-2 fs-6 rounded-pill`}
            title={tag}
          >
            {tag}
          </span>
        )}

        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="card-text mb-2">
            {oldPrice && (
              <small className="text-decoration-line-through text-secondary me-2">
                {formatPrice(oldPrice)}
              </small>
            )}
            <span className="fw-bold fs-5">{formatPrice(price)}</span>
          </p>
          <button className="btn btn-secondary w-100" >Buy</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
