import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
  <div>
     <Link href="/">
      <div className='flex items-center space-x-2'>
      <Image
        src='/localeyes-logo.png'        
        alt='Local Eyes Logo'
        width={100}
        height={100}
        className='w-8 h-8'
      />
      <h1 className='text-gray-700 text-2xl font-bold'>Local Eyes</h1>
    </div>
     </Link>
  </div>
  );
};

export default Logo;