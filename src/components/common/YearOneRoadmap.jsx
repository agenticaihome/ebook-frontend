import React from 'react';
import { m } from 'framer-motion';
import { CheckCircle, Circle, ArrowDown } from 'lucide-react';

const YearOneRoadmap = () => {
    const quarters = [
        {
            id: 'Q1',
            title: 'The Foundation',
            focus: 'Morning & Household',
            agents: ['Morning Agent', 'Meal Planner', 'Chore Manager'],
            status: 'complete',
            color: 'text-green-400',
            borderColor: 'border-green-500'
        },
        {
            id: 'Q2',
            title: 'Digital Defense',
            focus: 'Email & Time',
            agents: ['Gatekeeper Agent', 'Calendar Defender', 'Admin Bot'],
            status: 'complete',
            color: 'text-blue-400',
            borderColor: 'border-blue-500'
        },
        {
            id: 'Q3',
            title: 'Physical Optimization',
            focus: 'Health & Recovery',
            agents: ['Recovery Agent', 'Workout Planner', 'Sleep Guardian'],
            status: 'complete',
            color: 'text-purple-400',
            borderColor: 'border-purple-500'
        },
        {
            id: 'Q4',
            title: 'Full Autonomy',
            focus: 'Life OS & Goals',
            agents: ['Chief of Staff', 'Goal Tracker', 'Finance Director'],
            status: 'current',
            color: 'text-cyan-400',
            borderColor: 'border-cyan-500'
        }
    ];

    return (
        <div className="my-12 relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-800" />

            <div className="space-y-12">
                {quarters.map((q, index) => (
                    <m.div
                        key={q.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative flex gap-6"
                    >
                        <div className={`relative z-10 w-16 h-16 rounded-full bg-[#0f0f1a] border-4 ${q.borderColor} flex items-center justify-center shrink-0`}>
                            <span className={`font-bold ${q.color}`}>{q.id}</span>
                        </div>

                        <div className="flex-1 bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors">
                            <h4 className={`text-xl font-bold ${q.color} mb-2`}>{q.title}</h4>
                            <p className="text-slate-400 text-sm mb-4 uppercase tracking-wider">{q.focus}</p>

                            <div className="flex flex-wrap gap-2">
                                {q.agents.map((agent, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-600">
                                        {agent}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </m.div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-slate-400 italic">
                    "Most people overestimate what they can do in a day, and underestimate what they can do in a year."
                </p>
            </div>
        </div>
    );
};

export default YearOneRoadmap;
