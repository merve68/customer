import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function CreateInvoice({ onCreate }) {
  const [invoice, setInvoice] = useState({ customer: '', date: '', amount: '' });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(invoice);
    setInvoice({ customer: '', date: '', amount: '' });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Alert disappears after 3 seconds
  };

  return (
    <div>
      <h2>Yeni Fatura Oluştur</h2>
      {showAlert && <Alert variant="success">Fatura başarıyla oluşturuldu!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCustomer">
          <Form.Label>Müşteri Adı</Form.Label>
          <Form.Control
            type="text"
            name="customer"
            value={invoice.customer}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Tarih</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={invoice.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAmount">
          <Form.Label>Tutar</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={invoice.amount}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Oluştur
        </Button>
      </Form>
    </div>
  );
}

export default CreateInvoice;
