import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/features/userSlice';
import authService from '../../appwrite/auth.appwrite';
import toast from 'react-hot-toast';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const toastId = toast.loading('Logging out...');
        try {
            await authService.logout();
            dispatch(logout());
            toast.success('Logged out successfully!', { id: toastId });
            navigate('/');
        } catch (error) {
            console.error('Error while logging out:', error.message || error);
            toast.error('Error while logging out', {id: toastId});
        }
    };

    return (
        <div className='flex justify-center items-center'>
            <button
                onClick={logoutHandler}
                className='px-4 py-[0.4rem] font-bold bg-blue-500 rounded-xl text-center hover:bg-blue-600 transition-all duration-300 active:scale-[97%]'
            >
                Logout
            </button>
        </div>
    );
}

export default LogoutBtn;
