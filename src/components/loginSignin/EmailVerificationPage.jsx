import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import authService from '../../appwrite/auth.appwrite';
import toast from 'react-hot-toast';
import { div, nav } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const userId = searchParams.get('userId');
        const secret = searchParams.get('secret');

        if (userId && secret) {
            authService.completeEmailVerification(userId, secret)
                .then(() => {
                    toast.success('Email verified successfully.');
                    navigate('/login');
                })
                .catch(error => {
                    console.error('Error during email verification:', error);
                    alert('Email verification failed.');
                });
        }
    }, [searchParams]);

    return (
        <div className=' min-h-[90vh] bg-black text-white flex flex-col items-center justify-center'>
            <h1 className='text-7xl font-bold' > Email Verification Page </h1>
        </div>
    )
};

export default EmailVerificationPage;
