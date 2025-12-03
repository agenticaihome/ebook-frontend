import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';

const Chapter4 = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 4: Morning Routines - Agentic AI Home</title>
                <meta name="description" content="Build your first Morning Agent to reclaim 30 minutes every day and eliminate decision fatigue." />
            </Helmet>

            <PasswordGate partNumber={2}>
                <div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* 
              TODO: Add your Chapter 4 content here
              This chapter is from Part 2 (PASSWORD PROTECTED)
            */}
                        <h1 className="text-5xl font-bold mb-6">Chapter 4: Morning Routines That Run Themselves</h1>
                        <p className="text-slate-400 text-lg mb-8">Part 2: Daily Operations</p>

                        {/* Your content goes here */}

                    </div>
                </div>

                <ChapterNavigation
                    previousChapter="/part1/chapter3"
                    nextChapter="/part2/chapter2"
                    partNumber={2}
                    chapterNumber={1}
                />
            </PasswordGate>
        </WebbookLayout>
    );
};

export default Chapter4;
