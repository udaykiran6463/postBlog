import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import transition from '../../Transition'


function VerifyEmailOTP() {

    const[otp, setotp] = useState(new Array(6).fill())
    const handleChange = (element, index) => {
        if(isNaN(element.value)){
            return false
        }
        setotp([...otp.map((d, ind)=>( ind==index?element.value:d))])

        if(element.nextSibling && element.value ){
            element.nextSibling.focus();
        }
    }
    const handleKeyDown = (e,index) => {
        if(e.key == "Backspace" && !otp[index] && e.target.previousSibling){
            e.target.previousSibling.focus()
        }
    }

    return (
        <div className='h-[90vh] bg-[#000814] text-white flex flex-wrap justify-center'>
            <div className=' w-96 mt-28 h-80'>
                <h1 className='text-4xl  font-bold text-[#b26c6c]'>Verify Email</h1>
                <p className='mt-3 text-gray-400'>A Verification code has been sent to your email. Enter the code below</p>
                <div className='mt-5 flex justify-between  '>
                    {/* <input type="text" className='w-12 p-3 rounded text-black text-xl font-bold text-center'/> */}
                    {
                        otp.map((data,index)=>(
                            <input 
                                type="text"
                                className='w-12 p-3 rounded text-black text-xl font-bold text-center focus:outline-none focus:border-none focus:ring-2 focus:ring-[#e44747]'
                                name='otp'
                                maxLength= '1'
                                key= {index}
                                value={data}
                                onChange={(e)=>(handleChange(e.target,index))}
                                onFocus={e => e.target.select()}
                                onKeyDown={(e)=>(handleKeyDown(e,index))}
                            />
                        ))
                    }
                </div>
                <button className='mt-10 border border-[#e18d8d] w-full py-3 text-xl rounded text-white bg-[#c77e7e] hover:bg-[#da9595] transition-all duration-300 active:scale-[97%]    '>Verify Email</button>
                <div className='flex w-full justify-between mt-[8px] px-1'>
                    <NavLink to="/login">
                        <p className='text-white cursor-pointer ' ><span className='text-white transition-all duration-300  ' >←</span> Back to login</p>
                    </NavLink>
                        
                    <NavLink>
                        <p className='text-blue-300 cursor-pointer ' ><span className='transition-all duration-300  ' >↺</span> Resend Email</p>
                    </NavLink>
                        
                </div>
            </div>
        </div>
    )
}

export default transition(VerifyEmailOTP)
