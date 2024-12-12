import React from 'react';

const Header = () => {
  return (
    <header className="min-h-16 -mb-16 sticky top-0 bg-opacity-0 text-black z-10">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <a className="text-xl font-bold">
          Jiram
        </a>

        {/* Right side: About link */}
        <a className="text-xl font-bold">
          About
        </a>
      </div>
    </header>
  );
};

export default Header;