import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import ByBrandPage from "./pages/byBrandPage.jsx";
import ByCategoryPage from "./pages/byCategoryPage.jsx";
import ByKeywordPage from "./pages/byKeywordPage.jsx";
import ByRemarkPage from "./pages/byRemarkPage.jsx";
import ProductDetailsPage from "./pages/productDetailsPage.jsx";
import AllProducts from "./pages/all-products.jsx";
import LoginPage from "./pages/loginPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import OTPVerifyPage from "./pages/OTPVerifyPage.jsx";
import PrivateRoutes from "./components/layout/PrivateRoutes.jsx";
import CartPage from "./pages/cartPage.jsx";
import WishPage from "./pages/wishPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";
import InvoiceDetailsPage from "./pages/invoiceDetailsPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ScrollTopBtn from "./components/Button/ScrollTopBtn.jsx";


const ScrollToTopOnNavigation = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
};



const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTopOnNavigation/>
            <Routes>
                <Route  path="/" element={<HomePage/>} />
                <Route  path="/products-by-brand/:brandID" element={<ByBrandPage/>} />
                <Route  path="/products-by-category/:categoryID" element={<ByCategoryPage/>} />
                <Route  path="/product-by-remark/:remark" element={<ByRemarkPage/>} />
                <Route  path="/products-by-keyword/:keyword" element={<ByKeywordPage/>} />
                <Route  path="/product-details/:productID" element={<ProductDetailsPage/>} />
                <Route  path="/all-products" element={<AllProducts/>} />

                <Route  path="/login" element={<LoginPage/>} />
                <Route  path="/sign-up" element={<SignUpPage/>} />
                <Route  path="/otp-verify" element={<OTPVerifyPage/>} />
                <Route  path="*" element={<ErrorPage/>} />

                <Route element={<PrivateRoutes />}>
                    <Route  path="/cart-list" element={<CartPage />} />
                    <Route  path="/wish-list" element={<WishPage/>} />
                    <Route  path="/profile" element={<ProfilePage/>} />
                    <Route  path="/my-orders" element={<InvoicePage/>} />
                    <Route  path="/invoice-details/:invoiceID" element={<InvoiceDetailsPage/>} />
                </Route>
            </Routes>
            <ScrollTopBtn />
        </BrowserRouter>
    );
};

export default App;