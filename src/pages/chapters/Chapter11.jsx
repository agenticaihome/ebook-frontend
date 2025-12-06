import { Helmet } from 'react-helmet-async';
import ChapterNavigation from '../../components/common/ChapterNavigation';
import PasswordGate from '../../components/common/PasswordGate';

import React, { useState, Suspense, createContext } from 'react';
import { motion } from 'framer-motion';
import {
    Clock, Zap, CheckCircle, ArrowRight,
    Sparkles, Share2, Copy, Eye, EyeOff, Heart, Users, UserPlus,
    Calendar, MessageCircle, Gift, Phone, Coffee,
    Star, Cake, Award,
    Link2
} from 'lucide-react';

// Lazy load interactive components
const RelationshipAuditCalculator = React.lazy(() => import('../../components/RelationshipAuditCalculator'));
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
import AIToolLinks from '../../components/AIToolLinks';
import FAQSection, { chapter11FAQs } from '../../components/FAQSection';

// Game Components
import MissionBriefing from '../../components/gamification/MissionBriefing';
import MissionComplete from '../../components/gamification/MissionComplete';
import ObjectivesChecklist from '../../components/gamification/ObjectivesChecklist';
import FutureProofBanner from '../../components/gamification/FutureProofBanner';
import IntelReport from '../../components/gamification/IntelReport';

// ============================================
// SPEED RUN CONTEXT
// ============================================
const SpeedRunContext = createContext(false);

// ============================================
// REUSABLE COMPONENTS (matching previous chapters)
// ============================================

const ChapterProgress = ({ current, total, part, partTitle }) => (
    <div className="mb-6">
        {part && (
            <div className="text-rose-400 font-bold text-sm mb-2 uppercase tracking-wider">
                Part {part}: {partTitle}
            </div>
        )}
        <div className="flex items-center gap-3">
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(current / total) * 100}%` }}
                    className="h-full bg-gradient-to-r from-rose-500 to-orange-500"
                />
            </div>
            <span className="text-slate-500 text-sm font-mono">
                {current}/{total}
            </span>
        </div>
    </div>
);

const SpeedRunToggle = ({ enabled, onToggle }) => (
    <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${enabled
            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50'
            : 'bg-slate-800/30 text-slate-400 border border-slate-500/40 hover:border-slate-400 backdrop-blur-sm'
            }`}
    >
        {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
        {enabled ? 'Professional Mode: ON' : 'Professional Mode: OFF'}
    </button>
);

const TLDRCard = ({ stats, primaryCTA, onCTAClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-900/40 to-orange-900/40 rounded-2xl p-6 border border-rose-500/30 mb-8"
    >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                ))}
            </div>
            <button
                onClick={onCTAClick}
                className="flex items-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
            >
                {primaryCTA} <ArrowRight size={18} />
            </button>
        </div>
    </motion.div>
);

