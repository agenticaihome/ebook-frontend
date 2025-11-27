import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChaosCalculator = () => {
    const [weeklyTakeout, setWeeklyTakeout] = useState(100);
    const [foodWaste, setFoodWaste] = useState(20);
    const [decisionFatigueHours, setDecisionFatigueHours] = useState(5);

    // Calculate annual cost
    const annualCost = Math.round(
        (weeklyTakeout * 52) + // Weekly takeout annualized
        ((weeklyTakeout * 52) * (foodWaste / 100)) + // Food waste
        (decisionFatigueHours * 52 * 50) // Decision fatigue: hours/week × 52 weeks × $50/hour
    );

    // Determine if we're in "infection zone"
    const isInfected = annualCost > 2000;
    const showCTA = annualCost > 1000;

    // Calculate coin stack height (max 10 coins)
    const coinCount = Math.min(Math.floor(annualCost / 500), 10);

    return (
        <div className="glass-card-xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 medical-heading" style={{ color: '#0055FF' }}>
                    💸 Calculate Your Annual Cost of Chaos
                </h2>
                <p className="text-gray-600 medical-body">
                    Calculate the true cost of mental load: Food chaos + Decision fatigue + Cognitive overhead
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Sliders */}
                <div className="space-y-8">
                    {/* Slider 1: Weekly Takeout */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 medical-body" style={{ color: '#0055FF' }}>
                            Weekly Takeout Spend: ${weeklyTakeout}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="300"
                            step="10"
                            value={weeklyTakeout}
                            onChange={(e) => setWeeklyTakeout(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-clinical"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>$0</span>
                            <span>$300/week</span>
                        </div>
                    </div>

                    {/* Slider 2: Food Waste */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 medical-body" style={{ color: '#0055FF' }}>
                            Food Waste: {foodWaste}%
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="5"
                            value={foodWaste}
                            onChange={(e) => setFoodWaste(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-clinical"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0%</span>
                            <span>50%</span>
                        </div>
                    </div>

                    {/* Slider 3: Decision Fatigue Hours */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 medical-body" style={{ color: '#0055FF' }}>
                            Decision Fatigue: {decisionFatigueHours} hours/week
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={decisionFatigueHours}
                            onChange={(e) => setDecisionFatigueHours(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-clinical"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0 hrs</span>
                            <span>20 hrs/week</span>
                        </div>
                    </div>
                </div>

                {/* Right: Results & Coin Stack */}
                <div className="text-center">
                    {/* Animated Total */}
                    <div className={`mb-6 p-6 rounded-2xl ${isInfected ? 'infection-zone' : 'glass-card'}`}>
                        <p className="text-sm font-semibold mb-2" style={{ color: isInfected ? '#FF4444' : '#00DDDD' }}>
                            Annual Cost of Chaos
                        </p>
                        <motion.div
                            className="text-5xl md:text-6xl font-bold medical-heading"
                            style={{ color: isInfected ? '#FF4444' : '#0055FF' }}
                            key={annualCost}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInfected ? {
                                opacity: 1,
                                scale: [1, 1.05, 1],
                            } : {
                                opacity: 1,
                                scale: 1
                            }}
                            transition={{
                                duration: isInfected ? 1 : 0.3,
                                repeat: isInfected ? Infinity : 0,
                                repeatType: "reverse"
                            }}
                        >
                            ${annualCost.toLocaleString()}
                        </motion.div>
                        {isInfected && (
                            <motion.p
                                className="text-sm mt-2 font-semibold"
                                style={{ color: '#FF4444' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                ⚠️ Infection Zone: High Chaos Cost
                            </motion.p>
                        )}
                    </div>

                    {/* CSS Coin Stack */}
                    <div className="flex justify-center items-end h-48 mb-6">
                        <div className="flex flex-col-reverse items-center gap-1">
                            {Array.from({ length: coinCount }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="coin"
                                    initial={{ scale: 0, y: -20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    transition={{
                                        delay: i * 0.05,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 15
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}
                    {showCTA && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="glass-button px-8 py-4 rounded-lg font-bold text-lg shadow-clinical-lg hover:shadow-clinical-xl transition-all"
                                style={{ color: '#FF4444' }}
                            >
                                🩹 Stop the Bleeding (Get the Book for $29)
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Breakdown */}
            <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 medical-heading" style={{ color: '#0055FF' }}>
                    Cost Breakdown:
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="glass-card p-4">
                        <p className="text-gray-600 mb-1">Takeout (Annual)</p>
                        <p className="text-2xl font-bold" style={{ color: '#0055FF' }}>
                            ${(weeklyTakeout * 52).toLocaleString()}
                        </p>
                    </div>
                    <div className="glass-card p-4">
                        <p className="text-gray-600 mb-1">Food Waste (Annual)</p>
                        <p className="text-2xl font-bold" style={{ color: '#0055FF' }}>
                            ${Math.round((weeklyTakeout * 52) * (foodWaste / 100)).toLocaleString()}
                        </p>
                    </div>
                    <div className="glass-card p-4">
                        <p className="text-gray-600 mb-1">Decision Fatigue (Annual)</p>
                        <p className="text-2xl font-bold" style={{ color: '#0055FF' }}>
                            ${(decisionFatigueHours * 52 * 50).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChaosCalculator;
