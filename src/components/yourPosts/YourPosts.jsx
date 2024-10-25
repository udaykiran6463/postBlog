import React, { useEffect, useState } from 'react';
import transition from '../../Transition';
import { useDispatch, useSelector } from 'react-redux';
import appwriteService from '../../appwrite/services.appwrite';
import { Postcard } from '../index.js';
import { NavLink } from 'react-router-dom';

function YourPosts() {
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.user.userData);

    useEffect(() => {
        const getUser = async () => {
            try {
                setUser(userDetails);

                if (userDetails?.$id) {
                    const fetchUserDocuments = await appwriteService.fetchUserDocuments(userDetails.$id);
                    setUserPosts(fetchUserDocuments?.documents || []);
                }
            } catch (error) {
                console.log("Error while fetching user:", error.message);
            }
        };

        if (userDetails) {
            getUser();
        }
    }, [userDetails]);

    return (
        <div className='h-[90vh] bg-[#0a0a0a] flex items-center justify-center'>
            {
                userPosts.length === 0 ? (
                    <div className='text-white text-7xl font-bold '>No posts found</div>
                ) : (
                    <div className='w-full max-w-[60rem] mx-auto py-[1.5rem] flex flex-wrap justify-center gap-5'>
                        {userPosts.map((post) => {
                            const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/6717c268001482f65ec3/files/${post.image}/view?project=6712a4c3000a0978102b&mode=admin`;
                            return (
                                <NavLink key={post.$id} to={`/posts/${post.$id}`}>
                                    <Postcard
                                        src={imageUrl}
                                        title={post.heading}
                                    />
                                </NavLink>
                            );
                        })}
                    </div>
                )
            }
        </div>
    );
}

export default transition(YourPosts);
