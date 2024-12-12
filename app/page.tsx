'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Project from '../components/Project';
import Project2 from '../components/Project2';
import Project3 from '../components/Project3';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
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

  const handleProjectActivation = (projectIndex: number) => {
    setActiveProject(projectIndex);
  };

  const handleProjectDeactivation = () => {
    setActiveProject(null);
  };

  return (
<div ref={containerRef} className="min-h-screen w-full flex flex-col">
  <div
    className={`project ${activeProject !== null && activeProject !== 0 ? 'hidden' : ''}`}
  >
    <Project 
      onActivate={() => handleProjectActivation(0)} 
      onDeactivate={handleProjectDeactivation}
    />
  </div>
  <div
    className={`project ${activeProject !== null && activeProject !== 1 ? 'hidden' : ''}`}
  >
    <Project2 
      onActivate={() => handleProjectActivation(1)} 
      onDeactivate={handleProjectDeactivation}
    />
  </div>
  <div
    className={`project ${activeProject !== null && activeProject !== 2 ? 'hidden' : ''}`}
  >
    <Project3 
      onActivate={() => handleProjectActivation(2)} 
      onDeactivate={handleProjectDeactivation}
    />
  </div>
</div>
  );
}