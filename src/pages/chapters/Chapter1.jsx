import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../../components/layout/WebbookLayout';
import ChapterNavigation from '../../components/common/ChapterNavigation';

const Chapter1 = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 1: The Cost of Chaos - Agentic AI Home</title>
                <meta name="description" content="Discover the hidden costs of daily chaos and why traditional productivity systems fail in the agentic age." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* 
            TODO: Add your Chapter 1 content here
            This chapter is from Part 1, so NO password gate needed
          */}
                    <h1 className="text-5xl font-bold mb-6">Chapter 1: The Cost of Chaos</h1>
                    <p className="text-slate-400 text-lg mb-8">Part 1: Diagnosis</p>

                    {/* Your content goes here */}

                </div>
            </div>

            <ChapterNavigation
                previousChapter={null}
                nextChapter="/part1/chapter2"
                partNumber={1}
                chapterNumber={1}
            />
        </WebbookLayout>
    );
};

export default Chapter1;
