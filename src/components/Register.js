import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(credentials)) {
      navigate('/login');
    } else {
      alert('Kullanıcı adı zaten mevcut.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2>Kayıt Ol</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Kayıt Ol
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
