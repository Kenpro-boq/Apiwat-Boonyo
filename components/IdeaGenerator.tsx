import React, { useState } from 'react';

// This component is now a static Project Planner form, no API is used.
const AIPlanner: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !idea) {
      // Basic validation
      return;
    }
    // In a real application, you would send this data to a server.
    // For this demo, we'll just show a success message.
    console.log('Form Submitted:', { name, email, idea });
    setSubmitted(true);
  };

  if (submitted) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 animate-fade-in text-center">
            <h2 className="text-3xl font-bold text-slate-800">Thank You!</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                Your project idea has been submitted. Our team will review it and get back to you at <strong>{email}</strong> shortly.
            </p>
            <button
                onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setIdea('');
                }}
                className="mt-8 px-8 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 transition"
            >
                Submit Another Idea
            </button>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">Let's Plan Your Project</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
          Have an idea for a piece of automated furniture? Describe it below, and our team will get in touch with you to draft a plan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., John Doe"
              className="block w-full px-4 py-3 text-lg text-slate-800 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              required
            />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., john.doe@example.com"
              className="block w-full px-4 py-3 text-lg text-slate-800 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              required
            />
        </div>
         <div>
            <label htmlFor="idea" className="block text-sm font-medium text-slate-700 mb-1">Your Project Idea</label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A coffee table that rises to become a desk..."
              rows={4}
              className="block w-full px-4 py-3 text-lg text-slate-800 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              required
            />
        </div>
        <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full px-8 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 transition duration-200 ease-in-out"
            >
              Send Project Idea
            </button>
        </div>
      </form>
    </div>
  );
};

export default AIPlanner;