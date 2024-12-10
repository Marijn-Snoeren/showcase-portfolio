'use client';

import Project_Right from '../components/Project_Right';
import Project_Left from '../components/Project_Left';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Project_Right />
      <Project_Left />
      <Project_Right />
      <Project_Left />
    </div>
  );
}