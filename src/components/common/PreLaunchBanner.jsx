import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PreLaunchBanner = () => {
    return (
        <div className="bg-amber-500 text-black px-4 py-3 text-center font-bold flex items-center justify-center gap-2 shadow-lg z-50 relative">
            <AlertTriangle size={20} className="flex-shrink-0" />
            <span>
                🚧 <span className="uppercase tracking-wider">Pre-Launch Mode:</span> Please do not make purchases yet. The full webbook will be available <span className="underline decoration-black/30 decoration-2">soon</span>.
            </span>
        </div>
    );
};

export default PreLaunchBanner;
