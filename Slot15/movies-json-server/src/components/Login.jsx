import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [touched, setTouched] = useState({ username: false, password: false });
  
  const { loading, error, isAuthenticated } = useAuthState();
  const { login, clearError } = useAuthDispatch();

  // Tự động xóa lỗi sau 5 giây
  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Kiểm tra lỗi
  const validateField = (name, value) => {
    if (!value.trim()) return 'Vui lòng nhập thông tin';
    if (name === 'username' && value.length < 3) return 'Tối thiểu 3 ký tự';
    if (name === 'password' && value.length < 6) return 'Tối thiểu 6 ký tự';
    return '';
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate real-time nếu đã chạm vào trường
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Xử lý blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Đánh dấu tất cả các trường đã chạm
    setTouched({ username: true, password: true });
    
    // Kiểm tra lỗi
    const newErrors = {
      username: validateField('username', formData.username),
      password: validateField('password', formData.password)
    };
    
    setErrors(newErrors);
    
    // Nếu có lỗi thì dừng lại
    if (Object.values(newErrors).some(error => error)) return;
    
    // Thử đăng nhập
    await login(formData.username, formData.password);
  };

  if (isAuthenticated) return null;

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '400px' }} className="shadow">
        <Card.Body>
          <h2 className="text-center mb-4">🎬 Đăng Nhập</h2>
          
          {/* Hiển thị lỗi server */}
          {error && (
            <Alert variant="danger" className="mb-3" dismissible onClose={clearError}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Tên đăng nhập */}
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Nhập username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && !!errors.username}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Mật khẩu */}
            <Form.Group className="mb-4">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Nút đăng nhập */}
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng Nhập'
              )}
            </Button>
          </Form>

          {/* Tài khoản demo */}
          <div className="mt-4 p-3 bg-light rounded">
            <small>
              <strong>Tài khoản demo:</strong><br />
              Admin: admin / admin123<br />
              User: user / user123
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;