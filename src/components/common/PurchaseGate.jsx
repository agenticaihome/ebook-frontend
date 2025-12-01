import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Loader } from 'lucide-react';
import { api } from '../../services/api';

const PurchaseGate = ({ children }) => {
    const [hasAccess, setHasAccess] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAccess = async () => {
            try {
                // JWT in httpOnly cookie - API call will send it automatically
                const response = await api.checkAccess();
                setHasAccess(response.hasAccess);
            } catch (error) {
                console.error('Access check failed:', error);
                setHasAccess(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAccess();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
                <div className="animate-spin text-cyan-500">
                    <Loader size={48} />
                </div>
            </div>
        );
    }

    if (hasAccess) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="text-cyan-500" size={40} />
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">Content Locked</h2>
                <p className="text-slate-400 mb-8">
                    This section is part of the full Agentic AI at Home system.
                    Purchase the complete guide to unlock Parts 2-5 and all agent templates.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/ergo-guide')}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2"
                    >
                        <ShieldCheck size={20} />
                        Unlock Full Access
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-slate-500 hover:text-white text-sm transition-colors"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseGate;
