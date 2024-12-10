'use client';

import { gsap } from 'gsap';

export default function Project_Right() {
  const handleCardClick = (e) => {
    const card = e.target.closest('.photo-card');
    const img = card.querySelector('img'); // Target the image directly

    // Shrink the image while keeping it centered
    gsap.to(img, {
      duration: 0.6,
      scale: 0.8, // Decrease the scale for shrinking
      transformOrigin: 'center center', // Ensure the image scales from the center
      ease: 'power2.out',
    });
  };

  return (
    <div className="text-black bg-white grid grid-cols-2 w-full h-screen overflow-hidden">
      {/* Left column: Placeholder text or other content */}
      <div className="relative flex flex-col justify-end p-4 w-full h-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold">PROJECT</h1>
          <p className="text-2xl font-bold">01</p>
        </div>
      </div>

      {/* Right column: Image */}
      <div className="relative flex items-center justify-center w-full h-full">
        <div
          className="photo-card relative cursor-pointer overflow-hidden w-full h-full flex items-center justify-center"
          onClick={handleCardClick}
        >
          <img
            className="w-full h-full object-cover absolute inset-0" // Ensure the image is positioned absolutely
            src="/1.jpg"
            alt="Sample Image"
          />
        </div>
      </div>

      {/* Cover used as background to create the effect */}
      <div
        id="cover"
        className="absolute top-0 left-0 w-0 h-0 bg-black transition-all duration-300 z-10"
        style={{ opacity: 0 }} // Start with hidden cover
      ></div>
    </div>
  );
}