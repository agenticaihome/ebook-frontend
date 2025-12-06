import React from 'react';
import { TrendingUp, TrendingDown, Clock, DollarSign, Brain, Heart } from 'lucide-react';

/**
 * EmotionalStatCard - Stat card with emotional context that connects to readers
 * Shows the numbers + what they MEAN for real life
 */

const EmotionalStatCard = ({
    value,
    label,
    impact,
    trend = 'positive', // 'positive' | 'negative' | 'neutral'
    icon: Icon,
    color = 'teal'
}) => {
    const colors = {
        red: {
            bg: 'bg-red-900/20',
            border: 'border-red-500/30',
            text: 'text-red-400',
            impact: 'text-red-300/80',
        },
        green: {
            bg: 'bg-green-900/20',
            border: 'border-green-500/30',
            text: 'text-green-400',
            impact: 'text-green-300/80',
        },
        teal: {
            bg: 'bg-teal-900/20',
            border: 'border-teal-500/30',
            text: 'text-teal-400',
            impact: 'text-teal-300/80',
        },
        purple: {
            bg: 'bg-purple-900/20',
            border: 'border-purple-500/30',
            text: 'text-purple-400',
            impact: 'text-purple-300/80',
        },
        orange: {
            bg: 'bg-orange-900/20',
            border: 'border-orange-500/30',
            text: 'text-orange-400',
            impact: 'text-orange-300/80',
        },
    };

    const c = colors[color] || colors.teal;

    return (
        <div className={`rounded-xl p-5 border ${c.bg} ${c.border}`}>
            <div className="flex items-start justify-between mb-2">
                <div className={`text-3xl font-bold ${c.text}`}>{value}</div>
                {Icon && <Icon className={c.text} size={20} />}
            </div>
            <div className="text-slate-400 text-sm mb-2">{label}</div>
            {impact && (
                <div className={`text-xs ${c.impact} italic flex items-start gap-1`}>
                    {trend === 'positive' && <TrendingUp size={12} className="flex-shrink-0 mt-0.5" />}
                    {trend === 'negative' && <TrendingDown size={12} className="flex-shrink-0 mt-0.5" />}
                    <span>{impact}</span>
                </div>
            )}
        </div>
    );
};

export default EmotionalStatCard;

// Pre-built emotional stat sets for each chapter
export const chapter1Stats = [
    {
        value: '35,000',
        label: 'decisions per day',
        impact: "That's why you're exhausted by 3pm",
        trend: 'negative',
        color: 'red',
    },
    {
        value: '23 min',
        label: 'to refocus after interruption',
        impact: 'Every ping costs you half an hour',
        trend: 'negative',
        color: 'red',
    },
    {
        value: '2.5 hrs',
        label: 'daily life admin',
        impact: "That's 900+ hours per year—gone",
        trend: 'negative',
        color: 'red',
    },
    {
        value: '60%',
        label: 'tasks automatable',
        impact: 'The upside is massive',
        trend: 'positive',
        color: 'teal',
    },
];

export const chapter4Stats = [
    {
        value: '35 min',
        label: 'avg morning chaos',
        impact: "That's almost 200 hours per year of stress",
        trend: 'negative',
        color: 'red',
    },
    {
        value: '47',
        label: 'notifications before 8am',
        impact: 'No wonder focus is impossible',
        trend: 'negative',
        color: 'red',
    },
    {
        value: '6 apps',
        label: 'checked each morning',
        impact: 'Context switching before coffee',
        trend: 'negative',
        color: 'red',
    },
    {
        value: '3 min',
        label: 'with morning brief',
        impact: 'One look. Full clarity. Zero anxiety.',
        trend: 'positive',
        color: 'teal',
    },
];

export const chapter5Stats = [
    {
        value: '365x',
        label: '"what\'s for dinner?" per year',
        impact: 'The question that never stops',
        trend: 'negative',
        color: 'red',
    },
    {
        value: '$1,500',
        label: 'wasted food annually',
        impact: 'Literally throwing money away',
        trend: 'negative',
        color: 'red',
    },
    {
        value: '35%',
        label: 'avg food waste',
        impact: "You're buying for the trash can",
        trend: 'negative',
        color: 'red',
    },
    {
        value: '$200+',
        label: 'saved monthly',
        impact: "That's a nice dinner out every week",
        trend: 'positive',
        color: 'teal',
    },
];

export const chapter6Stats = [
    {
        value: '2.5 hrs',
        label: 'weekly invisible labor',
        impact: 'The work nobody sees or thanks you for',
        trend: 'negative',
        color: 'red',
    },
    {
        value: '28',
        label: 'recurring household tasks',
        impact: 'All living rent-free in your head',
        trend: 'negative',
        color: 'red',
    },
    {
        value: '80%',
        label: 'mental load on one person',
        impact: 'Usually the person reading this',
        trend: 'negative',
        color: 'red',
    },
    {
        value: '0 hours',
        label: 'with AI tracking',
        impact: 'Your brain is free. Finally.',
        trend: 'positive',
        color: 'teal',
    },
];
