import React from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, Star, Info } from 'lucide-react';

const CaptainTip = ({ type = 'tip', title, children, pose = 'default' }) => {
    const config = {
        tip: {
            icon: <Zap className="w-5 h-5 text-yellow-500" />,
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            titleColor: 'text-blue-900',
            badge: 'QUICK TIP'
        },
        warning: {
            icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
            bg: 'bg-red-50',
            border: 'border-red-100',
            titleColor: 'text-red-900',
            badge: 'WARNING'
        },
        pro: {
            icon: <Star className="w-5 h-5 text-purple-500" />,
            bg: 'bg-purple-50',
            border: 'border-purple-100',
            titleColor: 'text-purple-900',
            badge: 'PRO MODE'
        },
        info: {
            icon: <Info className="w-5 h-5 text-cyan-500" />,
            bg: 'bg-cyan-50',
            border: 'border-cyan-100',
            titleColor: 'text-cyan-900',
            badge: 'DID YOU KNOW?'
        }
    };

    const style = config[type] || config.tip;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative ${style.bg} border ${style.border} rounded-2xl p-6 my-8 shadow-sm`}
        >
            {/* Captain Avatar Placeholder */}
            <div className="absolute -top-6 -right-4 w-16 h-16 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-2xl">
                    {pose === 'alert' ? '🚨' : pose === 'happy' ? '😄' : '🫡'}
                </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
                {style.icon}
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/50 ${style.titleColor}`}>
                    {style.badge}
                </span>
            </div>

            {title && (
                <h4 className={`text-lg font-bold mb-2 ${style.titleColor}`}>
                    {title}
                </h4>
            )}

            <div className="text-slate-700 leading-relaxed text-sm md:text-base">
                {children}
            </div>
        </motion.div>
    );
};

export default CaptainTip;
