import React, { useEffect, useState } from 'react';
import transition from '../../Transition';
import { Postcard } from '../index.js';
import appwriteService from '../../appwrite/services.appwrite.js';
import { bucketId, projectId } from '../../../env.config.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userStatus = useSelector((state) => state.user.status); 
    const isLoggedIn = userStatus;
    const navigate = useNavigate();

    useEffect(() => {
        // If the user is not logged in, set an error and skip fetching posts
        if (!isLoggedIn) {
            setError("User not logged in");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const allPosts = await appwriteService.fetchAllPosts();
                setPosts(allPosts);
                setError(null);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return (
            <div className='min-h-[90vh] bg-black flex items-center justify-center'>
                <h1 className='text-7xl font-bold text-white'>Login to see the posts</h1>
            </div>
        );
    }

    return (
        <div className='min-h-[90vh] bg-[#0a0a0a] text-white w-full pb-10 pt-5'>
            <div className='w-full max-w-[60rem] mx-auto py-[1.5rem] flex flex-wrap justify-center gap-5'>
                {loading ? (
                    <p className='text-3xl'>Loading posts...</p>
                ) : error ? (
                    <p className='text-3xl text-red-500'>{error}</p>
                ) : posts.length > 0 ? (
                    posts.map((post) => {
                        const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${post.image}/view?project=${projectId}&mode=admin`;
                        return (
                            <NavLink key={post.$id} to={`posts/${post.$id}`}>
                                <Postcard
                                    src={imageUrl}
                                    title={post.heading}
                                />
                            </NavLink>
                        );
                    })
                ) : (
                    <p className='text-3xl font-bold'>No posts available</p>
                )}
            </div>
        </div>
    );
}

export default transition(Home);
