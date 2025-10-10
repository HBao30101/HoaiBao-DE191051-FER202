import React from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import { movies } from "../../data/movies.js";
import "./MovieCard.css";

export default function MovieCard() {
  const truncate = (text, n) => (text.length > n ? text.slice(0, n) + "..." : text);

  // Toast function
  const showToast = () => {
    const toast = document.createElement("div");
    toast.className = "toast-genz";
    toast.innerText = "💖 Added to favourites!";
    document.body.appendChild(toast);
    setTimeout(() => (toast.style.opacity = "0"), 1800);
    setTimeout(() => toast.remove(), 2200);
  };

  // Modal function
  const showModal = (movie) => {
    const modal = document.createElement("div");
    modal.className = "modal-genz";
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-3 close-modal">✖</button>
        <h4 class="text-info mb-3">${movie.title}</h4>
        <img src="${movie.poster}" alt="${movie.title}" class="w-100 rounded mb-3" style="height:300px;object-fit:cover;filter:brightness(0.9)">
        <p class="text-secondary">${movie.fullDescription}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Country:</strong> ${movie.country}</p>
        <p><strong>Year:</strong> ${movie.year}</p>
        <p><strong>Duration:</strong> ${movie.duration} min</p>
        <p><strong>Showtimes:</strong> ${movie.showtimes.join(", ")}</p>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".close-modal").addEventListener("click", () => modal.remove());
    modal.querySelector(".modal-overlay").addEventListener("click", () => modal.remove());
  };

  return (
    <div className="movie-section">
      <h3 className="section-title">🎬 Featured Movie Collections</h3>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Card className="movie-card">
              <div className="poster-wrapper">
                <Card.Img
                  variant="top"
                  src={movie.poster}
                  alt={movie.title}
                  className="movie-poster"
                />
              </div>

              <Card.Body className="movie-body">
                <Card.Title className="movie-title">{movie.title}</Card.Title>
                <Card.Text className="movie-desc">
                  {truncate(movie.description, 70)}
                </Card.Text>

                <div className="movie-meta">
                  <Badge bg="info" text="dark" className="rounded-pill px-3 me-2">
                    {movie.genre}
                  </Badge>
                  <small className="text-muted">
                    {movie.year} • {movie.country} • {movie.duration}m
                  </small>
                </div>

                <div className="movie-actions">
                  <Button
                    className="btn-fav"
                    variant="outline-info"
                    size="sm"
                    onClick={() => showToast()}
                  >
                    + Favourite
                  </Button>
                  <Button
                    className="btn-detail"
                    variant="info"
                    size="sm"
                    onClick={() => showModal(movie)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
