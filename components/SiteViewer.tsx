import React, { useState, useRef, useCallback } from 'react';

const SiteViewer: React.FC = () => {
  const [siteUrl, setSiteUrl] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error on new submission

    if (!inputValue.trim()) {
      setError('Please enter a URL.');
      return;
    }

    let url: URL;
    try {
      url = new URL(inputValue);
    } catch (_) {
      setError('The entered text is not a valid URL format.');
      return;
    }

    if (url.protocol !== 'https:') {
        setError('Please provide a secure URL starting with https://.');
        return;
    }

    if (url.hostname !== 'sites.google.com') {
      setError('This does not appear to be a Google Site. The URL must start with "https://sites.google.com".');
      return;
    }

    // A common pattern for public sites is '/view/...'.
    // While other patterns exist (for GSuite), this helps validate the most frequent public use case.
    if (!url.pathname.startsWith('/view/')) {
       setError("Please ensure the URL is a public site link, which usually contains '/view/'. Custom domain URLs are not supported.");
       return;
    }

    setError(null);
    setIsLoading(true);
    setSiteUrl(inputValue);
  };

  const handleReset = useCallback(() => {
    setSiteUrl('');
    setInputValue('');
    setIsLoading(false);
    setError(null);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">View a Google Site</h2>
      <p className="text-slate-600 mb-6">
        Paste the full URL of a public Google Site below to display it.
      </p>

      {!siteUrl ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://sites.google.com/view/example"
            className="flex-grow w-full px-4 py-2 text-slate-800 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
            aria-label="Google Site URL"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-brand-blue text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition duration-200 ease-in-out"
          >
            Load Site
          </button>
        </form>
      ) : (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-brand-red text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red transition duration-200 ease-in-out"
          >
            Load Another Site
          </button>
        </div>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {siteUrl && (
        <>
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800" role="alert">
            <p>
                <strong className="font-semibold">Note:</strong> If the site below shows an error, a sign-in page, or is blank, the site may be private, deleted, or the URL might be incorrect. Please ensure the link is for a <strong className="font-semibold">publicly shared</strong> Google Site.
            </p>
        </div>
        <div className="mt-4 border border-slate-300 rounded-lg overflow-hidden shadow-inner bg-slate-100">
          {isLoading && (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center text-slate-500">
              <svg className="animate-spin h-8 w-8 text-brand-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg">Loading Google Site...</p>
              <p className="text-sm">This may take a moment.</p>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={siteUrl}
            onLoad={handleIframeLoad}
            title="Google Site Viewer"
            className={`w-full h-[60vh] transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          ></iframe>
        </div>
        </>
      )}
    </div>
  );
};

export default SiteViewer;