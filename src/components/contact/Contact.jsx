import React from 'react'
import transition from '../../Transition'
import { useDispatch } from 'react-redux'

function Contact() {
    return (
        <div className='h-[90vh] bg-[#0a0a0a] flex items-center justify-center'>
            <h1 className='text-8xl text-[#efefef] font-bold text-center'>Contact Us</h1>
        </div>
    )
}

export default transition(Contact)
