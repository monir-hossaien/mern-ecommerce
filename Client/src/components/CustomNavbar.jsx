import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { productStore } from "../store/productStore.js";
import { userStore } from "../store/userStore.js";
import { cartStore } from "../store/cartStore.js";
import { wishStore } from "../store/wishStore.js";
import { errorToast, successToast } from "../Utility/helper.js";
import logo from "../assets/images/plainb-logo.svg";
import {CgProfile} from "react-icons/cg";
import {IoBagCheck, IoHomeOutline} from "react-icons/io5";
import {TbLogout2} from "react-icons/tb";
import {FaShopify} from "react-icons/fa";
import cookies from "js-cookie";

const CustomNavbar = () => {
    const navigate = useNavigate();
    const { search, setSearch } = productStore();
    const { isLogin, logout, profile, getProfileDetails, getUserDetails, user } = userStore();
    const { cartCount, getCartList } = cartStore();
    const { wishCount, getWishList } = wishStore();

    useEffect(() => {
        (async ()=>{
            if (isLogin()) {
                await getProfileDetails();
                await getUserDetails();
                await getCartList();
                await getWishList();
            }
        })()
    }, [isLogin, getProfileDetails]);

    const logoutHandler =  () => {
        cookies.remove("token");
        successToast("Logout successful");
        navigate("/");

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
            <Navbar expand="lg" bg="white" variant="light" className="shadow-sm" sticky={"top"}>
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
                        <Nav className="me-auto ms-lg-5 d-md-flex gap-md-4 mt-2 mt-md-0">
                            <Nav.Link as={Link} to="/" className="fs-6">
                                <div className="d-flex align-items-center gap-1">
                                    <IoHomeOutline /> Home
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/all-products" className="fs-6">
                                <div className="d-flex  align-items-center gap-1">
                                    <FaShopify /> Collection
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/" className="fs-6">
                                About
                            </Nav.Link>
                            <Nav.Link as={Link} to="/" className="fs-6">
                                Contact
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
                                <>
                                    <NavDropdown
                                        className="d-none d-lg-block"
                                        title={
                                            <span className="d-flex align-items-center">
                                        <img className="border border-secondary-subtle" src={user?.profileImage || "images/default-avatar.png"} alt="user"
                                             style={{width: "28px", height: "28px", borderRadius: "50%"}}/>
                                    </span>
                                        }
                                        id="basic-nav-dropdown"
                                        align="end"
                                    >
                                        <NavDropdown.Item disabled>{profile?.name || "Guest"}</NavDropdown.Item>
                                        <NavDropdown.Item
                                            disabled>{user?.email || "guest@gmail.com"}</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item as={Link} to="/profile">
                                            <div className="d-flex align-items-center gap-1">
                                                <CgProfile/> Profile
                                            </div>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/my-orders">
                                            <div className="d-flex align-items-center gap-1">
                                                <IoBagCheck/> My Orders
                                            </div>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            <div className="d-flex  align-items-center gap-1">
                                                <TbLogout2/> Logout
                                            </div>
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    {/*mobile device*/}
                                    <Nav className="me-auto ms-lg-5 d-md-none d-lg-none gap-md-4">
                                        <Nav.Link as={Link} to="/profile" className="fs-6">
                                            <div className="d-flex align-items-center gap-1">
                                                <CgProfile /> Profile
                                            </div>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/my-orders" className="fs-6">
                                            <div className="d-flex align-items-center gap-1">
                                                <IoBagCheck /> My Orders
                                            </div>
                                        </Nav.Link>
                                        <Nav onClick={logoutHandler} className="fs-6">
                                            <div className="d-flex  align-items-center gap-1">
                                                <TbLogout2 /> Logout
                                            </div>
                                        </Nav>
                                    </Nav>
                                </>

                            ) : (
                                <Nav.Link as={Link} to="/login" className="fs-6">
                                    <div className="d-flex align-items-center gap-1">
                                        <i className="bi bi-person-fill fs-5"></i>Login
                                    </div>
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
