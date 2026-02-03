import React from 'react';
import { Sparkles, Shield, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const PreLaunchBanner = () => {
    const location = useLocation();
    
    // Only show banner on course content pages, not on catalog/landing
    const isCoursePage = location.pathname.includes('/courses/') || 
                         location.pathname.includes('/part') ||
                         location.pathname.includes('/intro');
    
    // Don't show on catalog or landing
    if (location.pathname === '/courses' || location.pathname === '/') {
        return null;
    }
    
    // Determine which course we're in
    const isBusinessCourse = location.pathname.includes('/courses/business');
    
    return (
        <div className={`backdrop-blur-sm border-b px-4 py-2 text-center text-sm flex items-center justify-center gap-3 z-50 relative ${
            isBusinessCourse 
                ? 'bg-gradient-to-r from-amber-900/80 to-orange-900/80 border-amber-500/30 text-amber-300'
                : 'bg-gradient-to-r from-teal-900/80 to-cyan-900/80 border-teal-500/30 text-teal-300'
        }`}>
            <Sparkles size={14} className={`flex-shrink-0 animate-pulse ${isBusinessCourse ? 'text-amber-400' : 'text-teal-400'}`} />
            <span className="font-medium">
                <span className="text-white font-bold">
                    {isBusinessCourse ? 'NEW: AI for Small Business' : 'AI at Home Course'}
                </span>
                <span className={`mx-2 ${isBusinessCourse ? 'text-amber-500' : 'text-teal-500'}`}>•</span>
                <span className={isBusinessCourse ? 'text-amber-300' : 'text-teal-300'}>
                    30-day money-back guarantee
                </span>
            </span>
            <Link 
                to="/courses" 
                className={`ml-2 px-3 py-1 border rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                    isBusinessCourse
                        ? 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-300 hover:text-white'
                        : 'bg-teal-500/20 hover:bg-teal-500/30 border-teal-500/40 text-teal-300 hover:text-white'
                }`}
            >
                All Courses
                <ArrowRight size={10} />
            </Link>
        </div>
    );
};

export default PreLaunchBanner;
