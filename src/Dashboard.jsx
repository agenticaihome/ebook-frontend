import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Download, LogOut, User, Shield } from 'lucide-react';
import { api } from './services/api';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [purchases, setPurchases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await api.getCurrentUser();
                setUser(userData);

                const purchasesData = await api.getPurchases();
                setPurchases(purchasesData);
            } catch (err) {
                console.error('Failed to fetch data', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDownload = () => {
        // In a real app, this would call an API to get a signed URL
        // For now, we'll simulate a download or link to a static asset
        alert('Download starting...');
        window.location.href = '/agenticaihomefiles.zip';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Navbar */}
            <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Shield className="text-blue-500" size={24} />
                        <span className="text-white font-bold text-lg">Agentic AI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <User size={16} />
                            <span>{user?.email || 'User'}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Library</h1>
                        <p className="text-slate-400">Access your purchased content and resources.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Ebook Card */}
                        {purchases.length > 0 ? (
                            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all group">
                                <div className="h-48 bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center">
                                    <BookOpen className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={64} />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">Agentic AI at Home</h3>
                                    <p className="text-slate-400 text-sm mb-6">
                                        The complete guide to building autonomous AI agents in your local environment.
                                    </p>
                                    <button
                                        onClick={handleDownload}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Download size={18} />
                                        Access System Materials
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="col-span-full bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
                                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="text-slate-500" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No purchases found</h3>
                                <p className="text-slate-400 mb-6">You haven't purchased the system yet.</p>
                                <button
                                    onClick={() => navigate('/pay-ergo')}
                                    className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                                >
                                    Buy with Ergo
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;
