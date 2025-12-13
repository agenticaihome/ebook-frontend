import React, { useState } from 'react';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import { logSubscription } from '../../utils/analytics';

/**
 * Reusable email capture component with trust signals and inline error handling.
 * Designed for mass adoption: large text, simple language, single field.
 */
const EmailCaptureForm = ({
    source = 'unknown',
    headline = "📬 Get Free AI Tips",
    subheadline = "Join 1,000+ people getting weekly AI tips from Captain Efficiency",
    buttonText = "Send Me Tips",
    successMessage = "You're in! Check your inbox.",
    showTrustLine = true,
    compact = false,
    className = ""
}) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || status === 'loading') return;

        setStatus('loading');
        setErrorMessage('');

        try {
            const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:8080/api'
                : 'https://ebook-backend-production-8f68.up.railway.app/api';

            const response = await fetch(`${API_URL}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, source }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus('success');
                // Track subscription in GA4
                logSubscription(source);
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Something went wrong. Please try again.');
                // Track failed attempts for debugging
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'subscribe_error', {
                        event_category: 'error',
                        event_label: source,
                        error_message: data.error || 'unknown'
                    });
                }
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Connection error. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className={`p-4 bg-green-500/10 rounded-2xl border border-green-500/30 text-center ${className}`}>
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 font-bold text-lg">✅ {successMessage}</p>
                <p className="text-slate-300 text-sm mt-1">No spam, ever. Unsubscribe anytime.</p>
            </div>
        );
    }

    return (
        <div className={`p-${compact ? '4' : '6'} bg-slate-800/50 rounded-2xl border border-slate-700/50 ${className}`}>
            {!compact && (
                <>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Mail className="w-5 h-5 text-teal-400" />
                        <p className="text-white font-bold text-lg">{headline}</p>
                    </div>
                    <p className="text-slate-300 text-sm mb-4 text-center">{subheadline}</p>
                </>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white placeholder-slate-500 text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-base transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        buttonText
                    )}
                </button>
            </form>

            {/* Error message - inline, not alert */}
            {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-3">
                    ⚠️ {errorMessage}
                </p>
            )}

            {/* Trust line for older adults */}
            {showTrustLine && (
                <p className="text-slate-500 text-xs text-center mt-3">
                    🔒 No spam, ever. Unsubscribe anytime with one click.
                </p>
            )}
        </div>
    );
};

export default EmailCaptureForm;
