import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const FilterBar = () => {
  const { genres, filters, sort, searchTerm } = useMovieState();
  const { setFilters, setSort, setSearchTerm, fetchMovies } = useMovieDispatch();

  const handleFilterChange = (name, value) => {
    setFilters({ [name]: value });
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleReset = () => {
    setFilters({ genreId: '', minDuration: '', maxDuration: '' });
    setSort('');
    setSearchTerm('');
  };

  return (
    <div className="bg-light p-3 mb-4 rounded">
      <Row className="g-3">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Search by Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter movie title..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Select
              value={filters.genreId}
              onChange={(e) => handleFilterChange('genreId', e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Min Duration (min)</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              value={filters.minDuration}
              onChange={(e) => handleFilterChange('minDuration', e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Max Duration (min)</Form.Label>
            <Form.Control
              type="number"
              placeholder="300"
              value={filters.maxDuration}
              onChange={(e) => handleFilterChange('maxDuration', e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Default</option>
              <option value="title_asc">Title A-Z</option>
              <option value="title_desc">Title Z-A</option>
              <option value="duration_asc">Duration ↑</option>
              <option value="duration_desc">Duration ↓</option>
              <option value="year_asc">Year ↑</option>
              <option value="year_desc">Year ↓</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={1} className="d-flex align-items-end">
          <Button variant="outline-secondary" onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;