import { NavLink, Link } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'

import './style.css'

const Header = () => {
    return (
        <Navbar bg="light" variant="light" sticky="top" >
            <Container>
                <Navbar.Brand className='d-flex align-items-center'>
                    <Link to="/dashboard" className="navbar-brand">
                        <div className='d-flex align-items-center'>
                            {/* <img
                                src={images.logoHeader}
                                width="40"
                                height="40"
                                className="d-inline-block align-top me-3"
                                alt="React Bootstrap logo"
                            /> */}
                            {/* <p className='m-0 p-0'>Project Name</p> */}
                        </div>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-center">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">AI Psychologist</NavLink>
                        <NavLink to="/about-us" className="nav-link">About Us</NavLink>
                        <NavLink to="/psychiatrist" className="nav-link">Psychiatrist</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header