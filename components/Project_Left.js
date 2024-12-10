'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useScroll, useTransform, motion } from 'motion/react';

export default function Project_Left() {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const container = useRef(null);

  // Set up scroll-based transformations
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-50%', '50vh']); // Parallax effect

  const handleCardClick = (e) => {
    const card = e.target.closest('.photo-card');
    const img = card.querySelector('img'); // Target the image directly
    const descriptionContainer = card.closest('.project-container').querySelector('.description-container'); // The description container in the right column

    // Shrink the image while keeping it centered
    gsap.to(img, {
      duration: 0.6,
      scale: 0.8, // Decrease the scale for shrinking
      transformOrigin: 'center center', // Ensure the image scales from the center
      ease: 'power2.out',
    });

    // Fade in the description container only when clicked
    setIsDescriptionVisible(true);

    gsap.fromTo(descriptionContainer, 
      {
        opacity: 0,
        y: 50,
      },
      {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
      }
    );
  };

  return (
    <div className="project-container text-black bg-white grid grid-cols-2 w-full h-screen overflow-hidden" ref={container}>
      {/* Left column: Image */}
      <div className="relative flex items-center justify-center w-full h-full">
        <div
          className="photo-card relative cursor-pointer overflow-hidden w-full h-full flex items-center justify-center"
          onClick={handleCardClick}
        >
          <motion.img
            className="w-full h-full object-cover absolute inset-0"
            src="/1.jpg"
            alt="Sample Image"
            style={{ y, willChange: 'transform' }} // Apply the parallax effect
          />
        </div>
      </div>

      {/* Right column: Description */}
      <div className="relative flex flex-col justify-end p-4 w-full h-full">
        <div className="flex justify-between items-center w-full">
          <p className="text-2xl font-bold">02</p>
          <h1 className="text-2xl font-bold">PROJECT</h1>
        </div>

        {/* Description Container - Initially hidden */}
        {isDescriptionVisible && (
          <div className="description-container absolute inset-0 text-black flex items-center justify-center px-16">
            <div className="text-left max-w-xl">  {/* Keep text-left, and optionally set a max-width */}
               <p className="text-xs">
                  Detailed description of the project goes here. This can include 
                  information about the concept, technologies used, challenges overcome, 
                  and the overall significance of the project. Provide insights into 
                  the innovative aspects and impact of your work.
                </p>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}