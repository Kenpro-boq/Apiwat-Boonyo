import React, { useState, useCallback } from 'react';
import { generateSiteIdeas, generatePageContent } from '../services/geminiService';
import { SiteIdea } from '../types';

const IdeaGenerator: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [ideas, setIdeas] = useState<SiteIdea | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for content generation modal
  const [generatingPage, setGeneratingPage] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);


  const performGeneration = useCallback(async (isAlternative: boolean) => {
    if (!topic.trim()) {
      setError('Please enter a topic for your website.');
      return;
    }
    setError(null);
    setIsLoading(true);
    if (!isAlternative) {
        setIdeas(null);
    }
    try {
      const result = await generateSiteIdeas(topic, isAlternative);
      setIdeas(result);
    } catch (err) {
      setError('Sorry, something went wrong while generating ideas. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performGeneration(false);
  }, [performGeneration]);

  const handleGenerateMore = useCallback(() => {
    performGeneration(true);
  }, [performGeneration]);

  const handleReset = useCallback(() => {
    setTopic('');
    setIdeas(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleGeneratePageContent = useCallback(async (pageName: string) => {
    if (!ideas) return;

    setGeneratingPage(pageName);
    setGeneratedContent(null);
    setContentError(null);
    setIsCopied(false);

    try {
        const content = await generatePageContent(topic, ideas.title, pageName);
        setGeneratedContent(content);
    } catch (err) {
        setContentError(`Failed to generate content for ${pageName}. Please try again.`);
    }
  }, [topic, ideas]);

  const closeModal = () => {
    setGeneratingPage(null);
    setGeneratedContent(null);
    setContentError(null);
    setIsCopied(false);
  };

  const handleCopyToClipboard = () => {
    if (generatedContent) {
        navigator.clipboard.writeText(generatedContent).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Generate Website Ideas</h2>
      <p className="text-slate-600 mb-6">
        Feeling stuck? Describe your website concept, and our AI will suggest a title, tagline, and page structure.
      </p>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., A personal portfolio for a photographer"
              className="flex-grow w-full px-4 py-2 text-slate-800 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition disabled:bg-slate-100"
              aria-label="Website Topic"
              disabled={isLoading || !!ideas}
            />
            {!ideas && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : 'Get Ideas'}
                </button>
            )}
            {ideas && (
                <>
                    <button
                        type="button"
                        onClick={handleGenerateMore}
                        className="px-6 py-2 bg-brand-blue text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                         {isLoading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Generating...
                            </span>
                          ) : 'Generate More'}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2 bg-slate-500 text-white font-semibold rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        Start Over
                    </button>
                </>
            )}
        </div>
      </form>

      {error && <p className="text-brand-red mt-2">{error}</p>}

      {ideas && !isLoading && (
        <div className="mt-8 p-6 bg-sky-50 border border-sky-200 rounded-lg animate-fade-in">
          <h3 className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-4">AI Suggested Structure</h3>
          <div className="mb-6">
            <p className="text-slate-600">Site Title:</p>
            <h4 className="text-2xl font-bold text-slate-800">{ideas.title}</h4>
          </div>
          <div className="mb-6">
            <p className="text-slate-600">Tagline:</p>
            <p className="text-lg italic text-slate-700">"{ideas.tagline}"</p>
          </div>
          <div>
            <p className="text-slate-600 mb-2">Suggested Pages (click a page to generate content):</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ideas.pages.map((page, index) => (
                <li key={index}>
                    <button 
                        onClick={() => handleGeneratePageContent(page)}
                        className="w-full flex items-center bg-white p-3 rounded-md border border-slate-200 shadow-sm text-left hover:bg-sky-50 hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-blue transition-all duration-200 group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-400 group-hover:text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="flex-grow text-slate-800">{page}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 group-hover:text-yellow-500 opacity-75 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Content Generation Modal */}
      {generatingPage && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in" aria-modal="true" role="dialog">
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-800">Generated Content for "{generatingPage}"</h3>
                    <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {!generatedContent && !contentError && (
                        <div className="flex flex-col items-center justify-center min-h-[200px] text-slate-500">
                            <svg className="animate-spin h-8 w-8 text-brand-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-lg">Generating content...</p>
                        </div>
                    )}
                    {contentError && (
                        <div className="text-center text-brand-red p-4 bg-red-50 rounded-md">
                            <p className="font-semibold">Oh no!</p>
                            <p>{contentError}</p>
                        </div>
                    )}
                    {generatedContent && (
                        <div className="prose prose-slate max-w-none whitespace-pre-wrap">
                            {generatedContent}
                        </div>
                    )}
                </div>

                <div className="flex justify-end p-4 border-t border-slate-200 bg-slate-50 rounded-b-lg">
                    {generatedContent && (
                        <button onClick={handleCopyToClipboard} className="px-5 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition duration-200 ease-in-out flex items-center">
                            {isCopied ? (
                                <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Copied!
                                </>
                            ) : (
                                <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy Content
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
