import React from 'react';
import { Lock, Terminal, CheckCircle } from 'lucide-react';
import { m } from 'framer-motion';

const SneakPeek = () => {
    return (
        <div className="relative max-w-3xl mx-auto my-16 rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-[#1e1e2e]">
            {/* Header */}
            <div className="bg-[#2a2a3c] px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 text-xs font-mono text-slate-400 flex items-center gap-2">
                    <Terminal size={12} />
                    morning_agent_v1.prompt
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 font-mono text-sm relative">
                {/* Visible Teaser */}
                <div className="text-slate-300 space-y-1">
                    <div className="text-purple-400"># ROLE DEFINITION</div>
                    <div>You are the "Morning Operations Officer" for the user.</div>
                    <div>Your goal is to synthesize 5 data streams into a 30-second summary.</div>
                    <br />
                    <div className="text-purple-400"># DATA SOURCES</div>
                    <div>1. <span className="text-yellow-300">Weather API</span> (Check rain probability at 4pm)</div>
                    <div>2. <span className="text-yellow-300">Calendar</span> (Identify conflict at 2pm)</div>
                    <div>3. <span className="text-yellow-300">Todo List</span> (Highlight top 3 priorities)</div>
                </div>

                {/* Blurred Content */}
                <div className="mt-4 space-y-1 filter blur-sm select-none opacity-50">
                    <div className="text-purple-400"># DECISION LOGIC</div>
                    <div>If (rain_prob &gt; 50%) AND (outdoor_event == true):</div>
                    <div className="pl-4">Suggest_indoor_alternative()</div>
                    <div>If (sleep_score &lt; 70):</div>
                    <div className="pl-4">Adjust_schedule_intensity(low)</div>
                    <br />
                    <div className="text-purple-400"># OUTPUT FORMAT</div>
                    <div>"Good morning. Here is your tactical brief:"</div>
                    <div>[Weather Warning]</div>
                    <div>[Energy Level Adjustment]</div>
                    <div>[Top 3 Priorities]</div>
                    <div>... (200 more lines of logic) ...</div>
                </div>

                {/* Lock Overlay */}
                <div className="absolute inset-0 top-32 bg-gradient-to-b from-slate-900/10 to-slate-900/90 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6">
                    <m.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="bg-slate-800/90 border border-cyan-500/50 p-6 rounded-2xl shadow-xl max-w-sm"
                    >
                        <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                            <Lock className="text-cyan-400" size={24} />
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">Unlock the Full System</h4>
                        <p className="text-slate-400 text-sm mb-4">
                            Get the exact copy-paste code for the Morning Agent, Kitchen Manager, and 10+ other tools.
                        </p>
                        <div className="flex flex-col gap-2 text-xs text-slate-300 text-left bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-400" /> Complete Prompt Libraries</div>
                            <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-400" /> Setup Guides</div>
                            <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-400" /> Troubleshooting Manuals</div>
                        </div>
                    </m.div>
                </div>
            </div>
        </div>
    );
};

export default SneakPeek;
