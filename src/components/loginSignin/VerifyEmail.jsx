import React from 'react';

function VerifyEmail() {
    return (
        <div className="min-h-[90vh] bg-black flex items-center justify-center text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl mb-6 text-center">Verify your email</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 mb-4 bg-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
                >
                    Verify Email
                </button>
            </div>
        </div>
    );
}

export default VerifyEmail;
