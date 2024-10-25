import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';  // Assuming the relative path to the logo file
import { useSelector, useDispatch } from 'react-redux';
import { LogoutBtn } from '../index.js'

function NavbarMini() {
    const dispatch = useDispatch()
    const userStatus = useSelector(state => state.user.status)

    return (
        <div className="w-full h-[10vh] bg-black text-white flex justify-around items-center">
            <div>
                {/* <img src={logo} alt="Logo" className='w-20 cursor-pointer' /> */}
                <NavLink to="/" >
                    <p className='text-3xl text-[#ffffff] '>Ukk<span className='text-pink-500'>.</span> </p>
                </NavLink>
            </div>
            <div className='text-xl flex gap-8 '>
                <NavLink to="./" className={({ isActive }) => (`${isActive ? 'text-[#d04646] ' : 'text-white'}`)}>Home</NavLink>
                <NavLink to="/addpost" className={({ isActive }) => (`${isActive ? 'text-[#d04646]' : 'text-white'}`)}>Add Post</NavLink>
                <NavLink to="/yourposts" className={({ isActive }) => (`${isActive ? 'text-[#d04646]' : 'text-white'}`)}>Your Posts</NavLink>
                {/* <NavLink to="/github" className={({ isActive }) => (`${isActive ? 'text-[#d04646]' : 'text-white'}`)}>Github</NavLink> */}
            </div>
            <div className='w-44'>
                {
                    userStatus ?
                    (
                        <LogoutBtn />
                    ) :
                    (
                        <div className='flex gap-4'>
                            <NavLink to='/login'><button className='px-4 py-[0.3rem] font-bold bg-[#d04646] rounded-full text-center hover:bg-[#ee6e6e] transition-all duration-300 active:scale-[97%] ' >Login</button></NavLink>
                            <NavLink to='/signin' ><button className='px-4 py-[0.3rem] font-bold bg-[#d04646] rounded-full text-center hover:bg-[#ee6e6e] transition-all duration-300 active:scale-[97%] ' >Signin</button></NavLink>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default NavbarMini;

