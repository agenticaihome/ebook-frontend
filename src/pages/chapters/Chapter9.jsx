import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import PasswordGate from '../../components/common/PasswordGate';
import ChapterNavigation from '../../components/common/ChapterNavigation';

const Chapter9 = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 9: [Chapter Title] - Agentic AI Home</title>
                <meta name="description" content="[Add chapter description]" />
            </Helmet>

            <PasswordGate partNumber={3}>
                <div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* 
              TODO: Add your Chapter 9 content here
              This chapter is from Part 3 (PASSWORD PROTECTED)
              Update the title in Helmet above when you add content
            */}
                        <h1 className="text-5xl font-bold mb-6">Chapter 9: [Your Title]</h1>
                        <p className="text-slate-400 text-lg mb-8">Part 3: Work & Productivity</p>

                        {/* Your content goes here */}

                    </div>
                </div>

                <ChapterNavigation
                    previousChapter="/part3/chapter2"
                    nextChapter="/part4/chapter1"
                    partNumber={3}
                    chapterNumber={3}
                />
            </PasswordGate>
        </WebbookLayout>
    );
};

export default Chapter9;
