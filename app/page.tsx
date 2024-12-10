'use client';

import Project from '../components/Project';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Project />
      <Project />
      <Project />
    </div>
  );
}