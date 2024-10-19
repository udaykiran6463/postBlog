import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // Correct import
import { NavbarMini } from '../index.js';
import { useDispatch } from 'react-redux';
import { login } from '../../store/features/userSlice';
import authService from '../../appwrite/auth.appwrite.js';

function Layout() {
    const dispatch = useDispatch();

    const checkUserStatus = async () => {
        try {
            const user = authService.getUserDetailsFromLocalStorage()
            console.log(user);
            if (user) {
                dispatch(login(user));
            }
        } 
        catch (error) {
            console.error("Error while checking user status:", error);
        }
    };

    useEffect(() => {
        checkUserStatus();
    }, []);

    return (
        <div>
            <NavbarMini />
            <Outlet />
        </div>
    );
}

export default Layout;
