import React from 'react';
import { Sparkles, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PreLaunchBanner = () => {
    return (
        <div className="bg-gradient-to-r from-teal-900/80 to-cyan-900/80 backdrop-blur-sm border-b border-teal-500/30 text-teal-300 px-4 py-2 text-center text-sm flex items-center justify-center gap-3 z-50 relative">
            <Sparkles size={14} className="flex-shrink-0 text-teal-400 animate-pulse" />
            <span className="font-medium">
                <span className="text-white font-bold">Launch Price: $39.99</span>
                <span className="mx-2 text-teal-500">•</span>
                <span className="text-teal-300">Increases at 1,000 members</span>
            </span>
            <Link to="/unlock" className="ml-2 px-3 py-1 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 rounded-full text-xs font-bold text-teal-300 hover:text-white transition-all flex items-center gap-1">
                <Shield size={10} />
                30-day guarantee
            </Link>
        </div>
    );
};

export default PreLaunchBanner;
