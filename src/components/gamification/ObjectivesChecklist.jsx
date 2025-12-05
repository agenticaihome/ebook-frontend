import React, { useState } from 'react';
import { Check, Circle } from 'lucide-react';

const ObjectivesChecklist = ({
    primaryObjectives = [],
    bonusObjectives = []
}) => {
    const [checkedState, setCheckedState] = useState({});

    const toggleCheck = (id) => {
        setCheckedState(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const ObjectiveItem = ({ item, index, type }) => {
        const id = `${type}-${index}`;
        const isChecked = checkedState[id];

        return (
            <div
                onClick={() => toggleCheck(id)}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${isChecked
                        ? 'bg-green-900/20 border-green-500/30'
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                    }`}
            >
                <div className={`mt-0.5 flex-shrink-0 ${isChecked ? 'text-green-400' : 'text-gray-500'}`}>
                    {isChecked ? <Check size={20} /> : <Circle size={20} />}
                </div>
                <div className={isChecked ? 'text-gray-300 line-through decoration-gray-500' : 'text-gray-200'}>
                    {item}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 my-8">
            <h3 className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 border-b border-gray-800 pb-2">
                Mission Objectives
            </h3>

            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-white uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Primary Objectives
                    </h4>
                    <div className="space-y-2">
                        {primaryObjectives.map((obj, i) => (
                            <ObjectiveItem key={i} item={obj} index={i} type="primary" />
                        ))}
                    </div>
                </div>

                {bonusObjectives.length > 0 && (
                    <div>
                        <h4 className="text-xs font-bold text-yellow-500 uppercase mb-3">
                            Bonus Objectives
                        </h4>
                        <div className="space-y-2">
                            {bonusObjectives.map((obj, i) => (
                                <ObjectiveItem key={i} item={obj} index={i} type="bonus" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ObjectivesChecklist;
