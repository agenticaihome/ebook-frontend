import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Calendar, Cloud, Mail, Car } from 'lucide-react';

const MorningBriefBuilder = () => {
    const [preferences, setPreferences] = useState({
        wakeTime: '6:30',
        weekendWakeTime: '8:00',
        needWeather: true,
        needCalendar: true,
        needEmail: false,
        needTraffic: false,
        needNews: false,
        painPoint: 'time',
        smartHome: false,
        familyCoordination: false
    });
    const [copied, setCopied] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleChange = (field, value) => {
        setPreferences({ ...preferences, [field]: value });
    };

    const generatePrompt = () => {
        const sections = [];

        sections.push(`Every morning at ${preferences.wakeTime} (weekdays) and ${preferences.weekendWakeTime} (weekends), prepare my Morning Brief:`);
        sections.push('');

        if (preferences.needWeather) {
            sections.push('☀️ WEATHER');
            sections.push("- Today's high/low temperature");
            sections.push('- Conditions (sun, rain, etc.)');
            sections.push('- What to wear suggestion');
            sections.push('');
        }

        if (preferences.needCalendar) {
            sections.push('📅 SCHEDULE');
            sections.push('- All events today with times');
            sections.push('- Any prep needed for meetings');
            if (preferences.needTraffic) {
                sections.push('- Commute time based on current traffic');
            }
            sections.push('');
        }

        if (preferences.needEmail) {
            sections.push('✉️ EMAIL ALERT');
            sections.push('- Any urgent messages? (from boss, clients, family)');
            sections.push('- How many total unread? (just the number)');
            sections.push('');
        }

        if (preferences.needTraffic) {
            sections.push('🚗 TIMING');
            sections.push('- When to leave for first obligation');
            sections.push('- Current traffic conditions');
            sections.push('- Backup route if traffic is bad');
            sections.push('');
        }

        if (preferences.needNews) {
            sections.push('📰 NEWS BRIEF');
            sections.push('- Top 3 headlines relevant to my interests');
            sections.push('- Keep it under 1 minute to read');
            sections.push('');
        }

        sections.push('🎯 TODAY\'S PRIORITY');
        sections.push('- Based on my calendar and deadlines, what ONE thing matters most today?');
        sections.push('');

        if (preferences.familyCoordination) {
            sections.push('👨‍👩‍👧‍👦 FAMILY COORDINATION');
            sections.push('- Kids\' school: Any special events, items needed?');
            sections.push('- Who handles which task today?');
            sections.push('');
        }

        sections.push('💡 SUGGESTION');
        sections.push('- One thing to make today smoother');
        sections.push('');

        sections.push('Format so I can read in under 3 minutes.');
        sections.push('Keep it simple — I\'m barely awake.');

        return sections.join('\n');
    };

    const getDeliveryTime = () => {
        const [hours, minutes] = preferences.wakeTime.split(':').map(Number);
        const deliveryHours = hours;
        const deliveryMinutes = Math.max(0, minutes - 15);
        return `${deliveryHours}:${deliveryMinutes.toString().padStart(2, '0')}`;
    };

    const getAutomationApproach = () => {
        if (preferences.smartHome) {
            return 'Advanced: Use smart home automation with voice assistant or app integration';
        } else if (preferences.needEmail || preferences.needTraffic) {
            return 'Intermediate: Use Zapier or Make to connect calendar, weather, and email APIs';
        } else {
            return 'Beginner: Run this prompt manually each morning or use a reminder to check it';
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatePrompt());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Morning Brief Builder</h3>
            </div>

            {!showResults ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white font-medium mb-2">
                                Weekday wake time
                            </label>
                            <input
                                type="time"
                                value={preferences.wakeTime}
                                onChange={(e) => handleChange('wakeTime', e.target.value)}
                                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-2">
                                Weekend wake time
                            </label>
                            <input
                                type="time"
                                value={preferences.weekendWakeTime}
                                onChange={(e) => handleChange('weekendWakeTime', e.target.value)}
                                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            What information do you need each morning?
                        </label>
                        <div className="space-y-2">
                            {[
                                { key: 'needWeather', label: 'Weather & what to wear', icon: Cloud },
                                { key: 'needCalendar', label: 'Calendar & schedule', icon: Calendar },
                                { key: 'needEmail', label: 'Email summary', icon: Mail },
                                { key: 'needTraffic', label: 'Traffic & commute time', icon: Car }
                            ].map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => handleChange(key, !preferences[key])}
                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${preferences[key]
                                            ? 'border-cyan-500 bg-cyan-900/20'
                                            : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${preferences[key] ? 'border-cyan-500 bg-cyan-500' : 'border-slate-600'
                                        }`}>
                                        {preferences[key] && <Check size={14} className="text-white" />}
                                    </div>
                                    <Icon size={20} className={preferences[key] ? 'text-cyan-400' : 'text-slate-500'} />
                                    <span className="text-white">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            What's your biggest morning pain point?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { value: 'time', label: 'Not enough time' },
                                { value: 'decisions', label: 'Too many decisions' },
                                { value: 'family', label: 'Family coordination' },
                                { value: 'energy', label: 'Low energy' }
                            ].map(({ value, label }) => (
                                <button
                                    key={value}
                                    onClick={() => handleChange('painPoint', value)}
                                    className={`p-3 rounded-xl border-2 transition-all ${preferences.painPoint === value
                                            ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                            : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Additional features
                        </label>
                        <div className="space-y-2">
                            <button
                                onClick={() => handleChange('smartHome', !preferences.smartHome)}
                                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${preferences.smartHome
                                        ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                        : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                I have smart home devices
                            </button>
                            <button
                                onClick={() => handleChange('familyCoordination', !preferences.familyCoordination)}
                                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${preferences.familyCoordination
                                        ? 'border-cyan-500 bg-cyan-900/20 text-white'
                                        : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                I need family/kids coordination
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all"
                    >
                        Generate My Morning Brief
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="mb-6">
                        <h4 className="text-white font-bold mb-2">Your Custom Morning Brief Prompt</h4>
                        <p className="text-slate-400 text-sm mb-4">
                            Copy this prompt and use it with your AI assistant (Claude, ChatGPT, etc.)
                        </p>
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-4 relative">
                            <button
                                onClick={copyToClipboard}
                                className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-all text-sm"
                            >
                                {copied ? (
                                    <>
                                        <Check size={16} />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        Copy
                                    </>
                                )}
                            </button>
                            <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap pr-24">
                                {generatePrompt()}
                            </pre>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="text-sm text-slate-400 mb-1">Recommended Delivery</div>
                            <div className="text-cyan-400 font-bold text-xl">{getDeliveryTime()}</div>
                            <div className="text-xs text-slate-500 mt-1">15 min before wake time</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="text-sm text-slate-400 mb-1">Automation Level</div>
                            <div className="text-purple-400 font-bold text-lg">
                                {preferences.smartHome ? 'Advanced' : preferences.needEmail ? 'Intermediate' : 'Beginner'}
                            </div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                            <div className="text-sm text-slate-400 mb-1">Time Saved Daily</div>
                            <div className="text-green-400 font-bold text-xl">~30 min</div>
                        </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-xl border border-cyan-500/30 mb-6">
                        <h5 className="text-white font-bold mb-2">Suggested Automation Approach</h5>
                        <p className="text-slate-300 text-sm">{getAutomationApproach()}</p>
                    </div>

                    <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                        <h5 className="text-white font-bold mb-3">Week-by-Week Expansion Plan</h5>
                        <div className="space-y-2 text-sm text-slate-300">
                            <div className="flex items-start gap-2">
                                <div className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                                <div>Run this prompt manually each morning to test it</div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                                <div>Add calendar intelligence and conflict detection</div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                                <div>Include personal context and energy awareness</div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">4</div>
                                <div>Automate delivery with scheduling or smart home integration</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(false)}
                        className="mt-6 w-full text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                        Customize Again
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default MorningBriefBuilder;
