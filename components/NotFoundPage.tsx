import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 min-h-[60vh]">
      <h1 className="text-8xl font-black text-primary drop-shadow-[0_0_15px_rgba(242,13,13,0.3)]">404</h1>
      <h2 className="text-4xl font-bold mt-4 text-white">Page Not Found</h2>
      <p className="mt-2 text-white/60 max-w-sm">Sorry, the page you are looking for does not exist or has been moved.</p>
      <a 
        href="#home" 
        className="mt-8 inline-block px-8 py-3 bg-primary text-background-dark font-bold rounded-full hover:brightness-110 transition-all shadow-lg shadow-primary/20"
      >
        Go to Home
      </a>
    </div>
  );
};

export default NotFoundPage;