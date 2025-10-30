import React from 'react';
import { AuthProvider, useAuthState } from './contexts/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import MovieManager from './pages/MovieManager';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const AppContent = () => {
  const { isAuthenticated } = useAuthState();

  return (
    <div className="App">
      <Header />
      {isAuthenticated ? <MovieManager /> : <Login />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;