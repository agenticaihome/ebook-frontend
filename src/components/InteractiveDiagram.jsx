import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle } from 'lucide-react';

const InteractiveDiagram = ({ steps, title }) => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden my-12">
            {title && (
                <div className="bg-slate-50 p-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800 text-center">{title}</h3>
                </div>
            )}

            <div className="grid md:grid-cols-3">
                {/* Steps Navigation */}
                <div className="bg-slate-50 border-r border-slate-100 p-2">
                    {steps.map((step, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveStep(index)}
                            className={`w-full text-left p-4 rounded-xl mb-2 transition-all flex items-center justify-between group ${activeStep === index
                                ? 'bg-white shadow-md border border-blue-100'
                                : 'hover:bg-white/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${activeStep === index
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-200 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                    }`}>
                                    {index + 1}
                                </div>
                                <span className={`font-medium ${activeStep === index ? 'text-blue-900' : 'text-slate-600'}`}>
                                    {step.label}
                                </span>
                            </div>
                            {activeStep === index && <ChevronRight size={16} className="text-blue-500" />}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 p-8 bg-white min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10"
                        >
                            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                                Step {activeStep + 1}
                            </div>

                            <h4 className="text-2xl font-bold text-slate-900 mb-4">
                                {steps[activeStep].title}
                            </h4>

                            <p className="text-slate-600 leading-relaxed text-lg mb-6">
                                {steps[activeStep].description}
                            </p>

                            {steps[activeStep].details && (
                                <ul className="space-y-3">
                                    {steps[activeStep].details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default InteractiveDiagram;
