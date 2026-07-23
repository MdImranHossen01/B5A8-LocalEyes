import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <div className='flex items-center gap-0'>
          <Image
            src='/logo.webp'
            alt='Khulna Tours Logo'
            width={240}
            height={240}
            className='hidden w-14 h-9 sm:w-16 sm:h-11 object-contain'
          />
          <h1 className="flex items-baseline space-x-1.5 select-none">
            <span
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent text-lg sm:text-xl font-bold italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Khulna
            </span>
            <span
              className="text-gray-700 dark:text-gray-700 text-lg sm:text-xl font-bold italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tours & Travels
            </span>
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Logo;