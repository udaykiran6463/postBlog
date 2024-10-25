import React from 'react';
import { getCodes } from '../../assets/phoneCodes.js';
import { useNavigate } from 'react-router';
import transition from '../../Transition.jsx';
import { toast } from "react-hot-toast";
import {login} from "../../store/features/userSlice.js"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import authService from '../../appwrite/auth.appwrite.js';


function Signin() {
    const phoneCodes = getCodes();
    const navigate = useNavigate();

    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');  // Corrected here

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {  
            toast.error("Passwords do not match!");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address!");
            return;
        }
        const toastId = toast.loading('Creating account...');

        try {
            console.log(userName, email, password);
            const userRegisterd = await authService.createAccount({email, password, username:userName});

            // account already exists
            // send email verification
            // call for account creation
            // if account created then login automatcally
            // else show error
            await new Promise((resolve) => setTimeout(resolve, 10));
            toast.success('account created successfully', { id: toastId });
            navigate('/login');

        } catch (error) {
            toast.error(error.message, { id: toastId });
            console.error("Error while creating account:", error);
        }
    };

    return (
        <div className='min-h-[90vh] bg-black text-white flex flex-col items-center'>
            <h1 className='text-5xl text-[#ffffff] mt-8'>SIGN IN</h1>
            <form action="" onSubmit={handleFormSubmit} className='w-[30rem] bg-[#0a0a0a] rounded-lg mt-10 p-5 flex flex-col items-center gap-7'>
                <div className="name flex w-full justify-between ">
                    <label htmlFor="firstnameInput" className='w-full'>
                        <p className='px-2'>Username<span className='text-red-500'>*</span></p>
                        <input
                            type="text"
                            required
                            id='firstnameInput'
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder='Enter username'
                            className='border border-gray-300 w-full text-black px-4 py-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]'
                        />
                    </label>
                </div>

                <div className="email w-full">
                    <label htmlFor="emailInput">
                        <p className='px-2'>Email<span className='text-red-500'>*</span></p>
                        <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            id='emailInput'
                            placeholder='Enter Email ID'
                            className='border text-black border-gray-300 w-[100%] px-4 py-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]'
                        />
                    </label>
                </div>

                <div className="password flex w-[100%] justify-between">
                    <label htmlFor="createPasswordInput" className='w-[49%]'>
                        <p className='px-2'>Create Password<span className='text-red-500'>*</span></p>
                        <input
                            type="password" // Changed this to password input type for security
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Create Password'
                            id='createPasswordInput'
                            className='border text-black border-gray-300 w-[100%] px-4 py-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]'
                        />
                    </label>

                    <label htmlFor="confirmPasswordInput" className='w-[48%]'>
                        <p className='px-2'>Confirm Password<span className='text-red-500'>*</span></p>
                        <input
                            type="password" // Changed this to password input type for security
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder='Confirm Password'
                            id='confirmPasswordInput'
                            className='border text-black border-gray-300 w-[100%] px-4 py-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]'
                        />
                    </label>
                </div>

                <button
                    type='submit'
                    className='w-full mt-3 py-2 bg-pink-500 border border-[#ca8383] rounded text-white hover:bg-pink-600 transition-all duration-300 active:scale-[99%]'
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default transition(Signin);
