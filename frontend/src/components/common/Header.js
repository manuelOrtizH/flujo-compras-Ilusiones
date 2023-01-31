import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
                    <Nav.Link >
                        <li className="nav-item ">
                            <Link to="/" className="nav-link text-white">Inicio</Link>
                        </li>
                    </Nav.Link>
                    <Nav.Link >
                        <li className="nav-item ">
                            <Link to="/warehouses" className="nav-link text-white">Almacenes</Link>
                        </li>
                    </Nav.Link>
                    <li className="nav-item text-white">
                        <NavDropdown className="text-white mt-2" title={<span className="text-white ">Mercancía</span>} id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <Link to="/inventaries" className="nav-link text-black">Inventarios</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link to="/orders" className="nav-link text-black">Órdenes de Compra</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link to="/receptions" className="nav-link text-black">Recepción de Mercancía</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>


                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;