'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useScroll, useTransform, motion } from 'motion/react';

export default function Project_Right() {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  // Reference for scroll
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for the image on the right column
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  const handleCardClick = (e) => {
    const card = e.target.closest('.photo-card');
    const img = card.querySelector('img');
    const descriptionContainer = card.closest('.project-container').querySelector('.description-container');

    // Shrink the image while keeping it centered
    gsap.to(img, {
      duration: 0.6,
      scale: 0.8, 
      transformOrigin: 'center center',
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
      {/* Left column: Description */}
      <div className="relative flex flex-col justify-end p-4 w-full h-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold">PROJECT</h1>
          <p className="text-2xl font-bold">01</p>
        </div>

        {/* Description Container - Initially hidden */}
        <div className={`description-container absolute inset-0 text-black flex items-center justify-center px-16 transition-all duration-600 ease-out ${isDescriptionVisible ? 'opacity-100' : 'opacity-0 h-0'}`}>
          <div className="text-left max-w-xl overflow-hidden">
            <p className="text-xs">
              Detailed description of the project goes here. This can include 
              information about the concept, technologies used, challenges overcome, 
              and the overall significance of the project. Provide insights into 
              the innovative aspects and impact of your work.
            </p>
          </div>
        </div>
      </div>

      {/* Right column: Image */}
      <div className="relative flex items-center justify-center w-full h-full">
        <div
          className="photo-card relative cursor-pointer overflow-hidden w-full h-full flex items-center justify-center"
          onClick={handleCardClick}
        >
          {/* Parallax effect applied to the image */}
          <motion.img
            className="w-full h-full object-cover absolute inset-0"
            src="/1.jpg"
            alt="Sample Image"
            style={{ y, willChange: 'transform' }} // Apply the parallax transform
          />
        </div>
      </div>
    </div>
  );
}