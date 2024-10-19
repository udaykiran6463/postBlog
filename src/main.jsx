import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import './index.css';
import Layout from './components/Layout/Layout.jsx';
import { About, Contact, Home, Login, Signin, VerifyEmailOTP, ForgotPasswordEmail, NewPassword } from './components/index.js';
import { store } from "./store/store.js";
import PrivateRoute from './utils/PriviteRoute.jsx';
import authService from './appwrite/auth.appwrite.js';
import { login } from './store/features/userSlice.js';
import LoginRedirect from './utils/LoginRedirect.jsx';
import Github from './components/github/Github.jsx';
import { githubInfoLoader } from './components/github/Github.jsx';





const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='About' element={<About />} />

            <Route element={<LoginRedirect/>} >
                <Route path='login' element={<Login />} />
                <Route path='signin' element={<Signin />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path='verifyEmail' element={<VerifyEmailOTP />} />
                <Route path='forgotPasswordEmail' element={<ForgotPasswordEmail />} />
                <Route path='newPassword' element={<NewPassword />} />
                <Route loader={githubInfoLoader} path='Github' element={<Github />} />
                <Route path='contact' element={<Contact />} />
            </Route>
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster /> {/* Toaster component to display toast notifications */}
        </Provider>
    </StrictMode>
);
