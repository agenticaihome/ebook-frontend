import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';

const Chapter14 = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 14: [Chapter Title] - Agentic AI Home</title>
                <meta name="description" content="[Add chapter description]" />
            </Helmet>

            <PasswordGate partNumber={5}>
                <div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* 
              TODO: Add your Chapter 14 content here
              This chapter is from Part 5 (PASSWORD PROTECTED)
              Update the title in Helmet above when you add content
            */}
                        <h1 className="text-5xl font-bold mb-6">Chapter 14: [Your Title]</h1>
                        <p className="text-slate-400 text-lg mb-8">Part 5: Advanced Systems</p>

                        {/* Your content goes here */}

                    </div>
                </div>

                <ChapterNavigation
                    previousChapter="/part5/chapter1"
                    nextChapter="/part5/chapter3"
                    partNumber={5}
                    chapterNumber={2}
                />
            </PasswordGate>
        </WebbookLayout>
    );
};

export default Chapter14;
