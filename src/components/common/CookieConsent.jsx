import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield } from 'lucide-react';

/**
 * GDPR/CCPA compliant cookie consent banner
 * Blocks analytics until user consents
 */
const CookieConsent = ({ onAccept, onDecline }) => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => setShowBanner(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        localStorage.setItem('cookie_consent_date', new Date().toISOString());
        setShowBanner(false);
        onAccept?.();
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        localStorage.setItem('cookie_consent_date', new Date().toISOString());
        setShowBanner(false);
        onDecline?.();
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <m.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            {/* Icon & Text */}
                            <div className="flex items-start gap-3 flex-1">
                                <div className="p-2 bg-teal-500/20 rounded-lg shrink-0">
                                    <Cookie className="w-5 h-5 text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm md:text-base mb-1">
                                        We respect your privacy 🍪
                                    </h3>
                                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                                        We use cookies for analytics to improve your experience.
                                        No personal data is sold. You can change this anytime in settings.
                                    </p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={handleDecline}
                                    className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white text-sm font-bold rounded-xl shadow-lg transition-all"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>

                        {/* Privacy link */}
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/50">
                            <Shield className="w-3 h-3 text-slate-400" />
                            <a
                                href="/privacy"
                                className="text-xs text-slate-400 hover:text-teal-400 transition-colors"
                            >
                                Read our Privacy Policy
                            </a>
                        </div>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
