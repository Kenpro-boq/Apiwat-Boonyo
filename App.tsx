import React, { useState } from 'react';
import Header from './components/Header';
import SiteViewer from './components/SiteViewer';
import IdeaGenerator from './components/IdeaGenerator';

type View = 'viewer' | 'generator';

const App: React.FC = () => {
  const [view, setView] = useState<View>('viewer');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      <Header />
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-6">
            <div className="flex border-b border-slate-200">
              <TabButton
                label="View Your Site"
                isActive={view === 'viewer'}
                onClick={() => setView('viewer')}
              />
              <TabButton
                label="Generate Site Ideas with AI"
                isActive={view === 'generator'}
                onClick={() => setView('generator')}
              />
            </div>
            <div className="p-4 md:p-6 min-h-[60vh]">
              {view === 'viewer' && <SiteViewer />}
              {view === 'generator' && <IdeaGenerator />}
            </div>
          </div>
           <footer className="text-center text-sm text-slate-500 mt-8">
              <p>Powered by React, Tailwind CSS, and the Gemini API.</p>
              <p>Kenpro Automation Furniture is an independent application.</p>
           </footer>
        </div>
      </main>
    </div>
  );
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm md:text-base font-medium transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue ${
        isActive
          ? 'border-b-2 border-brand-blue text-brand-blue'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
      }`}
    >
      {label}
    </button>
  );
};


export default App;