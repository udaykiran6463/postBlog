import React, { useEffect, useState } from 'react';
import transition from '../../Transition';
import { useLoaderData } from 'react-router-dom'; // Correct import
import { useDispatch } from 'react-redux';

function Github() {
    const dataUday = useLoaderData();
    console.log(dataUday);

    const [data, setData] = useState(dataUday);
    const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode

    // Effect to update data when loader data changes
    useEffect(() => {
        setData(dataUday);
    }, [dataUday]);

    // Check if data is not loaded yet
    if (!data) return <div>Loading...</div>;

    // Date and other fields processing
    const dateObj = new Date(data.created_at);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = `Joined ${dateObj.toLocaleDateString('en-GB', options)}`;
    
    const gitUrl = data?.url?.substring(12, 35) || "Not Available";
    const gitCompany = data?.company?.substring(0, 25) || "Not Available";
    const twitter_id = data?.twitter_username || "Not Available";
    const location = data?.location || "Not Available";

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-[90vh] flex flex-col items-center ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f0f0f0]'} text-white`}>
            <div className='flex w-[44rem] justify-between py-2 mt-10'>
                <h1 className={`text-2xl mb-4 ${isDarkMode ? 'text-white': 'text-black'}`}>Dev Find <span className='text-pink-500'>_</span></h1>
                <button
                    onClick={toggleDarkMode}
                    className={`px-4 py-2 w-20 rounded-full font-bold mb-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
                >
                    {isDarkMode ? '☼' : '☾'}
                </button>
            </div>

            <div className={`w-[44rem] h-[30rem] rounded-lg ${isDarkMode ? 'shadow-lg text-white bg-[#181C14]' : 'shadow-md text-black bg-[#FFE1FF]'}`}>
                <div className={`box1 flex px-10 py-5 ${isDarkMode ? 'bg-purple-600' : 'bg-[#7E60BF]'}`}>
                    <div className=''>
                        <img src={data.avatar_url} className='w-[10rem] rounded-full' alt="Profile" />
                    </div>
                    <div className='pl-10'>
                        <div className='flex justify-between text-lg'>
                            <h1 className='text-3xl font-bold'>{data.name}</h1>
                            <h1>{formattedDate}</h1>
                        </div>
                        <p className='text-blue-800 text-[18px] font-semibold cursor-pointer'>@{data.login}</p>
                        <p className='mt-3'>{data.bio}</p>
                    </div>
                </div>

                <div className="box2 flex my-5 bg-black w-[30rem] justify-around mx-auto py-5 text-lg rounded-lg text-white">
                    <div>
                        <p>Repos</p>
                        <p className='text-3xl'>{data.public_repos}</p>
                    </div>
                    <div>
                        <p>Followers</p>
                        <p className='text-3xl'>{data.followers}</p>
                    </div>
                    <div>
                        <p>Following</p>
                        <p className='text-3xl'>{data.following}</p>
                    </div>
                </div>

                <div className={`box3 bg-gray-800 mx-10 flex flex-wrap py-5 justify-center ${isDarkMode ? 'text-white bg-[#181C14]' : 'text-white bg-[#FFE1FF]'}`}>
                    <div className='w-[18rem] text-lg px-2 py-1'><span className='text-[1.3rem]'>⚲</span><span className='ml-3'>{location}</span></div>
                    <div className='w-[18rem] text-lg px-2 py-1'><span className='text-[1.3rem]'>🔗</span><span className='ml-3'>{gitUrl}..</span></div>
                    <div className='w-[18rem] text-lg px-2 py-1'><span className='text-[1.3rem]'>🇽</span><span className='ml-3'>{twitter_id}</span></div>
                    <div className='w-[18rem] text-lg px-2 py-1'><span className='text-[1.3rem]'>🏬</span><span className='ml-3'>{gitCompany}...</span></div>
                </div>
            </div>
        </div>
    );
}

export default transition(Github);


