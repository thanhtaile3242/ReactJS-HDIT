import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
    const navigate = useNavigate();
    const account = useSelector((state) => state.user.account);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const handleLogin = () => {
        navigate("/login");
    };
    const handleRegister = () => {
        navigate("/register");
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className="navbar-brand">
                    Hoi Dan IT
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/admin" className="nav-link">
                            Admin
                        </NavLink>
                        <NavLink to="/users" className="nav-link">
                            User
                        </NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <button
                                    className="btn-login"
                                    onClick={() => {
                                        handleLogin();
                                    }}
                                >
                                    Log In
                                </button>
                                <button
                                    className="btn-signup"
                                    onClick={() => {
                                        handleRegister();
                                    }}
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <NavDropdown
                                title="Settings"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item>Log out</NavDropdown.Item>
                                <NavDropdown.Item>
                                    User Profile
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
