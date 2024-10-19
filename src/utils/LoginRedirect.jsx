import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'; 

function LoginRedirect({ children }) {
    const status = useSelector((state) => state.user.status);
    return status ? <Navigate to="/" /> : <Outlet/>;
}

export default LoginRedirect;
