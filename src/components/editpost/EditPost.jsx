import React, { useEffect, useState, useRef } from 'react';
import appwriteService from '../../appwrite/services.appwrite';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

function EditPost() {
    const [image, setImage] = useState('https://external-preview.redd.it/C8y9MxMJvxrsT25CAe_i7wxgvouUPbsXmkmtxFagn2Y.jpg?width=1080&crop=smart&auto=webp&s=dc50fabc132c0ca61f9840327f06337d485ce596');
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);
    const fileInputRef = useRef();
    const { postId } = useParams();
    const location = useLocation();
    const post = location.state?.post;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        console.log("Handle submit called");
        const toastId = toast.loading('Editing post...');
        try {
            const file = fileInputRef.current.files[0];
            const responseFromEditPost = await appwriteService.editPost(file, title, caption, userData, post);
            toast.success('Post edited successfully', { id: toastId });
            navigate('/');
        } 
        catch (error) {
            console.log("Error while editing post:", error.message);
            toast.error('Error while editing post', { id: toastId });
        }
    };

    useEffect(() => {
        if (post) {
            setImage(`https://cloud.appwrite.io/v1/storage/buckets/6717c268001482f65ec3/files/${post.image}/view?project=6712a4c3000a0978102b&mode=admin`);
            setTitle(post.heading);
            setCaption(post.caption);
        }
    }, [post]);

    return (
        <div className='min-h-[90vh] bg-black text-white flex flex-col justify-center items-center p-6'>
            <div className='w-full space-y-4 flex max-w-7xl justify-center gap-10'>
                <div className='w-64 my-auto'>
                    <div className='mb-4 mx-auto relative flex justify-center items-center'>
                        <img src={image} alt="Uploaded Preview" className='w-full h-auto rounded-lg' />
                    </div>
                </div>

                <div className='w-[30rem]'>
                    <label className='block text-lg font-medium mb-2'>
                        Upload the image
                    </label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="image"
                        accept="image/*"
                        className='block w-full mt-2 text-gray-400 bg-gray-800 border border-gray-600 rounded-lg p-2 cursor-pointer focus:outline-none'
                        onChange={handleImageUpload}
                    />

                    <label className='block text-lg font-medium mb-2 mt-4'>
                        Enter the title
                    </label>
                    <input
                        type="text"
                        placeholder='Enter the title'
                        className='block w-full mt-2 text-gray-900 bg-gray-200 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className='block text-lg font-medium mb-2 mt-4'>
                        Enter the caption
                    </label>
                    <textarea
                        placeholder='Enter the caption'
                        className='block w-full mt-2 h-32 text-gray-900 bg-gray-200 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />

                    <div>
                        <button
                            className='bg-blue-500 w-full text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform transition-transform duration-150 active:scale-95'
                            onClick={handleSubmit}>
                            Edit Post
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPost;
