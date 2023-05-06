import { Link } from 'react-router-dom';

import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,} from 'reactstrap';
import React, { useState } from 'react';
import '../assets/css/Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return(
        <>
            <Navbar className='container-fluid' light expand="md">
                <NavbarBrand href="/">Logo</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001">Faqja Kryesore</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001/rrethNesh">Rreth Nesh</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3003/blogs">Blogi</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001/kontakti">Kontakti</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001/identifikohu">Kyqu</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    )
}
export default Layout;