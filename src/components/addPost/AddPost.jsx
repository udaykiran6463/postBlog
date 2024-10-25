import React, { useState } from 'react';
import { useId } from 'react';
import appwriteService from '../../appwrite/services.appwrite';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function AddPost() {
    const id1 = useId();
    const id2 = useId();
    const id3 = useId();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);

    const [image, setImage] = useState('https://external-preview.redd.it/C8y9MxMJvxrsT25CAe_i7wxgvouUPbsXmkmtxFagn2Y.jpg?width=1080&crop=smart&auto=webp&s=dc50fabc132c0ca61f9840327f06337d485ce596');
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setIsUploaded(true);
        }
    };

    const handleSubmit = async() => {
        console.log("Handle sumbit called");
        const toastId = toast.loading('Adding post...');
        try {
            const file = document.getElementById(id1).files[0]
            const responseFromAddPost = await appwriteService.addPost(file, title, caption, userData);
            toast.success('Post added successfully', { id: toastId });
            navigate('/');
        } 
        catch (error) {
            console.log("Error while adding post:", error.message);
            toast.error('Error while adding post', { id: toastId });
        }
    };

    const [isUploaded, setIsUploaded] = useState(false);

    return (
        <div className='min-h-[90vh] bg-black text-white flex flex-col justify-center items-center p-6'>
            <div className='w-full space-y-4 flex max-w-7xl justify-center gap-10'>
                <div className='w-64 my-auto'>
                    <div className='mb-4 mx-auto relative flex justify-center items-center'>
                        <img src={image} alt="Uploaded Preview" className={`w-full h-auto rounded-lg ${isUploaded? 'opacity-100':'opacity-40' }`} />
                        {!isUploaded && (<div className='absolute top-[50%] text-3xl text-white'>Image</div>)}
                    </div>
                </div>

                <div className='w-[30rem]'>
                    <label htmlFor={id1} className='block text-lg font-medium mb-2'>
                        Upload the image
                    </label>
                    <input
                        type="file"
                        name="image"
                        id={id1}
                        accept="image/*"
                        className='block w-full mt-2 text-gray-400 bg-gray-800 border border-gray-600 rounded-lg p-2 cursor-pointer focus:outline-none'
                        onChange={handleImageUpload}
                    />

                    <label htmlFor={id2} className='block text-lg font-medium mb-2 mt-4'>
                        Enter the title
                    </label>
                    <input
                        type="text"
                        id={id2}
                        placeholder='Enter the title'
                        className='block w-full mt-2 text-gray-900 bg-gray-200 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor={id3} className='block text-lg font-medium mb-2 mt-4'>
                        Enter the caption
                    </label>
                    <textarea
                        id={id3}
                        placeholder='Enter the caption'
                        className='block w-full mt-2 h-32 text-gray-900 bg-gray-200 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />

                    <div>
                        <button
                            className='bg-blue-500 w-full text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform transition-transform duration-150 active:scale-95'
                            onClick={handleSubmit}>
                            Post
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPost;
