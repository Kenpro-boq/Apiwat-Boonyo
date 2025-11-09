import React, { useState, useEffect } from 'react';

type NavLinkProps = {
    label: string;
    pageKey: string;
    activePage: string;
    onClick: (pageKey: string) => void;
};

type KenproLogoProps = {
  isScrolled: boolean;
};

const KenproLogo: React.FC<KenproLogoProps> = ({ isScrolled }) => (
    <svg className={`transition-all duration-300 ease-in-out ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'} mr-3`} viewBox="0 0 52 59" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const NavLink: React.FC<NavLinkProps> = ({ label, pageKey, activePage, onClick }) => {
    const isActive = activePage === pageKey;
    return (
        <button
            onClick={() => onClick(pageKey)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
        >
            {label}
        </button>
    );
};

type HeaderProps = {
    activePage: string;
    setActivePage: (page: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if user scrolls down more than 10px, false otherwise
      setIsScrolled(window.scrollY > 10);
    };

    // Add event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove event listener when component unmounts for cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <header className={`bg-white/80 backdrop-blur-sm sticky top-0 z-40 transition-all duration-300 ease-in-out ${isScrolled ? 'py-1 shadow-lg' : 'py-3 shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center cursor-pointer" onClick={() => setActivePage('home')}>
                <KenproLogo isScrolled={isScrolled} />
                <h1 className={`font-bold text-sky-600 transition-all duration-300 ease-in-out ${isScrolled ? 'text-lg' : 'text-xl'}`}>
                  Kenpro Automation Furniture
                </h1>
            </div>
            <nav className="flex space-x-2">
                <NavLink label="Home" pageKey="home" activePage={activePage} onClick={setActivePage} />
                <NavLink label="Services" pageKey="services" activePage={activePage} onClick={setActivePage} />
                <NavLink label="Project Planner" pageKey="planner" activePage={activePage} onClick={setActivePage} />
                <NavLink label="Contact" pageKey="contact" activePage={activePage} onClick={setActivePage} />
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;