import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../../appwrite/services.appwrite.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

function Post() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        
        const getPost = async () => {
            try {
                const post = await appwriteService.fetchDataFromId(postId);
                setPost(post);
                // console.log(post);
            } catch (error) {
                console.log("Error while fetching post:", error.message);
            }
        };
        getPost();
    }, [postId]);

    const deletePostHandler = async () => {
        const deleteToastId = toast.loading("Deleting post...");
        try{
            const deletePostResponse = await appwriteService.deletePost(post);
            toast.success("Post deleted successfully.", { id: deleteToastId });
            navigate('/');
        }
        catch(error){
            toast.error("Error while deleting post.");
            console.log("Error while deleting post:", error.message);
            throw error;
        }
    }

    const userData = useSelector((state) => state.user.userData);
    
    const isOwner = userData?.$id === post?.user_id;

    const coverImageUrl = post ? `https://cloud.appwrite.io/v1/storage/buckets/6717c268001482f65ec3/files/${post.image}/view?project=6712a4c3000a0978102b&mode=admin` : '';

    return (
        <div className='min-h-[90vh] bg-gray-900 flex flex-col items-center  p-6'>
            <div className='bg-gray-800 relative rounded-lg shadow-lg mt-[5rem] max-w-md w-full'>
            {isOwner && (
                <div className=' absolute right-0 top-[-2.5rem] z-10'>
                    <button onClick={deletePostHandler} className='bg-red-500 text-white px-3 py-1 rounded-sm mr-5 '>Del</button>
                    <button onClick={()=>{
                        navigate(`/editpost/${postId}`,{state: {post}})
                    }} className='bg-green-500 text-white px-3 py-1 rounded-sm '>Edit</button>
                </div>
            )}
                {coverImageUrl && (
                    <img
                        src={coverImageUrl}
                        alt={post?.heading}
                        className='w-full h-64 object-cover'
                    />
                )}
                <div className='p-6'>
                    <h1 className='text-3xl font-bold text-rose-500 mb-2'>{post?.heading}</h1>
                    <p className='text-gray-300 mb-4'>{post?.caption}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;
