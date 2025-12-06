import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PreLaunchBanner = () => {
    return (
        <div className="bg-slate-900/80 backdrop-blur-sm border-b border-amber-500/30 text-amber-400 px-4 py-2 text-center text-sm flex items-center justify-center gap-2 z-50 relative">
            <AlertTriangle size={14} className="flex-shrink-0 text-amber-500" />
            <span className="font-medium">
                🚧 <span className="uppercase tracking-wider text-amber-500">Pre-Launch:</span> Full webbook available <span className="underline decoration-amber-500/50">soon</span>
            </span>
        </div>
    );
};

export default PreLaunchBanner;
