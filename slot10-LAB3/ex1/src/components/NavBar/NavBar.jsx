import React from "react";
import "./NavBar.css";
import { Container, Nav, Navbar, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import { Person, Heart, BoxArrowInRight } from "react-bootstrap-icons";

export default function NavBar() {
  return (
    <Navbar expand="lg" className="genz-navbar">
      <Container fluid className="navbar-container">
        <Navbar.Brand href="#" className="logo-text">GenZ Store</Navbar.Brand>

        <Nav className="me-auto nav-links">
          <Nav.Link href="#" className="nav-link">Home</Nav.Link>
          <Nav.Link href="#" className="nav-link">About</Nav.Link>
          <Nav.Link href="#" className="nav-link">Contact</Nav.Link>
        </Nav>

        <Form className="d-flex search-form">
          <FormControl
            type="search"
            placeholder="Quick search..."
            className="search-input"
          />
          <Button className="search-btn">Search</Button>
        </Form>

        <div className="icons">
          <NavDropdown
            title={<Person size={22} />}
            id="account-dropdown"
            className="icon-dropdown"
          >
            <NavDropdown.Item href="#">Manage Your Profiles</NavDropdown.Item>
            <NavDropdown.Item href="/account">Build your Account</NavDropdown.Item>
            <NavDropdown.Item href="#">Change Password</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="#" className="icon-link">
            <BoxArrowInRight size={22} />
          </Nav.Link>

          <Nav.Link href="#" className="icon-link">
            <Heart size={22} />
          </Nav.Link>
        </div>
      </Container>
    </Navbar>
  );
}
