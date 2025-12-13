import React from 'react';
import { Monitor, QrCode, Globe, CheckCircle } from 'lucide-react';

const SchematicPlaceholder = ({ type = 'browser', label, subLabel }) => {
    // Render different wireframes based on type
    const renderContent = () => {
        switch (type) {
            case 'browser':
                return (
                    <div className="w-full h-full flex flex-col">
                        {/* Browser Bar */}
                        <div className="h-6 bg-slate-800 border-b border-slate-600 flex items-center px-3 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="flex-1 h-3 bg-slate-900 rounded-full mx-2 opacity-50"></div>
                        </div>
                        {/* Content Area */}
                        <div className="flex-1 bg-slate-900/30 p-4 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                            </div>
                            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                                <Globe className="text-slate-600 mb-3" size={32} />
                                <div className="w-3/4 h-2 bg-slate-700/50 rounded mb-2"></div>
                                <div className="w-1/2 h-2 bg-slate-700/50 rounded"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'mobile':
                return (
                    <div className="w-full h-full flex justify-center items-center py-2">
                        <div className="w-32 h-full border-2 border-slate-600 rounded-2xl bg-slate-900/50 relative flex flex-col overflow-hidden">
                            <div className="h-4 bg-slate-800 border-b border-slate-600 w-full flex justify-center items-center">
                                <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-2">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 mb-2 flex items-center justify-center">
                                    <div className="w-6 h-6 bg-green-500/20 rounded-full"></div>
                                </div>
                                <div className="w-16 h-1.5 bg-slate-700/50 rounded mb-1"></div>
                                <div className="w-10 h-1.5 bg-slate-700/50 rounded"></div>
                            </div>
                            <div className="h-8 bg-slate-800 border-t border-slate-600 w-full"></div>
                        </div>
                    </div>
                );
            case 'card':
                return (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-48 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-slate-600 p-4 relative shadow-lg">
                            <div className="w-8 h-5 bg-yellow-500/20 rounded mb-4"></div>
                            <div className="w-full h-2 bg-slate-900/30 rounded mb-2"></div>
                            <div className="flex justify-between items-end mt-4">
                                <div className="w-16 h-2 bg-slate-900/30 rounded"></div>
                                <div className="w-8 h-8 rounded-full bg-white/10"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'qr':
                return (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="p-3 bg-white rounded-lg">
                            <QrCode className="text-slate-900" size={64} />
                        </div>
                    </div>
                );
            case 'success':
                return (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                            <CheckCircle className="text-green-500" size={40} />
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="w-full h-full bg-slate-800/50 flex items-center justify-center">
                        <Monitor className="text-slate-600" size={32} />
                    </div>
                );
        }
    };

    return (
        <div className="w-full bg-slate-900/50 rounded-xl border border-slate-600/50 overflow-hidden mb-6 group hover:border-green-500/30 transition-colors">
            <div className="h-48 relative">
                {renderContent()}

                {/* Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 border-t border-slate-600 p-3 flex items-center justify-between backdrop-blur-sm">
                    <div>
                        <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-0.5">Visual Guide</div>
                        <div className="text-sm text-white font-medium">{label}</div>
                    </div>
                    {subLabel && <div className="text-xs text-slate-300">{subLabel}</div>}
                </div>
            </div>
        </div>
    );
};

export default SchematicPlaceholder;
