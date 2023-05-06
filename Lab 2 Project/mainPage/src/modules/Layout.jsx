import React, { useState } from 'react';
import '../assets/css/layout.css';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Layout = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className='container-fluid' color="light" light expand="md">
        <NavbarBrand href="/">Logo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className='link' tag={Link} to="/">Faqja Kryesore</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='link' tag={Link} to="/rrethNesh">Rreth Nesh</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='link' tag={Link} to="http://localhost:3003/blogs">Blogi</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='link' tag={Link} to="/kontakti">Kontakti</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink className='link' tag={Link} to="/identifikohu">Identifikohu</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Outlet/>
      <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col xs={12} md={4} className="text-center text-md-left">
            <p className="m-0">All rights reserved</p>
          </Col>
          <Col xs={12} md={4} className="text-center">
            <p className="m-0">Gjimnazi Bedri Pejani</p>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-right">
            <a href="https://www.facebook.com/"><FaFacebook className="text-light mx-3" size={24} /></a>
            <a href="https://www.instagram.com/"><FaInstagram className="text-light mx-3" size={24} /></a>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>
  );
}

export default Layout;