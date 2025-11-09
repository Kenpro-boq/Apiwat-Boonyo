import React, { useState } from 'react';
import Header from './components/Header';
import AIPlanner from './components/IdeaGenerator'; // Repurposed IdeaGenerator as AIPlanner

// --- Page Components ---

type PageProps = {
  setActivePage: (page: string) => void;
};

const HomePage: React.FC<PageProps> = ({ setActivePage }) => (
  <div className="text-center py-16 px-4 animate-fade-in">
    <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 tracking-tight">
      Innovating Your Space with Smart Furniture
    </h1>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
      At Kenpro, we blend cutting-edge technology with timeless design to create furniture that adapts to your life. Discover the future of living, today.
    </p>
    <div className="mt-8">
      <button
        onClick={() => setActivePage('planner')}
        className="inline-block px-8 py-4 bg-sky-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-sky-700 transition-transform transform hover:scale-105"
      >
        Plan Your Project with AI
      </button>
    </div>
  </div>
);

const ServicesPage: React.FC = () => (
  <div className="animate-fade-in">
    <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 text-center">
        <div className="flex justify-center items-center mb-4">
            <svg className="w-12 h-12 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
        </div>
        <h3 className="text-xl font-semibold text-sky-700">Custom Automation</h3>
        <p className="mt-2 text-slate-600">From automated shelving to smart beds, we design and build furniture that works for you, controlled at the touch of a button.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 text-center">
        <div className="flex justify-center items-center mb-4">
            <svg className="w-12 h-12 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.043A5.25 5.25 0 017.5 15h-3a3 3 0 00-3 3v.158c0 .927.426 1.773 1.14 2.365A6.723 6.723 0 017.5 21a6.723 6.723 0 014.86-3.432l-1.682-1.682a5.25 5.25 0 01-2.4-4.843zM14.25 15a5.25 5.25 0 00-2.4-4.843L10.168 8.57a5.25 5.25 0 014.843 2.4 5.25 5.25 0 014.843-2.4L21.43 10.17a5.25 5.25 0 00-2.4 4.843 5.25 5.25 0 01-4.828 4.457" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5a5.25 5.25 0 002.4-4.843L7.082 7.07a5.25 5.25 0 01-4.843-2.4 5.25 5.25 0 01-2.4 4.843L1.515 11.17a5.25 5.25 0 002.4 4.843z" />
            </svg>
        </div>
        <h3 className="text-xl font-semibold text-sky-700">Smart Home Integration</h3>
        <p className="mt-2 text-slate-600">Our furniture seamlessly integrates with your existing smart home ecosystem for a truly connected living experience.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 text-center">
        <div className="flex justify-center items-center mb-4">
            <svg className="w-12 h-12 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.5 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.5 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
        </div>
        <h3 className="text-xl font-semibold text-sky-700">Consultation & Design</h3>
        <p className="mt-2 text-slate-600">Work with our experts to design the perfect automated furniture solution that fits your space and lifestyle.</p>
      </div>
    </div>
  </div>
);


const ContactPage: React.FC = () => (
    <div className="text-center p-8 bg-white rounded-lg shadow-md border border-slate-200 animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg text-slate-600 mb-6">Ready to transform your space? Contact us today to start your project.</p>
        <p className="text-slate-800 font-semibold">Email: <a href="mailto:contact@kenpro.com" className="text-sky-600 hover:underline">contact@kenpro.com</a></p>
        <p className="text-slate-800 font-semibold mt-2">Phone: <a href="tel:+1234567890" className="text-sky-600 hover:underline">+1 (234) 567-890</a></p>
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'services':
        return <ServicesPage />;
      case 'planner':
        return <AIPlanner setActivePage={setActivePage} />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
      <footer className="text-center text-sm text-slate-500 py-6">
        <p>&copy; {new Date().getFullYear()} Kenpro Automation Furniture. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;