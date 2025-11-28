import React, { useState } from 'react';
import { FileText, CheckSquare, Clock } from 'lucide-react';

const AdminDayPlanner = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Pay Bills', checked: false },
        { id: 2, text: 'Clear Physical Mail', checked: false },
        { id: 3, text: 'Update Budget', checked: false },
        { id: 4, text: 'Schedule Appointments', checked: false },
        { id: 5, text: 'File Digital Documents', checked: false }
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="text-indigo-400" /> Admin Day Planner
            </h3>
            <p className="text-sm text-slate-400 mb-6">
                Batch these tasks into a single 2-hour block per week.
            </p>

            <div className="space-y-3">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-3 ${task.checked
                            ? 'bg-indigo-900/20 border-indigo-500/50'
                            : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${task.checked ? 'bg-indigo-500 border-indigo-500' : 'border-slate-500'
                            }`}>
                            {task.checked && <CheckSquare size={14} className="text-white" />}
                        </div>
                        <span className={task.checked ? 'text-slate-500 line-through' : 'text-slate-300'}>
                            {task.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={16} />
                    <span>Est. Time: 90 mins</span>
                </div>
                <button className="text-indigo-400 font-bold hover:text-indigo-300">
                    Add Custom Task +
                </button>
            </div>
        </div>
    );
};

export default AdminDayPlanner;
