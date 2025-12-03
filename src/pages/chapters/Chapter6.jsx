import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';

const Chapter6 = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 6: Household Management - Agentic AI Home</title>
                <meta name="description" content="Automate household management to prevent $3,500/year in forgotten costs and administrative chaos." />
            </Helmet>

            <PasswordGate partNumber={2}>
                <div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* 
              TODO: Add your Chapter 6 content here
              This chapter is from Part 2 (PASSWORD PROTECTED)
            */}
                        <h1 className="text-5xl font-bold mb-6">Chapter 6: Household Management</h1>
                        <p className="text-slate-400 text-lg mb-8">Part 2: Daily Operations</p>

                        {/* Your content goes here */}

                    </div>
                </div>

                <ChapterNavigation
                    previousChapter="/part2/chapter2"
                    nextChapter="/part3/chapter1"
                    partNumber={2}
                    chapterNumber={3}
                />
            </PasswordGate>
        </WebbookLayout>
    );
};

export default Chapter6;
