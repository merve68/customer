import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="p-5 my-5 bg-light rounded-3">
      <Row>
        <Col>
          <h1>Hoşgeldiniz</h1>
          <p>Fatura yönetim sistemine hoş geldiniz.</p>
          <p>
            <Button variant="primary">Daha Fazla Bilgi</Button>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
