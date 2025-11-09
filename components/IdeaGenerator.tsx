import React, { useState, useCallback } from 'react';
import { generateProjectPlan } from '../services/geminiService';
import { ProjectPlan } from '../types';

type AIPlannerProps = {
  setActivePage: (page: string) => void;
};

const AIPlanner: React.FC<AIPlannerProps> = ({ setActivePage }) => {
  const [topic, setTopic] = useState<string>('');
  const [plan, setPlan] = useState<ProjectPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performGeneration = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please describe your furniture project idea.');
      return;
    }
    setError(null);
    setIsLoading(true);
    // Do not clear the plan here, so the old one shows while loading
    // setPlan(null); 

    try {
      const result = await generateProjectPlan(topic);
      setPlan(result);
    } catch (err) {
      setError('Sorry, something went wrong while planning your project. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlan(null); // Clear previous plan on a new submission
    performGeneration();
  }, [performGeneration]);

  const handleReset = useCallback(() => {
    setTopic('');
    setPlan(null);
    setError(null);
    setIsLoading(false);
  }, []);
  
  const ResultCard: React.FC<{title: string; items: string[]}> = ({ title, items }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h4 className="text-md font-semibold text-sky-700 border-b border-slate-200 pb-2 mb-3">{title}</h4>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700">{item}</span>
                </li>
            ))}
        </ul>
    </div>
  );


  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">AI Project Planner</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
          Have an idea for a piece of automated furniture? Describe it below, and our AI will help you draft a preliminary plan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., A coffee table that rises to become a desk"
              className="flex-grow w-full px-4 py-3 text-lg text-slate-800 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition disabled:bg-slate-100"
              aria-label="Project Idea"
              disabled={isLoading || !!plan}
            />
            <button
              type="submit"
              className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 transition duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
              disabled={isLoading || !!plan}
            >
              {isLoading && !plan ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Planning...
                </span>
              ) : 'Plan My Project'}
            </button>
        </div>
      </form>

      {error && <p className="text-center text-red-600 mt-4">{error}</p>}

      {plan && (
        <div className="mt-10 animate-fade-in">
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <div className="text-center mb-8">
              <p className="text-slate-600">AI-Generated Plan for:</p>
              <h3 className="text-2xl font-bold text-slate-800">{plan.projectName}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <ResultCard title="Suggested Features" items={plan.suggestedFeatures} />
                <ResultCard title="Material Recommendations" items={plan.materialRecommendations} />
            </div>

            <div className="mt-6 bg-slate-100 p-4 rounded-lg border border-slate-200">
               <h4 className="text-md font-semibold text-slate-800 mb-2">Suggested Next Steps</h4>
               <p className="text-slate-700">{plan.nextSteps}</p>
            </div>
          </div>

           <div className="text-center mt-8 border-t pt-6 border-slate-200 flex items-center justify-center space-x-4">
                <button
                    type="button"
                    onClick={handleReset}
                    disabled={isLoading}
                    className="px-6 py-2 bg-slate-500 text-white font-semibold rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    Start a New Plan
                </button>
                <button
                    type="button"
                    onClick={performGeneration}
                    disabled={isLoading}
                    className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 transition duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isLoading ? 'Generating...' : 'Generate More Plans'}
                </button>
                <button
                    type="button"
                    onClick={() => setActivePage('contact')}
                    disabled={isLoading}
                    className="px-8 py-3 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                    Discuss This Plan With Us
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default AIPlanner;