import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import Layout from './components/Layout/Layout.jsx';
import { AddPost, YourPosts, Home, Login, Signin, VerifyEmailOTP, ForgotPasswordEmail, NewPassword, Post } from './components/index.js';
import { store } from "./store/store.js";
import PrivateRoute from './utils/PriviteRoute.jsx';
import LoginRedirect from './utils/LoginRedirect.jsx';
import { EmailVerified } from './components/index.js';
import { VerifyEmail } from './components/index.js';
import { EmailVerificationPage } from './components/index.js';
import EditPost from './components/editpost/EditPost.jsx';







const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='EmailVerificationPage' element={<EmailVerificationPage />} />
            <Route path='EmailVerified' element={<EmailVerified />} />
            <Route path='VerifyEmail' element={<VerifyEmail />} />

            <Route element={<LoginRedirect />} >
                <Route path='login' element={<Login />} />
                <Route path='signin' element={<Signin />} />
                <Route path='verifyEmail' element={<VerifyEmailOTP />} />
            </Route>

            <Route path='posts' element={<Post/>} />
            {/* <Route element={<PrivateRoute />}> */}
                <Route path='posts/:postId' element={<Post/>} />
                <Route path='forgotPasswordEmail' element={<ForgotPasswordEmail />} />
                <Route path='addpost' element={<AddPost />} />
                <Route path='newPassword' element={<NewPassword />} />
                <Route path='yourposts' element={<YourPosts />} />
                <Route path='editpost/:postId' element={<EditPost />} />
            {/* </Route> */}
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />
        </Provider>
    </StrictMode>
);
