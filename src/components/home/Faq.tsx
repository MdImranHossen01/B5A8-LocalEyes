// G:\Level 2\Milestone 8\localeyes\src\components\home\Faq.tsx
"use client";
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import faqAnimation from './faq-animation.json';

const faqData = [
    {
        question: "How do I book a tour package?",
        answer: "Booking a tour is easy! Simply navigate to the package you're interested in, fill out the booking form with your desired date and selected guide, and click 'Book Now'. You will then be guided to the payment process."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards through our secure payment gateway, powered by Stripe. Your payment information is always encrypted and safe with us."
    },
    {
        question: "Can I customize a tour package?",
        answer: "Absolutely! While we offer curated packages, we understand that every traveller is unique. Please contact our support team with your requirements, and we will be happy to create a custom itinerary for you."
    },
    {
        question: "What is your cancellation policy?",
        answer: "You can cancel any booking with a 'Pending' status directly from your dashboard for a full refund. For bookings that are 'In Review' or 'Accepted', please contact our support team to inquire about cancellation options."
    }
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-12 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Frequently Asked <span className='text-primary'>Questions</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions? We&apos;ve got answers. Here are some of the most common queries from our travellers.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Accordion Section */}
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div 
                                key={index} 
                                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
                                >
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {faq.question}
                                    </span>
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                    )}
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Lottie Animation Section */}
                    <div className="lg:pl-8">
                        <div >
                            <Lottie 
                                animationData={faqAnimation} 
                                loop={true}
                                className="w-full h-auto"
                            />
                        </div>
                     
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;