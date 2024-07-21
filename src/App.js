import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import Home from "./components/Home";
import InvoiceList from "./components/InvoiceList";
import CreateInvoice from "./components/CreateInvoice";
import CustomerManagement from "./components/CustomerManagement";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [invoices, setInvoices] = React.useState([
    { id: 1, customer: "Müşteri 1", date: "2024-07-18", amount: 100 },
    { id: 2, customer: "Müşteri 2", date: "2024-07-19", amount: 200 },
  ]);

  const handleCreate = (newInvoice) => {
    const newId = invoices.length ? invoices[invoices.length - 1].id + 1 : 1;
    setInvoices([...invoices, { ...newInvoice, id: newId }]);
  };

  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Fatura Yönetim Sistemi
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Anasayfa
              </Nav.Link>
              <Nav.Link as={Link} to="/invoices">
                Fatura Listesi
              </Nav.Link>
              <Nav.Link as={Link} to="/create-invoice">
                Yeni Fatura Oluştur
              </Nav.Link>
              <Nav.Link as={Link} to="/customers">
                Müşteri Yönetimi
              </Nav.Link>
              {/* Dropdown for more options */}
              {user && (
                <NavDropdown title="Profil" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profil
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">
                    Ayarlar
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    Çıkış Yap
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            {!user && (
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/login">
                  Giriş Yap
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Kayıt Ol
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <PrivateRoute>
                <InvoiceList />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-invoice"
            element={
              <PrivateRoute>
                <CreateInvoice onCreate={handleCreate} />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <CustomerManagement />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
