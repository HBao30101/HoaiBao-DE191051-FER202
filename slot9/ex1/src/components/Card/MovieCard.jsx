import React, { useEffect } from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import { movies } from "../../data/movies.js";

export default function MovieCard() {
  const truncate = (text, n) => (text.length > n ? text.slice(0, n) + "..." : text);

  useEffect(() => {
    // Toast logic
    document.querySelectorAll(".btn-fav").forEach((btn) => {
      btn.addEventListener("click", () => {
        const toast = document.createElement("div");
        toast.className =
          "toast-genz position-fixed bottom-0 end-0 m-4 px-4 py-2 rounded-3 shadow text-white";
        toast.innerText = "💖 Added to favourites!";
        document.body.appendChild(toast);

        setTimeout(() => (toast.style.opacity = "0"), 1800);
        setTimeout(() => toast.remove(), 2200);
      });
    });

    // Modal logic
    document.querySelectorAll(".btn-detail").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const movie = movies.find((m) => m.id === parseInt(id));
        if (!movie) return;

        const modal = document.createElement("div");
        modal.className =
          "modal-genz fixed-top w-100 h-100 d-flex align-items-center justify-content-center";
        modal.innerHTML = `
          <div class="modal-overlay position-absolute top-0 start-0 w-100 h-100"></div>
          <div class="modal-content bg-dark text-light p-4 rounded-4 shadow-lg position-relative" style="max-width: 600px; z-index: 10;">
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
      });
    });
  }, []);

  return (
    <div
      className="my-5 px-3 py-4 rounded-4"
      style={{
        background: "linear-gradient(145deg, #0a0a0a, #151515)",
        color: "#f8f9fa",
      }}
    >
      <h3 className="text-center mb-4 fw-bold text-info">🎬 Featured Movie Collections</h3>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Card
              className="h-100 border-0 rounded-4 overflow-hidden shadow movie-card"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(6px)",
                color: "#e0e0e0",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ height: "300px", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={movie.poster}
                  alt={movie.title}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    transition: "transform 0.4s ease",
                    filter: "brightness(0.8)",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fw-bold text-info mb-2">{movie.title}</Card.Title>
                <Card.Text className="text-light small mb-3">
                  {truncate(movie.description, 70)}
                </Card.Text>

                <div className="mb-3">
                  <Badge bg="info" text="dark" className="rounded-pill px-3 me-2">
                    {movie.genre}
                  </Badge>
                  <small className="text-muted">
                    {movie.year} • {movie.country} • {movie.duration}m
                  </small>
                </div>

                <div className="d-flex justify-content-between mt-auto">
                  <Button
                    className="btn-fav px-3 py-1 rounded-pill"
                    variant="outline-info"
                    size="sm"
                    style={{
                      borderColor: "#00f5d4",
                      color: "#00f5d4",
                      fontWeight: "600",
                    }}
                  >
                    + Favourite
                  </Button>
                  <Button
                    className="btn-detail px-3 py-1 rounded-pill"
                    variant="info"
                    size="sm"
                    data-id={movie.id}
                    style={{
                      background: "linear-gradient(45deg, #00bbf9, #7209b7)",
                      border: "none",
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Custom style for toast + modal */}
      <style>{`
        .toast-genz {
          background: linear-gradient(45deg, #00f5d4, #00bbf9);
          animation: floatIn 0.5s ease, fadeOut 0.5s 1.8s ease forwards;
        }
        @keyframes floatIn {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeOut {
          to { opacity: 0; transform: translateY(20px); }
        }
        .modal-overlay {
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease;
        }
        .modal-content {
          animation: popIn 0.4s ease;
        }
        @keyframes popIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
