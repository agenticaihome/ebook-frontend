import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const CalendarAuditTool = () => {
    const [meetings, setMeetings] = useState(15);
    const [deepWork, setDeepWork] = useState(5);
    const [fragmentedTime, setFragmentedTime] = useState(10);

    const totalHours = 40; // Standard work week
    const meetingPercentage = Math.round((meetings / totalHours) * 100);
    const deepWorkPercentage = Math.round((deepWork / totalHours) * 100);

    const getHealthScore = () => {
        if (deepWorkPercentage > 30 && meetingPercentage < 30) return { score: 'A', color: 'text-green-400', message: 'Excellent Balance' };
        if (deepWorkPercentage > 20) return { score: 'B', color: 'text-blue-400', message: 'Good, but could improve' };
        if (meetingPercentage > 50) return { score: 'D', color: 'text-orange-400', message: 'Meeting Overload' };
        return { score: 'C', color: 'text-yellow-400', message: 'Average' };
    };

    const health = getHealthScore();

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="text-purple-400" /> Calendar Health Audit
            </h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm text-slate-400 mb-2">Hours in Meetings / Week</label>
                    <input
                        type="range"
                        min="0"
                        max="40"
                        value={meetings}
                        onChange={(e) => setMeetings(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="text-right text-purple-400 font-mono">{meetings} hrs</div>
                </div>

                <div>
                    <label className="block text-sm text-slate-400 mb-2">Hours of Deep Work (2h+ blocks)</label>
                    <input
                        type="range"
                        min="0"
                        max="40"
                        value={deepWork}
                        onChange={(e) => setDeepWork(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <div className="text-right text-green-400 font-mono">{deepWork} hrs</div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600 flex justify-between items-center">
                    <div>
                        <div className="text-sm text-slate-400">Health Score</div>
                        <div className={`text-3xl font-bold ${health.color}`}>{health.score}</div>
                        <div className={`text-xs ${health.color}`}>{health.message}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-slate-400">Deep Work Ratio</div>
                        <div className="text-xl font-bold text-white">{deepWorkPercentage}%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarAuditTool;
