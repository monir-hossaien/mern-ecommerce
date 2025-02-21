import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { productStore } from "../store/productStore.js";
import { userStore } from "../store/userStore.js";
import { cartStore } from "../store/cartStore.js";
import { wishStore } from "../store/wishStore.js";
import { errorToast, successToast } from "../Utility/helper.js";
import logo from "../assets/images/plainb-logo.svg";

const CustomNavbar = () => {
    const navigate = useNavigate();
    const { search, setSearch } = productStore();
    const { isLogin, logout, profile, getProfileDetails } = userStore();
    const { cartCount, getCartList } = cartStore();
    const { wishCount, getWishList } = wishStore();

    useEffect(() => {
        (async ()=>{
            if (isLogin()) {
                await getProfileDetails();
                await getCartList();
                await getWishList();
            }
        })()
    }, [isLogin, getProfileDetails]);

    const logoutHandler = async () => {
        const res = await logout();
        if (res?.status === "success") {
            successToast(res?.message);
            navigate("/");
        } else {
            errorToast(res?.message);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() !== "") {
            navigate(`/products-by-keyword/${search}`);
        }
    };

    return (
        <>
            <div className="container-fluid text-white p-2 bg-success">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-8">
                            <div className="d-flex align-items-center gap-3">
                                <span><i className="bi bi-envelope"></i> Support@PlanB.com</span>
                                <span><i className="bi bi-envelope"></i> 01774688159</span>
                            </div>
                        </div>

                        <div className="col-md-6 col-4">
                            <div className="float-lg-end">
                                <div className="d-flex gap-3 justify-content-end">
                                    <i className="bi bi-whatsapp"></i>
                                    <i className="bi bi-youtube"></i>
                                    <i className="bi bi-facebook"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
                <Container>
                    {/* Logo */}
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} alt="Logo" width="96px"/>
                    </Navbar.Brand>

                    {/*for mobile */}
                    <div className="d-flex gap-3 d-lg-none ms-5">
                        {/* Cart */}
                        <Nav.Link as={Link} to="/cart-list" className="position-relative">
                            <i className="bi bi-bag text-dark fs-5"></i>
                            {isLogin() && cartCount > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge bg-success">
                                    {cartCount}
                                </span>
                            )}
                        </Nav.Link>

                        {/* Wishlist Icon */}
                        <Nav.Link as={Link} to="/wish-list" className="position-relative">
                            <i className="bi bi-heart text-dark fs-5"></i>
                            {isLogin() && wishCount > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge bg-warning">
                                    {wishCount}
                                </span>
                            )}
                        </Nav.Link>
                    </div>

                    {/* Mobile Toggle */}
                    <Navbar.Toggle aria-controls="navbarNav" className="border-0 shadow-none"/>

                    {/* Navbar Collapse */}
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="me-auto ms-lg-5 d-md-flex gap-md-4">
                            <Nav.Link as={Link} to="/" className="fs-6">
                                <i className="bi bi-house"></i> Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/all-products" className="fs-6">
                                <i className="bi bi-bag"></i> Collection
                            </Nav.Link>
                        </Nav>

                        {/* Search Box */}
                        <Form className="d-flex me-lg-3 my-2" onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button type="submit" variant="outline-dark">
                                <i className="bi bi-search"></i>
                            </Button>
                        </Form>

                        {/* Icons for Cart, Wishlist, and Profile */}
                        <Nav className="d-lg-flex align-items-md-center gap-lg-3 ms-lg-5">
                            <div className="d-none d-lg-flex">
                                {/* Cart Icon */}
                                <Nav.Link as={Link} to="/cart-list" className="position-relative">
                                    <i className="bi bi-bag text-dark fs-5"></i>
                                    {isLogin() && cartCount > 0 && (
                                        <span
                                            className="position-absolute top-0 start-lg-100 translate-middle badge bg-success">
                                    {cartCount}
                                </span>
                                    )}
                                </Nav.Link>

                                {/* Wishlist Icon */}
                                <Nav.Link as={Link} to="/wish-list" className="position-relative">
                                    <i className="bi bi-heart text-dark fs-5"></i>
                                    {isLogin() && wishCount > 0 && (
                                        <span
                                            className="position-absolute top-0 start-lg-100 translate-middle badge bg-warning">
                                    {wishCount}
                                </span>
                                    )}
                                </Nav.Link>
                            </div>

                            {/* Profile / Login Dropdown */}
                            {isLogin() ? (
                                <NavDropdown
                                    title={
                                        <span className="d-flex align-items-center">
                                        <img src={profile?.user?.profileImage || "images/default-avatar.png"} alt="user"
                                             style={{width: "28px", height: "28px", borderRadius: "50%"}}/>
                                    </span>
                                    }
                                    id="basic-nav-dropdown"
                                    align="end"
                                >
                                    <NavDropdown.Item disabled>{profile?.name || "Guest"}</NavDropdown.Item>
                                    <NavDropdown.Item
                                        disabled>{profile?.user?.email || "guest@gmail.com"}</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/my-orders">My Orders</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>

                            ) : (
                                <Nav.Link as={Link} to="/login" className="fs-6">
                                    <i className="bi bi-person-fill me-1 fs-5"></i>Login
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default CustomNavbar;
