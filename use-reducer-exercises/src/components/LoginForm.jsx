import { useState ,useReducer} from "react";
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
function LoginForm2() {
  // Initial state
  const initialState = {
    user: { username: '', password: '' },
    errors: {},
    showModal: false
  };

  // Reducer function
  const formReducer = (state, action) => {
    switch (action.type) {
      case 'SET_FIELD_VALUE':
        return {
          ...state,
          user: {
            ...state.user,
            [action.field]: action.value
          }
        };
      
      case 'SET_FIELD_ERROR':
        return {
          ...state,
          errors: {
            ...state.errors,
            [action.field]: action.error
          }
        };
      
      case 'REMOVE_FIELD_ERROR':
        const { [action.field]: removed, ...restErrors } = state.errors;
        return {
          ...state,
          errors: restErrors
        };
      
      case 'SET_ERRORS':
        return {
          ...state,
          errors: action.errors
        };
      
      case 'SHOW_MODAL':
        return {
          ...state,
          showModal: true
        };
      
      case 'CLOSE_MODAL':
        return {
          ...state,
          showModal: false,
          user: { username: '', password: '' },
          errors: {}
        };
      
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const { user, errors, showModal } = state;

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Cập nhật giá trị trường
    dispatch({ type: 'SET_FIELD_VALUE', field: name, value });

    // Kiểm tra lỗi cho từng trường
    if (value.trim() === '') {
      const errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      dispatch({ type: 'SET_FIELD_ERROR', field: name, error: errorMessage });
    } else {
      dispatch({ type: 'REMOVE_FIELD_ERROR', field: name });
    }
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (user.username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (user.password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    
    if (Object.keys(newErrors).length === 0) {
      dispatch({ type: 'SHOW_MODAL' });
    }
  };

  // Đóng modal và reset form
  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login Form 2</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Modal thông báo đăng nhập thành công */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-success text-center">
            Welcome, {user.username}!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginForm2;