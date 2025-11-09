import React, { useState } from 'react';
import { generateProjectPlan } from '../services/geminiService';

const AIPlanner: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!idea.trim()) {
      setError('Please describe your idea first.');
      return;
    }
    setIsLoading(true);
    setGeneratedPlan(null);
    setError(null);

    const result = await generateProjectPlan(idea);

    if (result.startsWith("Sorry, we couldn't") || result.startsWith("There was an issue")) {
        setError(result);
        setGeneratedPlan(null);
    } else {
        setGeneratedPlan(result);
        setError(null);
    }

    setIsLoading(false);
  };

  const handleReset = () => {
    setIdea('');
    setGeneratedPlan(null);
    setError(null);
    setIsLoading(false);
  };
  
  if (isLoading) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 animate-fade-in text-center flex flex-col items-center justify-center min-h-[400px]">
            <svg className="animate-spin h-10 w-10 text-sky-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-slate-800">Our AI is drafting your plan...</h2>
            <p className="text-slate-600 mt-2">This should only take a moment.</p>
        </div>
    );
  }

  if (generatedPlan || error) {
     return (
        <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Your AI-Generated Project Plan</h2>
            {generatedPlan && (
                <div className="bg-slate-50 p-4 rounded-md border text-slate-700 whitespace-pre-wrap font-mono">
                    {generatedPlan}
                </div>
            )}
             {error && <p className="mt-4 text-center text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</p>}
            <div className="text-center mt-8">
                <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 transition"
                >
                    Create Another Plan
                </button>
            </div>
        </div>
     );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">AI Project Planner</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
          Have an idea for a piece of automated furniture? Describe it below, and our AI will draft a preliminary project plan for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto space-y-4">
        <div>
            <label htmlFor="idea" className="block text-sm font-medium text-slate-700 mb-1">Your Project Idea</label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A bookshelf with a hidden, automated compartment that slides out..."
              rows={5}
              className="block w-full px-4 py-3 text-lg text-slate-800 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              required
            />
        </div>
        <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full px-8 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 transition duration-200 ease-in-out"
              disabled={isLoading}
            >
              Generate Plan
            </button>
        </div>
      </form>
    </div>
  );
};

export default AIPlanner;
