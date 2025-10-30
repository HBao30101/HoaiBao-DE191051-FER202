import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image, Alert } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal, genres } = state;
  
  const [imagePreview, setImagePreview] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value: imageUrl } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
    setImagePreview('');
    setValidated(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentMovie.title?.trim()) {
      newErrors.title = 'Movie title is required';
    }
    
    if (!currentMovie.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!currentMovie.genreId) {
      newErrors.genreId = 'Please select a genre';
    }
    
    if (!currentMovie.duration) {
      newErrors.duration = 'Duration is required';
    }
    
    if (!currentMovie.year) {
      newErrors.year = 'Year is required';
    }
    
    if (!currentMovie.country?.trim()) {
      newErrors.country = 'Country is required';
    }
    
    if (!currentMovie.avatar?.trim()) {
      newErrors.avatar = 'Please select an image or enter URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setValidated(true);
    
    if (!validateForm()) {
      return;
    }
    
    const dataToSend = {
      ...currentMovie,
      duration: parseInt(currentMovie.duration),
      year: parseInt(currentMovie.year),
      genreId: parseInt(currentMovie.genreId)
    };
    
    const success = await handleCreateOrUpdate(dataToSend, isEditing !== null, isEditing);
    
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      if (isEditing === null) {
        setImagePreview('');
        setValidated(false);
        setErrors({});
        // Reset form
        Object.keys(currentMovie).forEach(key => {
          dispatch({ type: 'UPDATE_FIELD', payload: { name: key, value: '' } });
        });
      } else {
        handleCloseEditModal();
      }
    }
  };

  return (
    <>
      <Container className="p-3 mb-4 border rounded">
        <h3 className="mb-3">📽️ Add New Movie</h3>
        
        {showSuccess && (
          <Alert variant="success" className="mb-3">
            Movie {isEditing ? 'updated' : 'added'} successfully!
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formAvatar">
                <Form.Label>Movie Avatar</Form.Label>
                <Form.Control 
                  type="file" 
                  name="avatarFile" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                <Form.Control 
                  type="text" 
                  name="avatar" 
                  value={currentMovie.avatar || ''} 
                  onChange={handleInputChange} 
                  placeholder="Or enter image URL"
                  isInvalid={validated && errors.avatar}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.avatar}
                </Form.Control.Feedback>
                {imagePreview && (
                  <div className="mt-2">
                    <Image src={imagePreview} alt="Preview" thumbnail style={{ maxWidth: '200px' }} />
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTitle">
                <Form.Label>Movie Title *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="title" 
                  value={currentMovie.title || ''} 
                  onChange={handleInputChange} 
                  placeholder="Movie title" 
                  required 
                  isInvalid={validated && errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description *</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  name="description" 
                  value={currentMovie.description || ''} 
                  onChange={handleInputChange} 
                  placeholder="Movie description" 
                  required 
                  isInvalid={validated && errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="formGenre">
                <Form.Label>Genre *</Form.Label>
                <Form.Select 
                  name="genreId" 
                  value={currentMovie.genreId || ''} 
                  onChange={handleInputChange} 
                  required
                  isInvalid={validated && errors.genreId}
                >
                  <option value="">Select genre</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genreId}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="formDuration">
                <Form.Label>Duration (min) *</Form.Label>
                <Form.Control 
                  type="number" 
                  name="duration" 
                  value={currentMovie.duration || ''} 
                  onChange={handleInputChange} 
                  placeholder="Minutes" 
                  required 
                  min="1"
                  isInvalid={validated && errors.duration}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="formYear">
                <Form.Label>Year *</Form.Label>
                <Form.Control 
                  type="number" 
                  name="year" 
                  value={currentMovie.year || ''} 
                  onChange={handleInputChange} 
                  placeholder="Year" 
                  required 
                  min="1900"
                  isInvalid={validated && errors.year}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.year}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formCountry">
                <Form.Label>Country *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="country" 
                  value={currentMovie.country || ''} 
                  onChange={handleInputChange} 
                  placeholder="Country" 
                  required 
                  isInvalid={validated && errors.country}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2 mt-3">
            <Button variant="success" type="submit">
              ➕ Add Movie
            </Button>
          </div>
        </Form>
      </Container>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            {/* Same form fields as above */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="editAvatar">
                  <Form.Label>Movie Avatar</Form.Label>
                  <Form.Control 
                    type="file" 
                    name="avatarFile" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  <Form.Control 
                    type="text" 
                    name="avatar" 
                    value={currentMovie.avatar || ''} 
                    onChange={handleInputChange} 
                    placeholder="Or enter image URL"
                    isInvalid={validated && errors.avatar}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.avatar}
                  </Form.Control.Feedback>
                  {currentMovie.avatar && (
                    <div className="mt-2">
                      <Image src={currentMovie.avatar} alt="Preview" thumbnail style={{ maxWidth: '200px' }} />
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editTitle">
                  <Form.Label>Movie Title *</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="title" 
                    value={currentMovie.title || ''} 
                    onChange={handleInputChange} 
                    required 
                    isInvalid={validated && errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Other fields similar to above */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>Cancel</Button>
            <Button variant="warning" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;