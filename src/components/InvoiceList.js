import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import CreateInvoice from './CreateInvoice';

function InvoiceList() {
  const [invoices, setInvoices] = useState([
    { id: 1, customer: 'Müşteri 1', date: '2024-07-18', amount: 100 },
    { id: 2, customer: 'Müşteri 2', date: '2024-07-19', amount: 200 },
  ]);

  const [show, setShow] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);

  const handleDelete = (id) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const handleEditShow = (invoice) => {
    setEditInvoice(invoice);
    setShow(true);
  };

  const handleEditClose = () => setShow(false);

  const handleEditSave = () => {
    setInvoices(invoices.map(invoice => (invoice.id === editInvoice.id ? editInvoice : invoice)));
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInvoice({ ...editInvoice, [name]: value });
  };

  const handleCreate = (newInvoice) => {
    const newId = invoices.length ? invoices[invoices.length - 1].id + 1 : 1;
    setInvoices([...invoices, { ...newInvoice, id: newId }]);
  };

  return (
    <div>
      <h2>Fatura Listesi</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Müşteri</th>
            <th>Tarih</th>
            <th>Tutar</th>
            <th>Aksiyon</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.date}</td>
              <td>{invoice.amount}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEditShow(invoice)}>Düzenle</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(invoice.id)}>Sil</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {editInvoice && (
        <Modal show={show} onHide={handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Fatura Düzenle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCustomer">
                <Form.Label>Müşteri Adı</Form.Label>
                <Form.Control
                  type="text"
                  name="customer"
                  value={editInvoice.customer}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Tarih</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={editInvoice.date}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAmount">
                <Form.Label>Tutar</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={editInvoice.amount}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Kapat
            </Button>
            <Button variant="primary" onClick={handleEditSave}>
              Kaydet
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      
      <CreateInvoice onCreate={handleCreate} />
    </div>
  );
}

export default InvoiceList;
