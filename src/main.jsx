import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import { About, Contact, Github, Home, Login, Signin, VerifyEmailOTP, ForgotPasswordEmail, NewPassword } from './components/index.js'
import { githubInfoLoader } from './components/github/Github.jsx'
import { Provider } from 'react-redux'
import {store} from "./store/store.js"


const router = createBrowserRouter(
    createRoutesFromElements(
            <Route path='/' element = {<Layout/>} >
                <Route index element = {<Home/>}/>
                <Route path='About' element = {<About/>}/>
                <Route path='contact' element = {<Contact/>}/>
                <Route loader = {githubInfoLoader} path='Github' element = {<Github/>}/>
                <Route path='login' element = {<Login/>}/>
                <Route path='signin' element = {<Signin/>}/>
                <Route path='verifyEmail' element = {<VerifyEmailOTP/>}/>
                <Route path='forgotPasswordEmail' element = {<ForgotPasswordEmail/>}/>
                <Route path='newPassword' element = {<NewPassword/>}/>
            </Route>
    )
)


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
)
