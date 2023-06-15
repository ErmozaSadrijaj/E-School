import React, { useState } from 'react';
import '../assets/css/layout.css';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
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
      <Navbar className='container-fluid' color="light"  light expand="md">
      <NavbarBrand href="/">
          <img src='./studenti_react/src/assets/images/logo.png' alt='#' className="navbar-brand"></img>
          </NavbarBrand>       
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
              <NavLink className='link' tag={Link} to={`http://localhost:3007/${userRole}/${userID}/librat`}>Libraria</NavLink>
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
      <footer className="text-center text-lg-start text-white">
    <div className="container p-4 pb-0">
      <section className="text-center">
        <div className="row">
          <div className="">
            <h4 className='titulli'>Gjimnazi Bedri Pejani</h4>

            <p className='paragraph'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae modi cum ipsam ad, illo possimus laborum ut
              reiciendis obcaecati. Ducimus, quas. Corrupti, pariatur eaque?
              Reiciendis assumenda iusto sapiente inventore animi?Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae modi cum ipsam ad, illo possimus laborum ut
              reiciendis obcaecati. Ducimus, quas. Corrupti, pariatur eaque?
              Reiciendis assumenda iusto sapiente inventore animi?
            </p>
          </div>
        </div>
      </section>

      <hr className="mb-2" />
      <section className="mb-0 text-center">
  <a className="btn btn-outline-dark btn-floating m-2" href="/" role="button">
    <FaFacebook />
  </a>

  <a className="btn btn-outline-dark btn-floating m-2" href="/" role="button">
    <FaTwitter />
  </a>

  <a className="btn btn-outline-dark btn-floating m-2" href="/" role="button">
    <FaLinkedinIn />
  </a>

  <a className="btn btn-outline-dark btn-floating m-2" href="/" role="button">
    <FaGithub />
  </a>
</section>

    </div>
    <hr className="mb-0" />
    <div className="text-center p-2">
      © 2023 Copyright: All Rights Reserved
      <a className="text-white" href="https://mdbootstrap.com/"> </a>
    </div>
  </footer>
    </div>
  );
}

export default NxenesiLayout;