import React, { useState } from 'react';
import '../assets/css/layout.css';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import {userID,userRole} from '../router'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const BlogLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      
       <Navbar className={`container-fluid  ${userRole == 'mesimdhenesi' || userRole == 'administratori' ||userRole == 'drejtori' ? 'navbar-blue' : 'navbar-orange'}`} light expand="md">
                <NavbarBrand href="/">Logo</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className='w-100 float-end'>
                    {userRole == 'vizitori' ? 
                    <div className='d-flex flex-row flex-wrap'>
                      <Nav className="mr-auto " navbar>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001">Faqja Kryesore</NavLink>                       
                        </NavItem>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001/rrethNesh">Rreth Nesh</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className='link' tag={Link} to={`http://localhost:3003/${userRole}/blogs`}>Blogi</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001/kontakti">Kontakti</NavLink>
                        </NavItem>
                      </Nav>
                      <Nav navbar>
                          <NavItem>
                          <NavLink className='link' tag={Link} to="http://localhost:3001/identifikohu">Identifikohu</NavLink>
                          </NavItem>
                      </Nav>
                    </div>:''}


                    {userRole == 'nxenesi' || userRole == 'prindi'?
                    <div className='d-flex flex-row flex-wrap'>
                      <Nav className="mr-auto" navbar>
                        <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3005/${userRole}/${userID}`}>Profili</NavLink>
                        </NavItem>
                        {userRole == 'mesimdhenesi' ? (
                          <NavItem >
                            <NavLink className='link' tag={Link} to={`http://localhost:3006/mesimdhenesi/${userID}/studentet`}>Studentet</NavLink>
                          </NavItem>
                        ) : null}
                        {userRole == 'nxenesi' ?  <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3005/${userRole}/${userID}/lendet`}>Lendet</NavLink>
                        </NavItem>:''}
                        <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3003/${userRole}/${userID}/blogs`}>Blogi</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3007/${userRole}/${userID}/librat`}>Libraria</NavLink>
                        </NavItem>
                      </Nav>
                      <Nav navbar>
                        <NavItem>
                          <NavLink className='link' tag={Link} to="http://localhost:3001">Dil</NavLink>
                        </NavItem>
                      </Nav>
                    </div>:''}



                    {userRole == 'mesimdhenesi' || userRole == 'administratori' || userRole =='drejtori' ? 
                    <div className='d-flex flex-row flex-wrap'>
                      <Nav className="mr-auto" navbar>
                        <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}`}>Profili</NavLink>
                        </NavItem>
                      
                        {userRole == 'mesimdhenesi' ? 
                        (
                          <NavItem>
                            <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/studentet`}>Studentet</NavLink>
                          </NavItem>
                        ):
                        (
                          
                          <div className='d-flex flex-row'>
                            <NavItem>
                                <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/lendet`}>Lendet</NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/mesimdhenesit`}>Mesimdhenesit</NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/administrator_studentet`}>Studentet</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/menaxhoBlogjet`}>Menagjo Blogjet</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/menaxhoLibrarine`}>Menagjo Librarine</NavLink>
                          </NavItem>
                          </div>
                        )}
                        {userRole == 'drejtori'?
                        <div className='d-flex flex-row'>
                            <NavItem>
                                <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/administratoret`}>Administratoret</NavLink>
                            </NavItem>
                          </div>
                          :''}
                          
                          <NavItem>
                            <NavLink className='link' tag={Link} to={`http://localhost:3003/${userRole}/${userID}/blogs`}>Blogi</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink className='link' tag={Link} to={`http://localhost:3007/${userRole}/${userID}/librat`}>Libraria</NavLink>
                          </NavItem>
                          
                        </Nav>
                        <Nav navbar>
                          <NavItem>
                            <NavLink className='link' tag={Link} to="http://localhost:3001">Dil</NavLink>
                          </NavItem>
                        </Nav>
                    </div>:''}
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

export default BlogLayout;