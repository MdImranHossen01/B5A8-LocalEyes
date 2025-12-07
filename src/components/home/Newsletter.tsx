// G:\Level 2\Milestone 8\localeyes\src\components\home\Newsletter.tsx
"use client";
import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="bg-primary text-white py-12 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-100">
                    Get the latest travel deals, tour packages, and destination inspiration delivered straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-6 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                        required
                    />
                    <button 
                        type="submit" 
                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        Subscribe <FaPaperPlane className="w-4 h-4" />
                    </button>
                </form>
                
            </div>
        </div>
    );
};

export default Newsletter;