'use client';

import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedImages = images.length > 0 ? images : ['/api/placeholder/800/600?text=Tour+Image'];

  const mainImage = displayedImages[selectedImage];

  return (
    <>
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Main Image */}
            <div className="aspect-w-16 aspect-h-9 lg:aspect-h-7">
              <img
                src={mainImage}
                alt={title}
                className="w-full h-64 lg:h-96 object-cover cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            {/* Thumbnails */}
            {displayedImages.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {displayedImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded border-2 ${
                        selectedImage === index ? 'border-white' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${title} ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {displayedImages.length}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>
            
            <div className="flex items-center justify-center">
              <img
                src={mainImage}
                alt={title}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>

            {displayedImages.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {displayedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-12 h-12 rounded border-2 ${
                      selectedImage === index ? 'border-white' : 'border-gray-600'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${title} ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}