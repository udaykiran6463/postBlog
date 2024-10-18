import React from 'react'
import transition from '../../Transition'
import { NavLink } from 'react-router-dom'

function ForgotPasswordEmail() {
    return (
        <div className='h-[90vh] bg-[#000000] text-white flex justify-center'>
            <div className=' w-[23%] mt-20'>
                <h1 className='text-4xl  font-bold text-pink-500'>Reset Your Password</h1>
                <p className='mt-3 text-gray-400'> Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
                <div className='mt-8'>
                    <p>Email Address <span className='text-[#b26c6c]'>*</span></p>
                    <input type="text" placeholder='Enter your Email Address' className='w-full mt-2 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9A6A6] focus:border-transparent' />
                </div>
                <NavLink to="/newPassword" >
                    <button className='mt-6 border border-[#e18d8d] w-full py-2 text-xl rounded text-white bg-pink-500 hover:bg-pink-600 transition-all duration-300 active:scale-[97%]    '>
                        Reset Password
                    </button>
                </NavLink>


                <NavLink to="/login">
                    <div className='flex w-full justify-between mt-[8px] px-1'>
                        <p className='text-white cursor-pointer ' ><span className='text-white transition-all duration-300  ' >←</span> Back to login</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default transition(ForgotPasswordEmail)
