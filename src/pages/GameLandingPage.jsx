import React from 'react';
import { Helmet } from 'react-helmet-async';
import CaptainClickChallenge from '../components/gamification/CaptainClickChallenge';
import WebbookLayout from '../components/layout/WebbookLayout';

const GameLandingPage = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Training Games | Agentic AI Home</title>
                <meta name="description" content="Practice your AI skills with interactive training games and challenges." />
            </Helmet>
            <CaptainClickChallenge />
        </WebbookLayout>
    );
};

export default GameLandingPage;
