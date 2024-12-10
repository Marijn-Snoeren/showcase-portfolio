'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useScroll, useTransform, motion } from 'motion/react';

export default function Project_Right() {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [areExtraImagesVisible, setAreExtraImagesVisible] = useState(false);
  const [isImageShrunk, setIsImageShrunk] = useState(false);
  const [isTextFixed, setIsTextFixed] = useState(false);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'], {
    clamp: !isImageShrunk,
  });

  const handleCardClick = (e) => {
    const img = e.target.closest('.photo-card').querySelector('img');
    if (!isImageShrunk) {
      gsap.to(img, { duration: 0.6, scale: 0.8, ease: 'power2.out' });
      setIsImageShrunk(true);
    }
    setIsDescriptionVisible(true);
    setAreExtraImagesVisible(true);
    setIsTextFixed(true);
  };

  const handleExtraImageClick = (e) => {
    const img = e.target;
    if (!isImageShrunk) {
      gsap.to(img, { duration: 0.6, scale: 0.8, ease: 'power2.out' });
      setIsImageShrunk(true);
    }
  };

  return (
    <div className="bg-white text-black project-container grid grid-cols-2 h-full w-full overflow-hidden" ref={container}>
      <div className="relative p-4 w-full h-screen flex flex-col justify-end">
        <div className={isTextFixed ? 'fixed bottom-4' : ''}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">PROJECT</h1>
            <p className={`text-2xl font-bold ${isImageShrunk ? 'opacity-0' : ''}`}>01</p>
          </div>
        </div>

        <div className={`absolute inset-0 flex items-center justify-center px-16 transition-all duration-600 ease-out ${isDescriptionVisible ? 'opacity-100' : 'opacity-0 h-0'}`}>
          <p className="text-xs max-w-xl">Detailed description of the project goes here.</p>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="photo-card relative cursor-pointer w-full h-screen flex items-center justify-center" onClick={handleCardClick}>
          <motion.img
            className="w-full h-full object-cover absolute inset-0"
            src="/1.jpg"
            alt="Sample Image"
            style={{ y: isImageShrunk ? '0%' : y }}
          />
        </div>

        {areExtraImagesVisible && (
          <div className="extra-images w-full flex flex-col justify-center gap-4">
            {['/2.jpg', '/3.jpg'].map((src, index) => (
              <div key={index} className="w-full h-screen relative overflow-hidden cursor-pointer" onClick={handleExtraImageClick}>
                <img
                  className="w-full h-full object-cover absolute inset-0"
                  src={src}
                  alt={`Extra Image ${index + 1}`}
                  style={{ transform: isImageShrunk ? 'scale(0.8)' : 'scale(1)' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}