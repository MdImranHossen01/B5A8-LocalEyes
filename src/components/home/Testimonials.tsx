'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  tour: string;
  date: string;
}

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      location: 'From Canada',
      avatar: '/api/placeholder/80/80?text=SJ',
      rating: 5,
      comment: 'My guide Maria showed me parts of Barcelona I would never have found on my own. The tapas tour was incredible!',
      tour: 'Barcelona Food & Culture Tour',
      date: 'March 2024',
    },
    {
      id: '2',
      name: 'Michael Chen',
      location: 'From Australia',
      avatar: '/api/placeholder/80/80?text=MC',
      rating: 5,
      comment: 'Kenji-san made our Tokyo experience unforgettable. His knowledge of hidden temples and local cuisine was outstanding.',
      tour: 'Tokyo Hidden Gems Tour',
      date: 'February 2024',
    },
    {
      id: '3',
      name: 'Emma Williams',
      location: 'From UK',
      avatar: '/api/placeholder/80/80?text=EW',
      rating: 5,
      comment: 'Sophie brought Parisian art to life in a way no museum tour ever could. An absolutely magical experience!',
      tour: 'Paris Art Walk',
      date: 'January 2024',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Traveler Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from travelers who've explored with our guides
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Current Testimonial */}
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              {'★'.repeat(5).split('').map((star, index) => (
                <span key={index} className="text-yellow-400 text-2xl mx-1">
                  {star}
                </span>
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl font-light mb-8 leading-relaxed">
              "{testimonials[currentTestimonial].comment}"
            </blockquote>

            <div className="flex items-center justify-center mb-4">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="text-left">
                <div className="font-semibold text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-300">
                  {testimonials[currentTestimonial].location}
                </div>
              </div>
            </div>

            <div className="text-gray-400 text-sm">
              {testimonials[currentTestimonial].tour} • {testimonials[currentTestimonial].date}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? 'bg-white' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">10K+</div>
            <div className="text-gray-300">Happy Travelers</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">500+</div>
            <div className="text-gray-300">Local Guides</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">50+</div>
            <div className="text-gray-300">Countries</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">4.9</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}