import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Play, Maximize2 } from 'lucide-react';
import dashboardPreview from '../../assets/dashboard-preview.webp';

const ProductWalkthrough = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-16 px-6 bg-[#0f0f1a] border-y border-slate-800/50">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-white">See It In Action</h2>
                    <p className="text-slate-400">
                        Watch how the system handles a chaotic Monday morning in 60 seconds.
                    </p>
                </div>

                <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-600 shadow-2xl shadow-purple-900/20 group">
                    {/* Placeholder for actual video */}
                    {!isPlaying ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-50"
                                style={{ backgroundImage: `url(${dashboardPreview})` }}
                            />

                            <m.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsPlaying(true)}
                                className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors"
                            >
                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                            </m.button>

                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                <div>
                                    <div className="text-white font-bold text-lg">The "Morning Agent" Workflow</div>
                                    <div className="text-slate-300 text-sm">0:58 • Walkthrough</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                            <p className="text-slate-400">Video Player Placeholder (src/assets/walkthrough.mp4)</p>
                            {/* 
                                <video 
                                    src="/assets/walkthrough.mp4" 
                                    controls 
                                    autoPlay 
                                    className="w-full h-full object-cover" 
                                /> 
                            */}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductWalkthrough;
