import React from 'react';
import bladerunner from './bladdrunnder_2049.jpg';

function Postcard({src, title}) {
    
    function getRandomDarkPastelColor() {
        const randomHex = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomHex.padStart(6, '0')}`;
    }

    const textColor = getRandomDarkPastelColor();

    return (
        <div className='relative cursor-pointer w-[17rem] h-[18rem] rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-300 active:scale-[95%] group'>
            <img 
                src={src} 
                alt="src" 
                className="w-full h-full object-cover grayscale transition-transform duration-300 transform group-hover:scale-110 group-hover:grayscale-0" 
            />
            <div className='absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-opacity duration-300' />
            <h1
                className="text-4xl absolute bottom-3 left-3 text-shadow-lg transition duration-300 transform group-hover:text-white"
                style={{ color: textColor }} // Using inline styles for dynamic color
            >
                <div className='h-[0.1px] text-white bg-white'></div>
                {title.length > 12 ? title.slice(0, 12) + '...' : title}
            </h1>
        </div>
    );
}

export default Postcard;
