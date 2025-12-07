import React from 'react';

const Loading = ({ message = "Initializing..." }) => (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
        <p className="text-cyan-500/80 font-mono text-sm tracking-widest animate-pulse">{message}</p>
    </div>
);

export default Loading;
