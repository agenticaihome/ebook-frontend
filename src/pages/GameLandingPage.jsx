import React from 'react';
import CaptainClickChallenge from '../components/gamification/CaptainClickChallenge';
import WebbookLayout from '../components/layout/WebbookLayout';

const GameLandingPage = () => {
    return (
        <WebbookLayout>
            <CaptainClickChallenge />
        </WebbookLayout>
    );
};

export default GameLandingPage;
