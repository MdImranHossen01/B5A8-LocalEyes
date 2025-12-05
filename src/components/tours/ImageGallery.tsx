'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle empty images array
  const displayedImages = images && images.length > 0 
    ? images 
    : ['https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Tour+Image'];

  const mainImage = displayedImages[selectedImage];

  return (
    <>
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-64 lg:h-96">
              {mainImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={mainImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Tour Image</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {displayedImages.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-2 overflow-x-auto py-2">
                  {displayedImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`shrink-0 w-16 h-16 rounded-lg border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-white ring-2 ring-white' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <div className="relative w-full h-full rounded overflow-hidden">
                        <Image
                          src={image}
                          alt={`${title} ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {selectedImage + 1} / {displayedImages.length}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            ✕
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative max-w-5xl max-h-[85vh]">
              <Image
                src={mainImage}
                alt={title}
                width={1200}
                height={800}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 75vw"
              />
            </div>
          </div>

          {displayedImages.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 px-4" onClick={(e) => e.stopPropagation()}>
              {displayedImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-12 h-12 rounded-lg border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-white ring-2 ring-white' 
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="relative w-full h-full rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={`${title} ${index + 1}`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}