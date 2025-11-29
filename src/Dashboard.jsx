import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Download, LogOut, User, Shield, Edit2, CheckCircle2, X } from 'lucide-react';
import { api } from './services/api';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [purchases, setPurchases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await api.getCurrentUser();
                setUser(userData);

                const purchasesData = await api.getPurchases();
                setPurchases(Array.isArray(purchasesData) ? purchasesData : []);
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

    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        if (!newEmail || !newEmail.includes('@')) {
            toast.error('Invalid email');
            return;
        }

        try {
            const res = await api.updateEmail(newEmail);
            if (res.success) {
                toast.success('Email updated!');
                setUser({ ...user, email: newEmail });
                setIsEditingEmail(false);
            } else {
                toast.error(res.error || 'Failed to update');
            }
        } catch (err) {
            toast.error('Server error');
        }
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
                            {/* Email Display / Edit */}
                            {isEditingEmail ? (
                                <form onSubmit={handleUpdateEmail} className="flex items-center gap-2">
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="bg-slate-700 text-white px-2 py-1 rounded text-xs border border-slate-600 focus:border-blue-500 outline-none"
                                        placeholder="New email"
                                        autoFocus
                                    />
                                    <button type="submit" className="text-green-400 hover:text-green-300">
                                        <CheckCircle2 size={16} />
                                    </button>
                                    <button type="button" onClick={() => setIsEditingEmail(false)} className="text-red-400 hover:text-red-300">
                                        <X size={16} />
                                    </button>
                                </form>
                            ) : (
                                <div className="flex items-center gap-2 group">
                                    <span>{user?.email || 'User'}</span>
                                    <button
                                        onClick={() => {
                                            setNewEmail(user?.email || '');
                                            setIsEditingEmail(true);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-blue-400 transition-opacity"
                                        title="Update Email"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                </div>
                            )}
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
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome back. Your systems missed you.</h1>
                        <p className="text-slate-400">Ready to pick up where we left off?</p>
                    </div>

                    <div className="col-span-full">
                        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                            <div className="p-6 border-b border-slate-700">
                                <h2 className="text-xl font-bold text-white">Your System Access</h2>
                                <p className="text-slate-400 text-sm">Manage your access to the Agentic AI at Home guide.</p>
                            </div>

                            <div className="divide-y divide-slate-700">
                                {/* Part 1 - Always Free */}
                                <div className="p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">Part 1: The Foundation</h3>
                                            <p className="text-slate-400 text-sm">Free Introduction</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/part1')}
                                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Read Now
                                    </button>
                                </div>

                                {/* Parts 2-5 - Require Purchase */}
                                {[2, 3, 4, 5].map((partNum) => {
                                    const hasAccess = purchases?.length > 0;
                                    return (
                                        <div key={partNum} className="p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasAccess ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-500'}`}>
                                                    {hasAccess ? <CheckCircle2 size={20} /> : <Shield size={20} />}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white">Part {partNum}</h3>
                                                    <p className="text-slate-400 text-sm">{hasAccess ? 'Unlocked' : 'Locked - Purchase Required'}</p>
                                                </div>
                                            </div>
                                            {hasAccess ? (
                                                <button
                                                    onClick={() => navigate(`/part${partNum}`)}
                                                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    Read Now
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => navigate('/pay-ergo')}
                                                    className="px-4 py-2 bg-slate-700 text-slate-400 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-600 hover:text-white transition-colors"
                                                >
                                                    <Shield size={14} />
                                                    Unlock
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;
