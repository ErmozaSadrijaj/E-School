import React, { useState } from 'react';
import '../assets/css/layout.css';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import {userID,userRole} from '../router'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const NxenesiLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const backgroundColor = userRole === 'mesimdhenesi' ? 'rgba(0, 115, 255, 1)' : 'rgba(255, 115, 0, 0.8)'
  return (
    <div>
      <Navbar className='container-fluid' style={{backgroundColor}}  light expand="md">
        <NavbarBrand href="/">Logo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className='link' tag={Link} to={`/${userRole}/${userID}`}>Profili</NavLink>
            </NavItem>
            {userRole == 'mesimdhenesi' ? (
              <NavItem >
                <NavLink className='link' tag={Link} to={`http://localhost:3006/mesimdhenesi/${userID}/studentet`}>Studentet</NavLink>
              </NavItem>
            ) : null}
            {userRole == 'nxenesi' ?  <NavItem>
              <NavLink className='link' tag={Link} to={`/${userRole}/${userID}/lendet`}>Lendet</NavLink>
            </NavItem>:''}
            <NavItem>
              <NavLink className='link' tag={Link} to={`http://localhost:3003/${userRole}/${userID}/blogs`}>Blogi</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='link' tag={Link} to="/">Libraria</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink className='link' tag={Link} to="http://localhost:3001">Dil</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Outlet/>
      <footer className=" bg-dark text-light py-3">
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

export default NxenesiLayout;