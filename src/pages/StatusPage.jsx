import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, Clock, ExternalLink, Mail } from 'lucide-react';

// ============================================
// STATUS PAGE - System Status & Known Issues
// Shows operational status and helps users
// when they can't reach support immediately
// ============================================

const StatusPage = () => {
    // In a real implementation, this could fetch from an API
    // For now, we'll use a simple static status
    const systemStatus = {
        overall: 'operational', // 'operational', 'degraded', 'outage'
        lastUpdated: new Date().toISOString(),
        services: [
            { name: 'Website', status: 'operational' },
            { name: 'User Authentication', status: 'operational' },
            { name: 'Payment Processing', status: 'operational' },
            { name: 'Email Delivery', status: 'operational' },
        ]
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'operational': return 'text-green-400';
            case 'degraded': return 'text-amber-400';
            case 'outage': return 'text-red-400';
            default: return 'text-slate-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'operational': return <CheckCircle className="text-green-400" size={20} />;
            case 'degraded': return <Clock className="text-amber-400" size={20} />;
            case 'outage': return <AlertCircle className="text-red-400" size={20} />;
            default: return <Clock className="text-slate-400" size={20} />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'operational': return 'All Systems Operational';
            case 'degraded': return 'Experiencing Issues';
            case 'outage': return 'Service Disruption';
            default: return 'Unknown';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <Helmet>
                <title>System Status - Agentic AI at Home</title>
                <meta name="description" content="Check the current status of Agentic AI at Home services." />
            </Helmet>

            <div className="max-w-2xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">System Status</h1>
                    <p className="text-slate-400">Current operational status of our services</p>
                </div>

                {/* Overall Status */}
                <div className={`mb-8 p-6 rounded-2xl border ${systemStatus.overall === 'operational'
                        ? 'bg-green-900/20 border-green-500/30'
                        : systemStatus.overall === 'degraded'
                            ? 'bg-amber-900/20 border-amber-500/30'
                            : 'bg-red-900/20 border-red-500/30'
                    }`}>
                    <div className="flex items-center justify-center gap-3">
                        {getStatusIcon(systemStatus.overall)}
                        <span className={`text-xl font-bold ${getStatusColor(systemStatus.overall)}`}>
                            {getStatusText(systemStatus.overall)}
                        </span>
                    </div>
                    <p className="text-center text-slate-500 text-sm mt-2">
                        Last updated: {new Date(systemStatus.lastUpdated).toLocaleString()}
                    </p>
                </div>

                {/* Individual Services */}
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden mb-8">
                    <div className="p-4 border-b border-slate-700/50">
                        <h2 className="text-white font-bold">Services</h2>
                    </div>
                    <div className="divide-y divide-slate-700/50">
                        {systemStatus.services.map((service, index) => (
                            <div key={index} className="p-4 flex items-center justify-between">
                                <span className="text-slate-300">{service.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm ${getStatusColor(service.status)}`}>
                                        {service.status === 'operational' ? 'Operational' : service.status}
                                    </span>
                                    {getStatusIcon(service.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Common Issues */}
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 mb-8">
                    <h2 className="text-white font-bold mb-4">Having Trouble?</h2>

                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="text-white font-medium mb-1">Can't log in?</p>
                            <p className="text-slate-400">
                                Try the <Link to="/login" className="text-teal-400 hover:underline">"Forgot Password"</Link> option.
                                If your account is locked, it will auto-unlock in 30 minutes.
                            </p>
                        </div>

                        <div>
                            <p className="text-white font-medium mb-1">Didn't receive access email?</p>
                            <p className="text-slate-400">
                                Check your spam folder. Emails can take 5-10 minutes to arrive.
                                Still nothing? Contact us below.
                            </p>
                        </div>

                        <div>
                            <p className="text-white font-medium mb-1">Payment issue?</p>
                            <p className="text-slate-400">
                                Your payment is safe. If it succeeded, you'll receive an email.
                                For Ergo payments, check the <Link to="/why-ergo" className="text-teal-400 hover:underline">payment guide</Link>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="text-center">
                    <p className="text-slate-400 mb-4">Need more help?</p>
                    <a
                        href="mailto:support@agenticaihome.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-medium transition-colors"
                    >
                        <Mail size={18} />
                        Contact Support
                    </a>
                    <p className="text-slate-500 text-xs mt-4">
                        We typically respond within 24 hours
                    </p>
                </div>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StatusPage;
