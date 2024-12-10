'use client';

import { useState } from 'react';
import { gsap } from 'gsap';

export default function PhotoCard() {
  const handleCardClick = (e) => {
    const card = e.target.closest('.photo-card');
    const cardRect = card.getBoundingClientRect();

    // Haal de achtergrondkleur van de kaart op
    const cardBackgroundColor = getComputedStyle(card).backgroundColor;

    // Vergroot de afbeelding naar het volledige scherm
    gsap.to(card, {
      duration: 0.6,
      scaleX: window.innerWidth / cardRect.width,
      scaleY: window.innerHeight / cardRect.height,
      x: (window.innerWidth / 2 - cardRect.width / 2 - cardRect.left) / (window.innerWidth / cardRect.width),
      y: (window.innerHeight / 2 - cardRect.height / 2 - cardRect.top) / (window.innerHeight / cardRect.height),
      ease: 'power2.out',
    });

    // Stel de achtergrondkleur in voor de cover (optioneel)
    gsap.set('#cover', { backgroundColor: cardBackgroundColor });
  };

  return (
    <div className="relative">
      <div
        className="photo-card relative cursor-pointer overflow-hidden"
        onClick={handleCardClick}
      >
        <img
          className="w-full transition-all duration-500 ease-in-out"
          src="https://via.placeholder.com/600x400"
          alt="Sample Image"
        />
      </div>

      {/* Cover wordt gebruikt als de achtergrond om het effect te creëren */}
      <div
        id="cover"
        className="absolute top-0 left-0 w-0 h-0 bg-black transition-all duration-300 z-10"
        style={{ opacity: 0 }} // Begin met verborgen cover
      ></div>
    </div>
  );
}