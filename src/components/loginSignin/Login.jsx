import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import transition from '../../Transition';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.appwrite';
import { login } from '../../store/features/userSlice';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!email || !password) {
            toast.error('Please fill in both fields.');
            return;
        }

        // Invalid `password` param: Password must be between 8 and 256 characters long.
        if (password.length < 8 || password.length > 256) {
            toast.error('Password must be 8-256 characters.');
            return;
        }
        
        // Show loading toast
        const toastId = toast.loading('Logging in...');

        try {
            console.log(email, password);
            const userSession = await authService.login({ email, password });
            dispatch(login(userSession));
            console.log(userSession);
            navigate('/'); 
            toast.success('Logged in successfully!', { id: toastId });
        } catch (error) {
            toast.error(`${error.message}`, { id: toastId });
            console.error("Error while logging in:", error);
        }
    };

    return (
        <div className='min-h-[90vh] bg-black text-white flex flex-col items-center'>
            <h1 className='text-[#ffffff] text-5xl mt-10'>LOGIN</h1>
            <form onSubmit={handleSubmit} className='text-white w-[30rem] h-auto mt-10 bg-[#0a0a0a] rounded-lg shadow-lg flex flex-col items-center p-10'>
                {/* Email Input */}
                <label htmlFor="emailInput" className='w-full mb-4'>
                    <p className='text-xl px-2'>Email Address<span className='text-red-500'>*</span></p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" 
                        id="emailInput" 
                        required
                        placeholder='Enter Email ID' 
                        className='w-full text-black mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9A6A6] focus:border-transparent' 
                    />
                </label>

                {/* Password Input */}
                <label htmlFor="passwordInput" className='w-full mb-4'>
                    <p className='text-xl px-2'>Password<span className='text-red-500'>*</span></p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        id="passwordInput" 
                        required
                        placeholder='Enter Password' 
                        className='w-full mt-2 px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9A6A6] focus:border-transparent' 
                    />
                    <NavLink to="/forgotPasswordEmail">
                        <p className='w-full text-blue-500 text-end mt-[3px] cursor-pointer'>Forgot Password?</p>
                    </NavLink>
                </label>

                {/* Login Button */}
                <button
                    type="submit"
                    className='w-full bg-pink-500 text-white text-lg py-2 rounded-md hover:bg-pink-600 transition-all duration-300 active:scale-[99%]'>
                    Login
                </button>

                <div className='w-full mt-4'>
                    <NavLink to="/signin">
                        <p className='w-full text-emerald-500 cursor-pointer'>Not a member yet?</p>
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

export default transition(Login);
