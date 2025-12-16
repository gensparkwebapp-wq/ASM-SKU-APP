import React from 'react';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-sm bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-8 border border-gray-200 dark:border-border-dark">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue" />
          <input type="email" placeholder="Email Address" className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue" />
          <input type="password" placeholder="Password" className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue" />
          <button type="submit" className="w-full h-12 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">Sign Up</button>
        </form>
        <div className="text-center mt-4">
            <a href="#login" className="text-sm text-primary-blue hover:underline">Already have an account? Log In</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
