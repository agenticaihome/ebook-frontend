import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

const ChapterNavigation = ({ previousChapter, nextChapter, partNumber, chapterNumber }) => {
    return (
        <div className="flex justify-between items-center py-8 px-6 border-t border-slate-800 mt-12 max-w-4xl mx-auto">
            {previousChapter ? (
                <Link
                    to={previousChapter}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all font-medium group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Chapter</span>
                </Link>
            ) : (
                <div />
            )}

            {/* Back to Main Page Button - Centered or placed appropriately */}
            <Link
                to="/"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
                <Home size={16} />
                <span>Main Page</span>
            </Link>

            {nextChapter ? (
                <Link
                    to={nextChapter}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all font-medium shadow-lg shadow-cyan-900/30 group"
                >
                    <span>Next Chapter</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            ) : (
                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-900/30 group"
                >
                    <span>Complete Part {partNumber}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            )}
        </div>
    );
};

export default ChapterNavigation;
