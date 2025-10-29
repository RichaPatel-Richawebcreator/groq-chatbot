import React from "react";
import { AlertTriangle } from "lucide-react";

// Internal class-based error boundary to leverage React's error boundary lifecycle
class _ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Keep the same logging behavior as before
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {(this.state.error && this.state.error.message) ||
              "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Exported functional wrapper. This keeps the public API a function component
// while preserving React's error boundary behavior via the internal class.
function ErrorBoundary({ children }) {
  return <_ErrorBoundaryClass>{children}</_ErrorBoundaryClass>;
}

export default ErrorBoundary;
