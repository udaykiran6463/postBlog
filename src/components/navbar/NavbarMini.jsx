import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';  // Assuming the relative path to the logo file

function NavbarMini() {
    const[isLoggedIn,setIsLoggedIn] = useState(false)
    return (
        <div className="w-full h-[10vh] bg-black text-white flex justify-around items-center">
            <div>
                {/* <img src={logo} alt="Logo" className='w-20 cursor-pointer' /> */}
                <NavLink to="/" >
                    <p className='text-3xl text-[#ffffff] '>Ukk<span className='text-pink-500'>.</span> </p>
                </NavLink>
            </div>
            <div className = 'text-xl flex gap-8 '>
                <NavLink to="./" className={({isActive})=>(`${isActive?'text-[#d04646] ':'text-white' }`)}>Home</NavLink>
                <NavLink to="/about" className={({isActive})=>(`${isActive?'text-[#d04646]':'text-white' }`)}>About</NavLink>
                <NavLink to="/contact" className={({isActive})=>(`${isActive?'text-[#d04646]':'text-white' }`)}>Contact</NavLink>
                <NavLink to="/github" className={({isActive})=>(`${isActive?'text-[#d04646]':'text-white' }`)}>Github</NavLink>
            </div>
            <div className='w-44'>
            {
                isLoggedIn?
                (
                    <div className='flex justify-center items-center'>
                        <NavLink to = '/login'><button  className='px-4 py-[0.4rem] font-bold bg-blue-500 rounded-xl text-center hover:bg-blue-600 transition-all duration-300 active:scale-[97%] ' >Logout</button></NavLink>
                    </div>
                ):
                (
                    <div className='flex gap-4'>
                        <NavLink to = '/login'><button  className='px-4 py-[0.3rem] font-bold bg-[#d04646] rounded-full text-center hover:bg-[#ee6e6e] transition-all duration-300 active:scale-[97%] ' >Login</button></NavLink>
                        <NavLink to='/signin' ><button  className='px-4 py-[0.3rem] font-bold bg-[#d04646] rounded-full text-center hover:bg-[#ee6e6e] transition-all duration-300 active:scale-[97%] ' >Signin</button></NavLink>
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default NavbarMini;

