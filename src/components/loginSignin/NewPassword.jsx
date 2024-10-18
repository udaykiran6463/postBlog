import React, { useState } from 'react';
import transition from '../../Transition';
import { NavLink } from 'react-router-dom';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValid, setIsValid] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
        minLength: false,
    });

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Validate password
        setIsValid({
            lowercase: /[a-z]/.test(newPassword),
            uppercase: /[A-Z]/.test(newPassword),
            number: /\d/.test(newPassword),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
            minLength: newPassword.length >= 8,
        });
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const isFormValid = () => {
        return (
            password === confirmPassword &&
            isValid.lowercase &&
            isValid.uppercase &&
            isValid.number &&
            isValid.specialChar &&
            isValid.minLength
        );
    };

    return (
        <div className='h-[90vh] flex bg-[#000000]'>
            <div className="bg-black text-white p-8 max-w-md mx-auto mt-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-pink-500">Choose New Password</h2>
                <p className="text-gray-400 mb-6">
                    Almost done. Enter your new password and you're all set.
                </p>

                <form>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium">
                            New password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="newPassword"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
                            Confirm new password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            required
                        />
                    </div>

                    <div className="mt-10 text-sm text-gray-400 mb-4">
                        <ul className='flex flex-col flex-wrap h-20'>
                            <li className={`mb-1 ${isValid.lowercase ? 'text-green-400' : ''}`}>
                                ✓ one lowercase character
                            </li>
                            <li className={`mb-1 ${isValid.uppercase ? 'text-green-400' : ''}`}>
                                ✓ one uppercase character
                            </li>
                            <li className={`mb-1 ${isValid.number ? 'text-green-400' : ''}`}>
                                ✓ one number
                            </li>
                            <li className={`mb-1 ${isValid.specialChar ? 'text-green-400' : ''}`}>
                                ✓ one special character
                            </li>
                            <li className={`mb-1 ${isValid.minLength ? 'text-green-400' : ''}`}>
                                ✓ 8 character minimum
                            </li>
                        </ul>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-md bg-pink-500 text-black font-semibold hover:bg-pink-600 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={!isFormValid()}
                    >
                        Reset Password
                    </button>
                </form>

                <div className="text-center mt-6">
                    <NavLink href="/login" className="text-gray-400 hover:text-pink-500">
                        ← Back to login
                    </NavLink>
                </div>
            </div>
        </div>
        
    );
};

export default transition(NewPassword);
