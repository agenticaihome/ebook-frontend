import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react';

/**
 * RouteErrorBoundary - A route-level error boundary for lazy-loaded components
 * 
 * Provides graceful error handling for individual routes without crashing the entire app.
 * Offers retry, go back, and go home options.
 */
class RouteErrorBoundaryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Route Error:", error, errorInfo);
        this.setState({ errorInfo });

        // Track error for analytics (if available)
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'exception', {
                description: error.message,
                fatal: false
            });
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <RouteErrorFallback
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    onRetry={this.handleRetry}
                    routeName={this.props.routeName}
                />
            );
        }

        return this.props.children;
    }
}

/**
 * Fallback UI shown when a route crashes
 */
const RouteErrorFallback = ({ error, errorInfo, onRetry, routeName }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-slate-900/50 border border-amber-500/20 p-8 rounded-2xl max-w-md w-full backdrop-blur-xl shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-amber-500/10 rounded-full">
                        <AlertTriangle className="w-12 h-12 text-amber-500" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">
                    {routeName ? `${routeName} couldn't load` : 'Page couldn\'t load'}
                </h1>
                <p className="text-slate-300 mb-6">
                    Something went wrong loading this page. Your progress is safe.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={onRetry}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-xl transition-colors font-bold shadow-lg shadow-cyan-900/20"
                    >
                        <RefreshCw size={18} />
                        Try Again
                    </button>

                    <button
                        onClick={handleGoBack}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition-colors font-medium border border-slate-700"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 py-3 rounded-xl transition-colors font-medium border border-slate-700/50"
                    >
                        <Home size={18} />
                        Return Home
                    </button>
                </div>

                {/* Dev-only detail view */}
                {process.env.NODE_ENV === 'development' && error && (
                    <div className="mt-8 text-left">
                        <details className="text-xs text-amber-400 bg-amber-950/30 p-3 rounded-lg overflow-auto max-h-40 border border-amber-900/50">
                            <summary className="cursor-pointer font-bold mb-2">Error Details</summary>
                            <pre className="whitespace-pre-wrap font-mono">
                                {error.toString()}
                                <br />
                                {errorInfo?.componentStack}
                            </pre>
                        </details>
                    </div>
                )}

                <p className="text-xs text-slate-500 mt-6">
                    Route: {location.pathname}
                </p>
            </div>
        </div>
    );
};

/**
 * Wrapper component that provides navigation context
 */
const RouteErrorBoundary = ({ children, routeName }) => {
    return (
        <RouteErrorBoundaryClass routeName={routeName}>
            {children}
        </RouteErrorBoundaryClass>
    );
};

export default RouteErrorBoundary;
