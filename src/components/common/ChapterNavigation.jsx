import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import PrefetchLink from '../layout/PrefetchLink';

const ChapterNavigation = ({ previousChapter, nextChapter, partNumber, chapterNumber }) => {
    const isLoggedIn = !!localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false);

    const handleNavClick = () => setIsLoading(true);

    return (
        <div className="flex justify-between items-center py-8 px-6 border-t border-slate-800 mt-12 max-w-4xl mx-auto flex-wrap gap-4">
            {previousChapter ? (
                <PrefetchLink
                    to={previousChapter}
                    onClick={handleNavClick}
                    className={`flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all font-medium group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Chapter</span>
                </PrefetchLink>
            ) : (
                <div />
            )}

            {/* Back to Main Page Button */}
            <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
            >
                <Home size={16} />
                <span>Main Page</span>
            </Link>

            {nextChapter ? (
                <PrefetchLink
                    to={nextChapter}
                    onClick={handleNavClick}
                    className={`flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all font-medium shadow-lg shadow-cyan-900/30 group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                >
                    <span>{isLoading ? 'Loading...' : 'Next Chapter'}</span>
                    {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </PrefetchLink>
            ) : (
                <Link
                    to={isLoggedIn ? "/dashboard" : "/payment-guide"}
                    onClick={handleNavClick}
                    className={`flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-900/30 group focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                >
                    <span>{isLoading ? 'Loading...' : (isLoggedIn ? `Complete Part ${partNumber}` : 'Unlock Next Part')}</span>
                    {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </Link>
            )}
        </div>
    );
};

export default ChapterNavigation;
