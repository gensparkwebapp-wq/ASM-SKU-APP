import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-primary-blue">404</h1>
      <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-500 dark:text-text-secondary">Sorry, the page you are looking for does not exist.</p>
      <a href="#feed" className="mt-6 inline-block px-6 py-3 bg-primary-blue text-white font-bold rounded-lg">Go to Feed</a>
    </div>
  );
};

export default NotFoundPage;
