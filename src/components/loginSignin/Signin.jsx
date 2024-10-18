import React from 'react'
import { getCodes } from '../../assets/phoneCodes.js'
import { useNavigate } from 'react-router'
import transition from '../../Transition.jsx'

function Signin() {
    const phoneCodes = getCodes()
    const navigate = useNavigate()
    const handleFormSubmit = (e) => {
        e.preventDefault()
        navigate('/verifyEmail')
    }
    return (
        <div className='h-[90vh] bg-black text-white flex flex-col items-center'>
            <h1 className='text-5xl text-[#ffffff] mt-8'>SIGN IN</h1>
            <form action="" onSubmit={handleFormSubmit} className='w-[30%] bg-[#0a0a0a] rounded-lg  mt-10 p-5 flex flex-col items-center gap-7'>
                <div className="name flex w-full justify-between ">
                    <label htmlFor="firstnameInput" className='w-full'>
                        <p className = 'px-2 '  >username<span className='text-red-500'>*</span></p>
                        <input type="text" required id = 'firstnameInput' placeholder='Enter first name' className = 'border border-gray-300 w-full  px-4 py-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]' />
                    </label>
                    {/* <label htmlFor="lastnameInput" className='w-[48%]'>
                        <p className = 'px-2 '  >Last Name <span className='text-red-500'>*</span></p>
                        <input type="text" required id = 'lastnameInput' placeholder='Enter last name' className = 'border border-gray-300 w-full px-4 py-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]' />
                    </label> */}
                </div>
                <div className="email w-full" >
                    <label htmlFor="emailInput">
                        <p className = 'px-2 ' >Email<span className='text-red-500'>*</span></p>
                        <input type="text" required id = 'emailInput' placeholder='Enter Email ID' className = 'border border-gray-300 w-[100%] px-4 py-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]' />
                    </label>
                </div>
                {/* <div className="phone w-[100%]">
                    <label htmlFor="phoneInput">
                        <p className = 'text-xl px-2 ' >Phone Number<span className='text-red-500'>*</span></p>
                        <select 
                            id='phoneCode' 
                            className='border border-gray-300 w-[16%] pl-2  py-2 mt-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]'>
                            {phoneCodes.map((code) => (
                                <option 
                                    key={code.code} 
                                    value={`+${code.code}`} 
                                    selected={code.country === 'India'}>
                                    + {code.code}&nbsp;&nbsp;{code.country}
                                </option>
                            ))}
                        </select>

                        <input type="text" id='phoneInput' placeholder='Enter phone number here' className = 'border border-gray-300 ml-[5%] w-[75%] px-4 py-2 mt-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]' />
                    </label>
                </div> */}

                <div className="password flex w-[100%] justify-between">
                    <label htmlFor="createPasswordInput" className='w-[49%]'>
                        <p className = 'px-2 ' >Create Password<span className='text-red-500'>*</span></p>
                        <input type="text" required placeholder='Create Password' id = 'createPasswordInput' className = 'border border-gray-300 w-[100%] px-4 py-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]' />
                    </label>
                    <label htmlFor="conformPasswordInput" className='w-[48%]'>
                        <p className = 'px-2 ' >Confirm Password<span className='text-red-500'>*</span></p>
                        <input type="text" required placeholder='Coform Password' id = 'conformPasswordInput' className = 'border border-gray-300 w-[100%] px-4 py-2 rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E9A6A6]' />
                    </label>
                </div>


                <button type='submit' 
                    className='w-full mt-3 py-2 bg-pink-500 border border-[#ca8383] rounded text-white hover:bg-pink-600 transition-all duration-300 active:scale-[99%]  '
                >Create Account</button>
            </form>
        </div>
    )
}

export default transition(Signin)
