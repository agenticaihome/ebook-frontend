import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';

const Chapter5 = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 5: Kitchen & Grocery Automation - Agentic AI Home</title>
                <meta name="description" content="Build a Kitchen Agent to save $150-250/month and 3-4 hours per week on food planning and grocery management." />
            </Helmet>

            <PasswordGate partNumber={2}>
                <div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* 
              TODO: Add your Chapter 5 content here
              This chapter is from Part 2 (PASSWORD PROTECTED)
            */}
                        <h1 className="text-5xl font-bold mb-6">Chapter 5: Kitchen & Grocery Automation</h1>
                        <p className="text-slate-400 text-lg mb-8">Part 2: Daily Operations</p>

                        {/* Your content goes here */}

                    </div>
                </div>

                <ChapterNavigation
                    previousChapter="/part2/chapter1"
                    nextChapter="/part2/chapter3"
                    partNumber={2}
                    chapterNumber={2}
                />
            </PasswordGate>
        </WebbookLayout>
    );
};

export default Chapter5;
