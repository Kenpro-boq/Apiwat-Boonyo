import React from 'react';

const KenproLogo: React.FC = () => (
    <svg className="w-10 h-10 mr-3" viewBox="0 0 52 59" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22D3EE"/>
                <stop offset="100%" stopColor="#06B6D4"/>
            </linearGradient>
        </defs>
        <path d="M26.5455 29.5L0 0H21.5152L40.7273 21.6042L26.5455 29.5Z" fill="#0891B2"/>
        <path d="M0 59L26.5455 29.5L0 21.6042V59Z" fill="url(#logoGradient)"/>
        <path d="M52 0L26.5455 29.5L40.7273 42.7917L52 34.8958V0Z" fill="#0891B2"/>
        <path d="M26.5455 29.5L52 59H39.8182L26.5455 42.7917L26.5455 29.5Z" fill="url(#logoGradient)"/>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center">
          <KenproLogo />
          <h1 className="text-2xl font-bold text-sky-600">Kenpro Automation Furniture</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;