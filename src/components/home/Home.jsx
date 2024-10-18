import React from 'react'
import transition from '../../Transition'

function Home() {
    return (
        <div className='h-[90vh] bg-[#0a0a0a] flex items-center justify-center'>
            <h1 className='text-8xl text-[#ffffff] font-bold text-center'>Home Page</h1>
        </div>
    )
}

export default transition(Home)
