import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-center p-4">
            <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
            <h1 className="text-3xl font-bold">Something went wrong.</h1>
            <p className="mt-2 text-gray-600 dark:text-text-secondary">
                We've encountered an error. Please try refreshing the page.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
                Refresh Page
            </button>
        </div>
      );
    }
    // FIX: Destructuring props to resolve a potential type inference issue where this.props was not being found on the component type.
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;