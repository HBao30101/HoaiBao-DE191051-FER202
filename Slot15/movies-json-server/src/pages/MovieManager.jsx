import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider, useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import FilterBar from '../components/FilterBar';

const MovieManagerContent = () => {
  const { movies, genres } = useMovieState();
  const { fetchMovies, fetchGenres } = useMovieDispatch();

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">🎬 Movie Management System</h1>
      
      <MovieForm />
      
      <FilterBar />
      
      <MovieTable />
    </Container>
  );
};

const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;