import React from 'react'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { NavLink, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout} from '../../action';

/**
* @author
* @function Header
**/

export const Header = (props) => {
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const logoutFunc=()=>{
        dispatch(logout());
    }

    return (
        // <Container>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
                <Container>
                    {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                    <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
                        </Nav>
                        <Nav>
                            {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
                            {
                                auth?.authenticate ?
                                    <>
                                        {/* <li className="nav-item">
                                            <NavLink to="/Signup" className="nav-link">Signup</NavLink>
                                        </li> */}
                                        <li className="nav-item">
                                            <NavLink to="/Signin" className="nav-link" onClick={logoutFunc}>Log out</NavLink>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/Signin" className="nav-link" >Signin</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/Signup" className="nav-link">Signup</NavLink>
                                        </li>
                                    </>
                            }



                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        // </Container>
    )

}

export default Header