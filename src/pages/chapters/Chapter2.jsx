import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import ChapterNavigation from '../../components/common/ChapterNavigation';

const Chapter2 = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 2: The Agentic Shift - Agentic AI Home</title>
                <meta name="description" content="Understanding the fundamental shift from tools to agents and why this changes everything." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* 
            TODO: Add your Chapter 2 content here
            This chapter is from Part 1, so NO password gate needed
          */}
                    <h1 className="text-5xl font-bold mb-6">Chapter 2: The Agentic Shift</h1>
                    <p className="text-slate-400 text-lg mb-8">Part 1: Diagnosis</p>

                    {/* Your content goes here */}

                </div>
            </div>

            <ChapterNavigation
                previousChapter="/part1/chapter1"
                nextChapter="/part1/chapter3"
                partNumber={1}
                chapterNumber={2}
            />
        </WebbookLayout>
    );
};

export default Chapter2;
