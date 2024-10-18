import React from 'react';
import { NavLink } from 'react-router-dom';
import transition from '../../Transition';

function Login() {
    return (
        <div className='h-[90vh] bg-black text-white flex flex-col items-center'>
            <h1 className='text-[#ffffff] text-5xl mt-10'>LOGIN</h1>
            <form action="" className='text-white w-[30%] h-auto mt-10 bg-[#0a0a0a] rounded-lg shadow-lg flex flex-col items-center p-10'>
                <label htmlFor="emailInput" className='w-full mb-4'>
                    <p className='text-xl px-2'>Email Address<span className='text-red-500'>*</span></p>
                    <input 
                        type="email" 
                        id="emailInput" 
                        placeholder='Enter Email ID' 
                        className='w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9A6A6] focus:border-transparent' 
                    />
                </label>

                <label htmlFor="passwordInput" className='w-full mb-4'>
                    <p className='text-xl px-2'>Password<span className='text-red-500'>*</span></p>
                    <input 
                        type="password" 
                        id="passwordInput" 
                        placeholder='Enter Password' 
                        className='w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9A6A6] focus:border-transparent' 
                    />
                    <NavLink to="/forgotPasswordEmail" ><p className='w-full text-blue-500 text-end mt-[3px] cursor-pointer'>Forgot Password?</p> </NavLink>
                </label>

                <div className='w-full'>
                    <button 
                        type="submit" 
                        className='w-full  bg-pink-500 text-white text-lg py-2 rounded-md hover:bg-pink-600 transition-all duration-300 active:scale-[99%]'>
                        Sign In
                    </button>
                    <NavLink to="/signin"><p className='w-full text-emerald-500 mt-2 cursor-pointer'>Not a member yet?</p></NavLink>
                </div>
            </form>
        </div>
    );
}

export default transition(Login);