const ShareableQuote = ({ quote, chapter }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`"${quote}" — The Agentic AI Adventure, Discovery ${chapter}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-8 border border-slate-500/40 backdrop-blur-sm mb-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl" />

            <div className="relative">
                <div className="text-6xl text-rose-500/30 font-serif leading-none mb-2">"</div>
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-4 -mt-8 pl-8">
                    {quote}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">— Discovery {chapter}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${copied
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-slate-700/50 text-slate-400 hover:text-white'
                                }`}
                        >
                            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-slate-700/50 text-slate-400 hover:text-white transition-all">
                            <Share2 size={14} />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuickWin = ({ title, prompt, setupTime, variant = 'default' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const variants = {
        default: 'from-green-900/30 to-emerald-900/20 border-green-500/40',
        secondary: 'from-rose-900/30 to-pink-900/20 border-rose-500/40',
        tertiary: 'from-blue-900/30 to-teal-900/20 border-blue-500/40',
        bonus: 'from-yellow-900/30 to-orange-900/20 border-yellow-500/40',
    };

    const labelColors = {
        default: 'text-green-400',
        secondary: 'text-rose-400',
        tertiary: 'text-blue-400',
        bonus: 'text-yellow-400',
    };

    return (
        <div className={`bg-gradient-to-br ${variants[variant]} rounded-2xl p-6 border backdrop-blur-sm mb-6`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Zap className={labelColors[variant]} size={20} />
                    <span className={`${labelColors[variant]} font-bold uppercase text-sm tracking-wider`}>
                        {variant === 'bonus' ? 'Bonus Prompt' : 'Agent Prompt'}
                    </span>
                </div>
                <span className="text-slate-400 text-sm">{setupTime}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>

            <div className="bg-slate-900/80 rounded-xl p-4 font-mono text-sm text-slate-300 mb-4 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap">{prompt}</pre>
            </div>

            <button
                onClick={handleCopy}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
            >
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
        </div>
    );
};

const ChapterComplete = ({ achievements, nextChapter, nextTitle }) => (
    <div className="bg-gradient-to-r from-green-900/30 to-rose-900/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
                <span className="text-green-400 font-bold block">Discovery 11 Complete</span>
                <span className="text-slate-400 text-sm">You're 69% of the way there</span>
            </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
            <p className="text-white font-bold text-sm mb-3">What you built:</p>
            <ul className="space-y-2">
                {achievements.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold px-6 py-4 rounded-xl transition-all">
            Continue to Chapter {nextChapter}: {nextTitle}
            <ArrowRight size={18} />
        </button>
    </div>
);

// ============================================
// Discovery 11 SPECIFIC COMPONENTS
// ============================================

// The Relationship Fade Visual
const RelationshipFadeVisual = () => {
    const [hoveredPerson, setHoveredPerson] = useState(null);

    const fadingConnections = [
        { name: 'College roommate', lastContact: '8 months ago', memory: 'Were inseparable for 4 years', opacity: 0.3 },
        { name: 'Aunt who believed in you', lastContact: '6 months ago', memory: 'Sent you $50 for every birthday', opacity: 0.4 },
        { name: 'Old mentor', lastContact: '1 year ago', memory: 'Helped you get your first job', opacity: 0.2 },
        { name: 'Childhood best friend', lastContact: '4 months ago', memory: 'Knew all your secrets', opacity: 0.5 },
        { name: 'Former colleague', lastContact: '10 months ago', memory: 'Made work actually fun', opacity: 0.25 },
        { name: 'Neighbor who moved', lastContact: '14 months ago', memory: 'Always there when you needed help', opacity: 0.15 },
    ];

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-rose-500/30 backdrop-blur-sm mb-8 relative overflow-hidden">
            {/* Fading connection lines in background */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-rose-500 to-transparent"
                        style={{
                            top: `${20 + i * 10}%`,
                            left: '50%',
                            width: '40%',
                            transform: `rotate(${i * 45}deg)`,
                        }}
                        animate={{ opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">The Relationship Fade</h2>
                        <p className="text-slate-400 text-sm">Connections that matter most often fade first</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-rose-400">6+</div>
                        <div className="text-slate-500 text-xs">fading connections</div>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    {fadingConnections.map((person, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onMouseEnter={() => setHoveredPerson(i)}
                            onMouseLeave={() => setHoveredPerson(null)}
                            className="relative"
                        >
                            <div
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${hoveredPerson === i
                                    ? 'bg-rose-900/30 border-rose-500/50'
                                    : 'bg-slate-900/50 border-slate-700'
                                    }`}
                                style={{ opacity: hoveredPerson === i ? 1 : 0.5 + person.opacity }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400"
                                        style={{ opacity: person.opacity + 0.3 }}
                                    >
                                        {person.name.charAt(0)}
                                    </div>
                                    <div>
                                        <span className="text-white font-medium">{person.name}</span>
                                        <span className="text-slate-500 text-sm block">{person.memory}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-rose-400 text-sm">{person.lastContact}</span>
                                    <div className="w-16 h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                                        <div
                                            className="h-full bg-rose-500 rounded-full"
                                            style={{ width: `${person.opacity * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-4 bg-slate-900/50 rounded-xl">
                    <p className="text-slate-300 text-sm">
                        <span className="text-rose-400 font-bold">The truth:</span> You didn't stop caring.
                        Life just got busy. These connections faded not from lack of love, but from lack of
                        a <span className="text-white">system</span>.
                    </p>
                    <p className="text-teal-400 text-sm mt-2 font-medium">
                        Your Connection Agent will make sure the people who matter never slip away.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Relationship Circles Framework
const RelationshipCircles = () => {
    const circles = [
        {
            name: 'Inner Circle',
            color: 'rose',
            frequency: 'Weekly',
            count: '5-7 people',
            examples: 'Partner, kids, parents, best friends',
            description: 'The people you can\'t imagine life without',
        },
        {
            name: 'Close Circle',
            color: 'orange',
            frequency: 'Monthly',
            count: '15-20 people',
            examples: 'Good friends, siblings, close colleagues',
            description: 'People you\'d drop everything for',
        },
        {
            name: 'Maintain Circle',
            color: 'yellow',
            frequency: 'Quarterly',
            count: '50-100 people',
            examples: 'Extended family, old friends, network',
            description: 'Connections worth keeping warm',
        },
        {
            name: 'Reconnect Circle',
            color: 'blue',
            frequency: 'Yearly',
            count: '100+ people',
            examples: 'Former colleagues, college friends, acquaintances',
            description: 'People you\'d love to catch up with',
        },
    ];

    const colors = {
        rose: 'from-rose-900/40 to-rose-900/20 border-rose-500/40 text-rose-400',
        orange: 'from-orange-900/40 to-orange-900/20 border-orange-500/40 text-orange-400',
        yellow: 'from-yellow-900/40 to-yellow-900/20 border-yellow-500/40 text-yellow-400',
        blue: 'from-blue-900/40 to-blue-900/20 border-blue-500/40 text-blue-400',
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">The Relationship Circles</h2>
            <p className="text-slate-400 mb-6">
                Not all relationships need the same attention. Intentional ≠ equal.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                {circles.map((circle, i) => (
                    <motion.div
                        key={circle.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-gradient-to-br ${colors[circle.color]} rounded-xl p-5 border backdrop-blur-sm`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{circle.name}</h3>
                            <span className="text-sm bg-slate-900/50 px-2 py-1 rounded-lg">
                                {circle.frequency}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-3">{circle.description}</p>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">{circle.count}</span>
                            <span className="text-slate-400 italic">{circle.examples}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-teal-900/20 rounded-xl border border-teal-500/30">
                <p className="text-teal-400 text-sm">
                    <strong>The magic:</strong> Your agent reminds you to reach out at the right frequency.
                    Weekly for inner circle, monthly for close, quarterly for maintain, yearly for reconnect.
                </p>
            </div>
        </div>
    );
};

// People Mapper Tool
const PeopleMapper = () => {
    const [people, setPeople] = useState([
        { name: '', circle: 'inner', lastContact: '', birthday: '' },
    ]);

    const circles = [
        { value: 'inner', label: 'Inner (Weekly)' },
        { value: 'close', label: 'Close (Monthly)' },
        { value: 'maintain', label: 'Maintain (Quarterly)' },
        { value: 'reconnect', label: 'Reconnect (Yearly)' },
    ];

    const addPerson = () => {
        setPeople([...people, { name: '', circle: 'close', lastContact: '', birthday: '' }]);
    };

    const updatePerson = (index, field, value) => {
        setPeople(p => p.map((person, i) =>
            i === index ? { ...person, [field]: value } : person
        ));
    };

    const removePerson = (index) => {
        setPeople(p => p.filter((_, i) => i !== index));
    };

    const circleColors = {
        inner: 'border-rose-500/50 bg-rose-900/20',
        close: 'border-orange-500/50 bg-orange-900/20',
        maintain: 'border-yellow-500/50 bg-yellow-900/20',
        reconnect: 'border-blue-500/50 bg-blue-900/20',
    };

    return (
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl p-6 border border-slate-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                        <Users className="text-rose-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Map Your People</h3>
                        <p className="text-slate-400 text-sm">Start with 5-10 important connections</p>
                    </div>
                </div>
                <button
                    onClick={addPerson}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 text-sm hover:bg-rose-500/30 transition-all"
                >
                    <UserPlus size={14} /> Add
                </button>
            </div>

            <div className="space-y-3 mb-4">
                {people.map((person, i) => (
                    <div
                        key={i}
                        className={`flex flex-wrap items-center gap-3 rounded-xl p-3 border transition-all ${circleColors[person.circle]}`}
                    >
                        <input
                            type="text"
                            value={person.name}
                            onChange={(e) => updatePerson(i, 'name', e.target.value)}
                            placeholder="Name"
                            className="flex-1 min-w-[120px] bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 text-sm"
                        />
                        <select
                            value={person.circle}
                            onChange={(e) => updatePerson(i, 'circle', e.target.value)}
                            className="bg-slate-900/50 text-slate-300 text-sm rounded-lg px-2 py-2 border border-slate-700"
                        >
                            {circles.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={person.lastContact}
                            onChange={(e) => updatePerson(i, 'lastContact', e.target.value)}
                            placeholder="Last contact"
                            className="w-32 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none text-sm"
                        />
                        <input
                            type="text"
                            value={person.birthday}
                            onChange={(e) => updatePerson(i, 'birthday', e.target.value)}
                            placeholder="Birthday (optional)"
                            className="w-32 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none text-sm"
                        />
                        <button
                            onClick={() => removePerson(i)}
                            className="text-slate-500 hover:text-red-400 transition-all p-2"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {people.filter(p => p.name).length > 0 && (
                <div className="p-4 bg-slate-900/50 rounded-xl">
                    <p className="text-slate-400 text-sm">
                        <strong className="text-rose-400">{people.filter(p => p.name).length} people mapped.</strong> Your Connection Agent will remind you to reach out based on each person's circle.
                    </p>
                </div>
            )}
        </div>
    );
};

// Occasion Tracker
const OccasionTracker = () => {
    const occasions = [
        { type: 'Birthday', icon: Cake, color: 'rose', reminder: '1 week before' },
        { type: 'Anniversary', icon: Heart, color: 'red', reminder: '1 week before' },
        { type: 'Work milestone', icon: Award, color: 'yellow', reminder: 'Day of' },
        { type: 'Life event', icon: Star, color: 'purple', reminder: 'As it happens' },
        { type: 'Holiday greeting', icon: Gift, color: 'green', reminder: '3 days before' },
        { type: 'Check-in due', icon: MessageCircle, color: 'blue', reminder: 'Based on circle' },
    ];

    const colors = {
        rose: 'text-rose-400 bg-rose-500/20',
        red: 'text-red-400 bg-red-500/20',
        yellow: 'text-yellow-400 bg-yellow-500/20',
        purple: 'text-purple-400 bg-purple-500/20',
        green: 'text-green-400 bg-green-500/20',
        blue: 'text-blue-400 bg-blue-500/20',
    };

    return (
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl p-6 border border-purple-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Calendar className="text-purple-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Never Miss an Occasion</h3>
                    <p className="text-slate-400 text-sm">Your agent tracks what matters</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {occasions.map((occasion, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-slate-900/50 rounded-xl p-3 border border-slate-700"
                    >
                        <div className={`w-8 h-8 rounded-lg ${colors[occasion.color]} flex items-center justify-center mb-2`}>
                            <occasion.icon size={16} />
                        </div>
                        <div className="text-white text-sm font-medium">{occasion.type}</div>
                        <div className="text-slate-500 text-xs">{occasion.reminder}</div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
                <p className="text-purple-400 text-sm">
                    <strong>The gift:</strong> Being the person who always remembers. Your agent makes thoughtfulness effortless.
                </p>
            </div>
        </div>
    );
};

// Connection Ideas Generator Preview
const ConnectionIdeasPreview = () => {
    const ideas = [
        { action: 'Send a voice note', effort: 'Low', time: '30 sec', icon: MessageCircle },
        { action: 'Share an article they\'d like', effort: 'Low', time: '1 min', icon: Link2 },
        { action: 'Comment on their post', effort: 'Low', time: '30 sec', icon: Heart },
        { action: 'Schedule a quick call', effort: 'Medium', time: '15 min', icon: Phone },
        { action: 'Send a small gift', effort: 'Medium', time: '5 min', icon: Gift },
        { action: 'Plan an in-person meetup', effort: 'High', time: 'Hours', icon: Coffee },
    ];

    const effortColors = {
        Low: 'text-green-400 bg-green-500/20',
        Medium: 'text-yellow-400 bg-yellow-500/20',
        High: 'text-orange-400 bg-orange-500/20',
    };

    return (
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/40 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Sparkles className="text-green-400" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Connection Ideas</h3>
                    <p className="text-slate-400 text-sm">Ways to reach out that feel natural</p>
                </div>
            </div>

            <div className="space-y-2">
                {ideas.map((idea, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-700"
                    >
                        <div className="flex items-center gap-3">
                            <idea.icon className="text-green-400" size={18} />
                            <span className="text-white text-sm">{idea.action}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-lg ${effortColors[idea.effort]}`}>
                                {idea.effort}
                            </span>
                            <span className="text-slate-500 text-xs">{idea.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
                <p className="text-green-400 text-sm">
                    <strong>The secret:</strong> Consistency beats intensity. A 30-second voice note every month
                    beats radio silence for a year then an awkward "let's catch up" text.
                </p>
            </div>
        </div>
    );
};

// Case Study Card
const CaseStudyCard = ({ name, role, problem, result, timeframe, quote }) => (
    <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-xl p-5 border border-slate-500/40 backdrop-blur-sm mb-8">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 text-sm">
                {name.charAt(0)}
            </div>
            <div>
                <span className="text-white font-medium">{name}</span>
                <span className="text-slate-500 text-sm ml-2">{role}</span>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20">
                <span className="text-red-400 text-xs font-bold uppercase">Before</span>
                <p className="text-slate-300 text-sm mt-1">{problem}</p>
            </div>
            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                <span className="text-green-400 text-xs font-bold uppercase">After {timeframe}</span>
                <p className="text-slate-300 text-sm mt-1">{result}</p>
            </div>
        </div>

        <p className="text-slate-400 text-sm italic border-l-2 border-rose-500/50 pl-3">
            "{quote}"
        </p>
    </div>
);

// ============================================
// Discovery 11 MAIN COMPONENT
// ============================================

const Chapter11 = () => {
    const [speedRun, setSpeedRun] = useState(false);

    const scrollToCalculator = () => {
        document.getElementById('relationship-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const connectionAgentPrompt = `You are my Connection Agent. Your job is to help me maintain meaningful relationships without letting anyone slip through the cracks.

MY RELATIONSHIP CIRCLES:
[Map your people using the tool above, or list them here]

INNER CIRCLE (weekly contact):
- [Names of 5-7 closest people]

CLOSE CIRCLE (monthly contact):
- [Names of 15-20 close friends/family]

MAINTAIN CIRCLE (quarterly contact):
- [Names of people worth keeping in touch with]

RECONNECT CIRCLE (yearly contact):
- [Names of people you'd love to reconnect with]

FOR EACH PERSON, TRACK:
- Last contact date
- Birthday (if known)
- Important dates (anniversary, work milestones)
- Preferred contact method (text, call, in-person)
- Conversation topics they care about

REMINDER SCHEDULE:
- Inner circle: Gentle nudge if no contact in 7 days
- Close circle: Reminder at 30 days
- Maintain circle: Reminder at 90 days
- Reconnect circle: Reminder at 365 days

OUTPUT FORMAT:
💜 Connection Check-in:
- Overdue: [People past their contact frequency]
- This week: [Birthdays, occasions, suggested reach-outs]
- Coming up: [Next 2 weeks]

💡 Reach-out ideas: [Low-effort ways to connect]

Help me be intentional about the people who matter.`;

    const occasionAgentPrompt = `You are my Occasion Agent. Your job is to make sure I never miss a birthday, anniversary, or important moment.

OCCASIONS TO TRACK:
- Birthdays (remind 1 week before)
- Anniversaries (remind 1 week before)
- Work milestones (promotions, new jobs, retirements)
- Life events (weddings, babies, moves, graduations)
- Holidays (remind 3 days before for greetings)

FOR EACH OCCASION:
- Who: Person's name
- What: Type of occasion
- When: Date (recurring or one-time)
- How: My preferred way to acknowledge (gift, card, call, text)
- Notes: Gift ideas, their preferences

GIFT TRACKING:
- What I've given in the past (avoid repeats)
- Their interests and preferences
- Budget guidelines

OUTPUT FORMAT:
🎂 Upcoming Occasions (Next 30 Days):
- [Date] - [Person] - [Occasion] - [Reminder to: buy gift/send card/call]

🎁 Gift Ideas:
- For [Person]: [Ideas based on their interests]

Help me be the person who always remembers.`;

    const networkNurturerPrompt = `You are my Network Nurturer Agent. Your job is to help me maintain professional relationships that matter.

MY PROFESSIONAL NETWORK:
Categories:
- Mentors (people who've guided me)
- Champions (people who've advocated for me)
- Peers (colleagues at similar level)
- Rising stars (people I'm mentoring)
- Industry connections (valuable professional contacts)

FOR EACH PROFESSIONAL CONTACT:
- Name and how we met
- Their current role/company
- Last meaningful interaction
- How I can help them
- How they might help me (not transactional—just aware)
- Topics they're passionate about

NURTURING ACTIVITIES:
- Congratulate on LinkedIn updates
- Share relevant articles
- Make introductions when appropriate
- Offer help before asking for anything
- Schedule periodic catch-up calls

REMINDER SCHEDULE:
- Mentors/Champions: Quarterly check-in
- Active peers: Monthly touchpoint
- Industry connections: Quarterly or when relevant

OUTPUT FORMAT:
🤝 Network Check-in:
- Recent wins to congratulate: [List]
- People I can help: [List with suggestions]
- Due for catch-up: [List]

💡 This week's networking action: [One specific thing]

Help me build a network that gives more than it takes.`;

    return (
        <>
            <Helmet>
                <title>Discovery 11: Relationships | The Agentic AI Adventure</title>
                <meta name="description" content="Remember birthdays, stay connected, and nurture relationships effortlessly" />
            </Helmet>

            <SpeedRunContext.Provider value={speedRun}>
                <div className="min-h-screen bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* Progress Bar with Part indicator */}
                        <ChapterProgress
                            current={11}
                            total={16}
                            part={4}
                            partTitle="Life Systems"
                        />

                        {/* Author Credibility */}


                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="text-rose-400 font-mono text-sm mb-2">Discovery 11</div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Social & Relationships
                            </h1>
                            <p className="text-xl text-slate-400 mb-4">
                                The people who matter deserve more than your leftovers
                            </p>

                            {/* Reading time + Speed Run toggle */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4 text-slate-500 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>10 min read</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-rose-400">20 min to map your people</span>
                                </div>
                                <SpeedRunToggle enabled={speedRun} onToggle={() => setSpeedRun(!speedRun)} />
                            </div>
                        </motion.div>

                        {/* FUTURE-PROOF BANNER */}
                        <FutureProofBanner />

                        {/* TL;DR Card */}
                        <TLDRCard
                            stats={[
                                { value: '4', label: 'relationship circles' },
                                { value: '0', label: 'forgotten birthdays' },
                                { value: '∞', label: 'stronger connections' },
                            ]}
                            primaryCTA="Map My Relationships"
                            onCTAClick={scrollToCalculator}
                        />

                        <PasswordGate partNumber={4}>
                            {/* CAPTAIN EFFICIENCY - OPENER (Warm, human) */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="default"
                                        message="This might be the most important chapter. Not because it saves you time—but because it saves your relationships. The people who matter most often get the least of us. We're 'too busy' for the call. 'Too tired' for the visit. Then one day we realize years have passed. This isn't about managing people like tasks. It's about being intentional with the humans who make life worth living."
                                    />
                                </Suspense>
                            )}

                            {/* INTEL REPORT */}
                            {!speedRun && (
                                <IntelReport
                                    title="THE RELATIONSHIP REALITY"
                                    classification="LEVEL 11"
                                    defaultExpanded={false}
                                    content={`This chapter is personal, Explorer.

We're not "optimizing" relationships—that's missing the point entirely. But we ARE being intentional about the people who matter most.

Your AI agent can't love people for you. But it CAN remind you about important dates, help you maintain traditions, and ensure the relationships that matter don't fade from neglect.

This isn't about efficiency. It's about presence.`}
                                />
                            )}

                            {/* Speed Run Notice */}
                            {speedRun && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-rose-900/30 rounded-xl p-4 border border-rose-500/40 backdrop-blur-sm mb-8"
                                >
                                    <div className="flex items-center gap-2 text-rose-400">
                                        <Zap size={18} />
                                        <span className="font-bold">Professional Mode Active</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Showing only essential prompts. Toggle off for full expedition experience.
                                    </p>
                                </motion.div>
                            )}

                            {/* ★ RELATIONSHIP FADE VISUAL ★ */}
                            {!speedRun && <RelationshipFadeVisual />}

                            {/* RELATIONSHIP CALCULATOR */}
                            <section id="relationship-calculator" className="mb-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-500/50" />
                                    <span className="text-rose-400 font-bold uppercase text-sm tracking-wider">Your Connection Audit</span>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-500/50" />
                                </div>

                                <Suspense fallback={
                                    <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-800/50 rounded-xl animate-pulse">
                                        Loading relationship audit...
                                    </div>
                                }>
                                    <RelationshipAuditCalculator />
                                </Suspense>
                            </section>

                            {/* RELATIONSHIP CIRCLES FRAMEWORK */}
                            {!speedRun && <RelationshipCircles />}

                            {/* PEOPLE MAPPER */}
                            {!speedRun && <PeopleMapper />}

                            {/* AGENT 1: CONNECTION AGENT */}
                            <QuickWin
                                title="Agent 1: The Connection Agent"
                                setupTime="15 min"
                                prompt={connectionAgentPrompt}
                                variant="default"
                            />

                            {/* OCCASION TRACKER */}
                            {!speedRun && <OccasionTracker />}

                            {/* AGENT 2: OCCASION AGENT */}
                            <QuickWin
                                title="Agent 2: The Occasion Agent"
                                setupTime="10 min"
                                prompt={occasionAgentPrompt}
                                variant="secondary"
                            />

                            {/* CONNECTION IDEAS */}
                            {!speedRun && <ConnectionIdeasPreview />}

                            {/* AGENT 3: NETWORK NURTURER */}
                            <QuickWin
                                title="Agent 3: The Network Nurturer"
                                setupTime="10 min"
                                prompt={networkNurturerPrompt}
                                variant="tertiary"
                            />

                            {/* CASE STUDY */}
                            {!speedRun && (
                                <CaseStudyCard
                                    name="James"
                                    role="Startup founder, 'always too busy'"
                                    problem="Realized he hadn't called his mom in 2 months. Missed his best friend's promotion. Lost touch with the mentor who helped him raise his first round."
                                    result="Weekly calls with mom. Monthly dinners with close friends. Quarterly check-ins with his network. Relationships stronger than ever."
                                    timeframe="3 months"
                                    quote="I thought I was too busy for relationships. Turns out I was just disorganized. 10 minutes of planning saves hours of guilt and regret."
                                />
                            )}

                            {/* SHAREABLE QUOTE */}
                            <ShareableQuote
                                quote="Relationships don't fade from lack of love. They fade from lack of attention. The system handles the attention so you can focus on the love."
                                chapter={11}
                            />

                            {/* CAPTAIN EFFICIENCY - CLOSER (Heartfelt) */}
                            {!speedRun && (
                                <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                                    <CaptainHero
                                        size="md"
                                        pose="celebrating"
                                        message="You now have a system that remembers when you're busy living. Birthdays won't slip by. Old friends won't fade away. The people who matter will feel it. But there's one more piece of a full life we haven't touched: your growth. Learning, skills, becoming who you want to be. Let's make sure YOU don't get neglected either. 🌱"
                                    />
                                </Suspense>
                            )}

                            {/* QUICK ACCESS TO ALL AI TOOLS */}
                            <section className="mb-10">
                                <AIToolLinks />
                            </section>

                            {/* FAQ SECTION */}
                            <section className="mb-10">
                                <FAQSection faqs={chapter11FAQs} title="Relationships FAQ" />
                            </section>

                            {/* CHAPTER COMPLETE */}
                            <ChapterComplete
                                achievements={[
                                    'Connection Agent (relationship circle reminders)',
                                    'Occasion Agent (birthdays & milestones)',
                                    'Network Nurturer (professional relationships)',
                                    'Relationship circles mapped',
                                    'People mapper started',
                                    'Connection ideas library',
                                ]}
                                nextChapter={12}
                                nextTitle="Learning & Growth"
                            />

                        </PasswordGate>
                        <ChapterNavigation
                            previousChapter="/part4/chapter1"
                            nextChapter="/part4/chapter3"
                            partNumber={4}
                            chapterNumber={2}
                        />
                    </div>
                </div>
            </SpeedRunContext.Provider>
        </>
    );
};

export default Chapter11;
