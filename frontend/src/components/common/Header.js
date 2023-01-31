import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './styles/Header.css'

const Header = () => {
    return(
        <Navbar style={{'backgroundColor': '#31373d'}} expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    
                        <li className="nav-item ">
                            <Link id="RouterNavLink" to="/" className="nav-link text-white">Inicio</Link>
                        </li>
                    
                    
                        <li className="nav-item ">
                            <Link id="RouterNavLink" to="/warehouses" className="nav-link text-white">Almacenes</Link>
                        </li>

                        <li className="nav-item ">
                            <Link id="RouterNavLink" to="/products" className="nav-link text-white">Mercancía</Link>
                        </li>
                    
    
    


                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;