import React from 'react';

// --- Icon Components ---

const KnowledgeHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const PlannerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const FileManagerIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

// --- Data for Cards ---

const tools = [
    {
        title: 'Team Knowledge Hub',
        description: 'Centralized database for team documentation, tutorials, and project histories. Powered by our advanced AI search.',
        url: 'https://ai.studio/apps/drive/1tRPnw-sL3gL7HSpXQqKzZXUYumOstz2h',
        icon: <KnowledgeHubIcon />,
        tag: { text: 'NEW', color: 'bg-green-500' },
        iconBg: 'bg-green-600',
    },
    {
        title: 'AI Project Planner',
        description: 'Use our Gemini-powered agent to draft initial project plans, timelines, and feature lists from a simple idea.',
        url: 'https://ai.studio/apps/drive/1tquYHl2poQb4F45ux1VWGf1HupW7h99U',
        icon: <PlannerIcon />,
        tag: { text: 'AI POWERED', color: 'bg-sky-500' },
        iconBg: 'bg-sky-600',
    },
    {
        title: 'Live Client Dashboard',
        description: 'Provide clients with a real-time view of project progress, milestones, and pending approvals.',
        url: '#', // Placeholder URL
        icon: <DashboardIcon />,
        tag: { text: 'LIVE', color: 'bg-red-500' },
        iconBg: 'bg-red-600',
    },
    {
        title: 'Asset & File Manager',
        description: 'Securely upload, store, and share project files, blueprints, and design assets with your team and clients.',
        url: '#', // Placeholder URL
        icon: <FileManagerIcon />,
        tag: { text: 'SECURE', color: 'bg-slate-500' },
        iconBg: 'bg-slate-600',
    }
];

// --- Card Component ---

type ToolCardProps = {
  tool: typeof tools[0];
  setActivePage: (page: string) => void;
};

const ToolCard: React.FC<ToolCardProps> = ({ tool, setActivePage }) => {
    const { title, description, url, icon, tag, iconBg, isInternal, pageKey } = tool;

    const content = (
         <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 border border-slate-200">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${iconBg}`}>
                    {icon}
                </div>
                {tag && (
                    <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${tag.color}`}>
                        {tag.text}
                    </span>
                )}
            </div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <p className="text-slate-600 mt-2 flex-grow">{description}</p>
            <div className="mt-6 flex justify-end items-center">
                <span className="font-semibold text-sky-600 group-hover:text-sky-700 transition-colors">
                    Launch Tool
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-sky-600 group-hover:text-sky-700 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    );
    
    if (isInternal && pageKey) {
        return <button onClick={() => setActivePage(pageKey)} className="text-left w-full h-full">{content}</button>;
    }

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            {content}
        </a>
    );
};

// --- Main Page Component ---

type ProjectHubPageProps = {
  setActivePage: (page: string) => void;
};


const ProjectHubPage: React.FC<ProjectHubPageProps> = ({ setActivePage }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">Project Hub</h2>
        <p className="text-slate-600 mt-2 max-w-3xl mx-auto">
          Access your suite of project management tools and platforms from one central location. Select a tool below to get started.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tools.map(tool => (
                <ToolCard key={tool.title} tool={tool} setActivePage={setActivePage} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectHubPage;