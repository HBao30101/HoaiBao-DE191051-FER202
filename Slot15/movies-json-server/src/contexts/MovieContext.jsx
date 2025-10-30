import React, { createContext, useContext, useReducer, useCallback } from 'react';
import movieApi from '../api/movieAPI';

const MovieStateContext = createContext();
const MovieDispatchContext = createContext();

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload, loading: false };
    case 'SET_GENRES':
      return { ...state, genres: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'OPEN_EDIT_MODAL':
      return { 
        ...state, 
        currentMovie: action.payload, 
        isEditing: action.payload.id,
        showEditModal: true 
      };
    case 'CLOSE_EDIT_MODAL':
      return { 
        ...state, 
        currentMovie: {},
        isEditing: null,
        showEditModal: false 
      };
    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        movieToDelete: action.payload,
        showDeleteModal: true 
      };
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        movieToDelete: null,
        showDeleteModal: false 
      };
    case 'UPDATE_FIELD':
      return { 
        ...state, 
        currentMovie: { ...state.currentMovie, [action.payload.name]: action.payload.value }
      };
    case 'RESET_FORM':
      return { 
        ...state, 
        currentMovie: {},
        isEditing: null,
        showEditModal: false,
      };
    default:
      return state;
  }
};

const initialState = {
  movies: [],
  genres: [],
  loading: false,
  isEditing: null,
  currentMovie: {},
  showEditModal: false,
  showDeleteModal: false,
  movieToDelete: null,
  filters: {
    genreId: '',
    minDuration: '',
    maxDuration: ''
  },
  sort: '',
  searchTerm: ''
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
      console.error("Error fetching movies:", error);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
      console.error("Error fetching genres:", error);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });

    try {
      await movieApi.delete(`/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
      fetchMovies();
    }
  }, [fetchMovies]);

  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    
    try {
      if (isEditing) {
        await movieApi.put(`/movies/${isEditingId}`, dataToSend);
      } else {
        await movieApi.post('/movies', dataToSend);
      }
      
      dispatch({ type: 'RESET_FORM' });
      fetchMovies();
      return true;
    } catch (error) {
      console.error("Error in CREATE/UPDATE:", error);
      fetchMovies();
      return false;
    }
  }, [fetchMovies]);

  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const setSort = useCallback((sort) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  }, []);

  const setSearchTerm = useCallback((searchTerm) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm });
  }, []);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
    setFilters,
    setSort,
    setSearchTerm
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};

export const useMovieState = () => {
  const context = useContext(MovieStateContext);
  if (context === undefined) {
    throw new Error('useMovieState must be used within a MovieProvider');
  }
  return context;
};

export const useMovieDispatch = () => {
  const context = useContext(MovieDispatchContext);
  if (context === undefined) {
    throw new Error('useMovieDispatch must be used within a MovieProvider');
  }
  return context;
};