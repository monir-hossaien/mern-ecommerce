import React from "react";
import { userStore } from "../../store/userStore.js";
import {Navigate, Outlet} from "react-router";
import cookies from "js-cookie";

const PrivateRoutes = () => {
    const isLogin = cookies.get('token');
    return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
