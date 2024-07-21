import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

function CustomerManagement() {
  const [customers, setCustomers] = useState([
    // örnek müşteri verisi
    { id: 1, name: 'Müşteri 1' },
    { id: 2, name: 'Müşteri 2' },
  ]);
  const [newCustomer, setNewCustomer] = useState('');

  const addCustomer = () => {
    setCustomers([...customers, { id: customers.length + 1, name: newCustomer }]);
    setNewCustomer('');
  };

  return (
    <div>
      <h2>Müşteri Yönetimi</h2>
      <Form inline onSubmit={(e) => { e.preventDefault(); addCustomer(); }}>
        <Form.Control
          type="text"
          value={newCustomer}
          onChange={(e) => setNewCustomer(e.target.value)}
          placeholder="Yeni müşteri adı"
          className="mr-sm-2"
        />
        <Button variant="primary" onClick={addCustomer}>Ekle</Button>
      </Form>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Müşteri Adı</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomerManagement;
