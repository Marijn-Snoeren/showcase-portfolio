'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Project from '../components/Project';
import Project2 from '../components/Project2';
import Project3 from '../components/Project3';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.project');
    gsap.to(sections, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: 1.0,
          ease: 'power1.inOut',
        },
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col">
      <div className="project"><Project /></div>
      <div className="project"><Project2 /></div>
      <div className="project"><Project3 /></div>
    </div>
  );
}