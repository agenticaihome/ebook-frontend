import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import {
    LayoutDashboard, CheckCircle, Circle, ArrowRight,
    Zap, Coffee, UtensilsCrossed, Home, Activity, Shield, Database,
    Calculator
} from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';
import CaptainHero from '../components/CaptainHero';
import { usePageTitle } from '../hooks/usePageTitle';
import { api } from '../services/api';

const Dashboard = () => {
    usePageTitle('Dashboard');
    const navigate = useNavigate();
    const [progress, setProgress] = useState({
        part1: true, // Always unlocked
        part2: false,
        part3: false,
        part4: false,
        part5: false
    });

    const [agents, setAgents] = useState([
        { id: 'morning', name: 'Morning Agent', status: 'NOT_STARTED', icon: Coffee, link: '/part2#chapter-4' },
        { id: 'kitchen', name: 'Kitchen Agent', status: 'NOT_STARTED', icon: UtensilsCrossed, link: '/part2#chapter-5' },
        { id: 'household', name: 'Household Agent', status: 'NOT_STARTED', icon: Home, link: '/part2#chapter-6' },
        { id: 'digital', name: 'Digital Agent', status: 'LOCKED', icon: Activity, link: '/part3' },
        { id: 'recovery', name: 'Recovery Agent', status: 'LOCKED', icon: Shield, link: '/part4' },
        { id: 'secondbrain', name: 'Second Brain', status: 'LOCKED', icon: Database, link: '/part4' },
    ]);

    useEffect(() => {
        // Auth Check
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Check local storage for progress
        const p2 = sessionStorage.getItem('auth_Part 2') === 'true';
        const p3 = sessionStorage.getItem('auth_Part 3') === 'true';
        // ... extend for other parts

        setProgress(prev => ({
            ...prev,
            part2: p2,
            part3: p3
        }));

        // Update agent status based on progress (simplified logic for now)
        if (p2) {
            setAgents(prev => prev.map(a =>
                ['morning', 'kitchen', 'household'].includes(a.id)
                    ? { ...a, status: 'BUILDING' }
                    : a
            ));
        }
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'DEPLOYED': return 'text-green-400 bg-green-900/20 border-green-500/50';
            case 'BUILDING': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/50';
            case 'NOT_STARTED': return 'text-slate-400 bg-slate-800/50 border-slate-700';
            case 'LOCKED': return 'text-slate-600 bg-slate-900/50 border-slate-800';
            default: return 'text-slate-400';
        }
    };

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-white pt-24 pb-24 px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                                <LayoutDashboard className="text-cyan-400" />
                                Command Center
                            </h1>
                            <p className="text-slate-400">System Status: <span className="text-green-400 font-mono">ONLINE</span></p>
                        </div>
                        <CaptainHero
                            size="sm"
                            message="Welcome back, Commander. Ready to deploy some agents?"
                        />
                    </div>

                    {/* Progress Overview */}
                    <section className="mb-12">
                        <h2 className="text-xl font-bold mb-6 text-slate-200">System Implementation Progress</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { id: 1, name: 'Foundations', active: progress.part1 },
                                { id: 2, name: 'Daily Ops', active: progress.part2 },
                                { id: 3, name: 'Digital Life', active: progress.part3 },
                                { id: 4, name: 'Health', active: progress.part4 },
                                { id: 5, name: 'Life OS', active: progress.part5 },
                            ].map((part) => (
                                <div key={part.id} className={`p-4 rounded-xl border ${part.active ? 'bg-cyan-900/20 border-cyan-500/50' : 'bg-slate-800/30 border-slate-700 opacity-50'}`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-mono text-slate-500">PART 0{part.id}</span>
                                        {part.active ? <CheckCircle size={16} className="text-cyan-400" /> : <Circle size={16} className="text-slate-600" />}
                                    </div>
                                    <div className={`font-bold ${part.active ? 'text-white' : 'text-slate-500'}`}>{part.name}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Agent Roster */}
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-bold mb-6 text-slate-200">Agent Roster</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {agents.map((agent) => {
                                    const Icon = agent.icon;
                                    return (
                                        <Link
                                            to={agent.link}
                                            key={agent.id}
                                            className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${getStatusColor(agent.status)}`}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="p-2 rounded-lg bg-black/20">
                                                    <Icon size={24} />
                                                </div>
                                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-black/20">
                                                    {agent.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-1">{agent.name}</h3>
                                            <div className="text-xs opacity-70 flex items-center gap-1">
                                                {agent.status === 'LOCKED' ? 'Requires Clearance' : 'Tap to Configure'}
                                                {agent.status !== 'LOCKED' && <ArrowRight size={12} />}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Tools */}
                        <div>
                            <h2 className="text-xl font-bold mb-6 text-slate-200">Quick Tools</h2>
                            <div className="space-y-4">
                                <Link to="/#calculator" className="block p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-cyan-900/30 p-2 rounded-lg text-cyan-400 group-hover:text-cyan-300">
                                            <Calculator size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-200">Time Calculator</div>
                                            <div className="text-xs text-slate-500">Audit your weekly hours</div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/part1#diagnostic" className="block p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 rounded-xl transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-purple-900/30 p-2 rounded-lg text-purple-400 group-hover:text-purple-300">
                                            <Activity size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-200">Infection Diagnostic</div>
                                            <div className="text-xs text-slate-500">Check your "busy" levels</div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl">
                                    <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                                        <Zap size={16} /> Pro Tip
                                    </h3>
                                    <p className="text-sm text-slate-300">
                                        "Don't try to build everything at once. Focus on the Morning Agent first. It buys you the time to build the rest."
                                    </p>
                                </div>
                            </div>

                            {/* System Configuration (Password Change) */}
                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-6 text-slate-200">System Configuration</h2>
                                <ChangePasswordForm />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </WebbookLayout>
    );
};

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState('IDLE'); // IDLE, LOADING, SUCCESS, ERROR
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('LOADING');
        setMessage('');

        try {
            const data = await api.changePassword(currentPassword, newPassword);

            if (data.success) {
                setStatus('SUCCESS');
                setMessage('Password updated successfully.');
                setCurrentPassword('');
                setNewPassword('');
            } else {
                setStatus('ERROR');
                setMessage(data.error || 'Failed to update password.');
            }
        } catch (err) {
            setStatus('ERROR');
            setMessage(err.message || 'Network error. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-xl">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Shield size={16} className="text-cyan-400" /> Security Settings
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none transition-colors"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none transition-colors"
                        required
                    />
                </div>

                {message && (
                    <div className={`text-xs p-2 rounded ${status === 'SUCCESS' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'LOADING'}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                    {status === 'LOADING' ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

export default Dashboard;
