'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useScroll, useTransform, motion } from 'motion/react';

export default function Project3({ onActivate, onDeactivate }) {
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
      onActivate && onActivate();
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
      onActivate && onActivate();
    }
  };

  const handleResetClick = () => {
    setIsImageShrunk(false);
    setIsDescriptionVisible(false);
    setAreExtraImagesVisible(false);
    setIsTextFixed(false);
    onDeactivate && onDeactivate();

    // Reset image scales
    const mainImg = container.current.querySelector('.photo-card img');
    const extraImgs = container.current.querySelectorAll('.extra-images img');
    
    gsap.to([mainImg, ...extraImgs], { 
      duration: 0.6, 
      scale: 1, 
      ease: 'power2.out' 
    });
  };

  return (
    <div className="bg-white text-black project-container grid grid-cols-2 h-full w-full overflow-hidden" ref={container}>
      <div className="relative p-4 w-full h-screen flex flex-col justify-end">
        <div className={isTextFixed ? 'fixed bottom-4' : ''}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">PROJECT</h1>
            <div className="flex items-center gap-4">
              <p className={`text-2xl font-bold ${isImageShrunk ? 'opacity-0' : ''}`}>03</p>
              {isImageShrunk && (
                <button 
                  onClick={handleResetClick}
                  className="text-sm underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={`absolute inset-0 flex items-center justify-center px-16 transition-all duration-600 ease-out ${isDescriptionVisible ? 'opacity-100' : 'opacity-0 h-0'}`}>
          <p className="text-xs max-w-md fixed">Quis ex tempor aute velit amet adipisicing sit. Occaecat fugiat tempor labore incididunt Lorem commodo cillum dolor adipisicing nostrud sint do exercitation qui laboris. Commodo adipisicing culpa velit Lorem sunt ea consequat deserunt excepteur magna officia quis ex. Ad et laboris et exercitation deserunt commodo velit laborum fugiat minim officia ex.

Duis dolore dolor non qui eiusmod irure proident quis mollit Lorem ad incididunt deserunt nostrud. Enim sit minim anim. Non ullamco ipsum mollit. Cillum exercitation est aute velit amet elit consectetur consequat ex ipsum consequat mollit.</p>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="photo-card relative cursor-pointer w-full h-screen flex items-center justify-center" onClick={handleCardClick}>
          <motion.img
            className="w-full h-full object-cover absolute inset-0"
            src="/2.jpg"
            alt="Sample Image"
            style={{ y: isImageShrunk ? '0%' : y }}
          />
        </div>

        {areExtraImagesVisible && (
          <div className="extra-images w-full flex flex-col justify-center gap-4">
            {['/1.jpg', '/3.jpg'].map((src, index) => (
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