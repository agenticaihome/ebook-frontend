import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

/**
 * ChapterNavigation - Simple navigation for Previous chapter and Home
 * Note: "Next Chapter" is handled by MissionComplete component above this
 */
const ChapterNavigation = ({ previousChapter }) => {
    return (
        <div className="flex justify-between items-center py-8 px-6 border-t border-slate-800 mt-12 max-w-4xl mx-auto">
            {/* Previous Chapter Button */}
            {previousChapter ? (
                <Link
                    to={previousChapter}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all font-medium group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Discovery</span>
                </Link>
            ) : (
                <div />
            )}

            {/* Home Button - Always visible, centered */}
            <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white rounded-lg transition-all font-medium"
            >
                <Home size={18} />
                <span>Back to Home</span>
            </Link>

            {/* Empty space for layout balance */}
            {previousChapter ? <div className="w-[180px]" /> : <div />}
        </div>
    );
};

export default ChapterNavigation;

