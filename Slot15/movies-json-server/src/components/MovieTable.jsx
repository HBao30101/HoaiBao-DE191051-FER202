import React, { useMemo } from 'react';
import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  
  const { movies, genres, loading, movieToDelete, showDeleteModal, filters, sort, searchTerm } = state;

  // Filter and sort movies
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = searchTerm === '' || 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = filters.genreId === '' || 
        movie.genreId.toString() === filters.genreId;
      
      const matchesMinDuration = filters.minDuration === '' || 
        movie.duration >= parseInt(filters.minDuration);
      
      const matchesMaxDuration = filters.maxDuration === '' || 
        movie.duration <= parseInt(filters.maxDuration);
      
      return matchesSearch && matchesGenre && matchesMinDuration && matchesMaxDuration;
    });

    // Sort movies
    if (sort) {
      filtered.sort((a, b) => {
        switch (sort) {
          case 'title_asc':
            return a.title.localeCompare(b.title);
          case 'title_desc':
            return b.title.localeCompare(a.title);
          case 'duration_asc':
            return a.duration - b.duration;
          case 'duration_desc':
            return b.duration - a.duration;
          case 'year_asc':
            return a.year - b.year;
          case 'year_desc':
            return b.year - a.year;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [movies, filters, sort, searchTerm]);

  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info', 
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return categoryColors[genreName] || 'secondary';
  };

  const handleEditClick = (movie) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };
  
  const handleDeleteClick = (movie) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3">Loading movies...</Alert>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Movie List ({filteredAndSortedMovies.length} movies)</h4>
            <small className="text-muted">
              Showing {filteredAndSortedMovies.length} of {movies.length} movies
            </small>
          </div>

          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Avatar</th>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Duration</th>
                <th>Year</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedMovies.map((movie) => {
                const genreName = genreMap[movie.genreId] || 'Unknown';
                return (
                  <tr key={movie.id}>
                    <td>
                      <Image 
                        src={movie.avatar} 
                        alt={movie.title} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                        rounded 
                      />
                    </td>
                    <td>#{movie.id}</td>
                    <td>
                      <strong>{movie.title}</strong>
                      <br />
                      <small className="text-muted">{movie.description.substring(0, 50)}...</small>
                    </td>
                    <td>
                      <Badge bg={getCategoryBadgeVariant(genreName)}>
                        {genreName}
                      </Badge>
                    </td>
                    <td>{movie.duration} min</td>
                    <td>{movie.year}</td>
                    <td>{movie.country}</td>
                    <td>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleEditClick(movie)} 
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDeleteClick(movie)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {filteredAndSortedMovies.length === 0 && (
            <Alert variant="warning" className="text-center">
              No movies found matching your criteria.
            </Alert>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete movie <strong>"{movieToDelete?.title}"</strong> (ID: {movieToDelete?.id})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;