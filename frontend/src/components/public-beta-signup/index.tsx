import React from 'react';

import Layout from '../layout';

import FeaturesSection from './components/features-section';
import VideoSection from './components/video-section';
import RulesSection from './components/rules-section';

const PublicBetaSignup = () => (
    <Layout theme={{ mode: 'dark', logoColor: '#040A0A' }}>
        <div>
            <h1>Публичное тестирование</h1>
        </div>

        <FeaturesSection />

        <RulesSection />

        <VideoSection />
    </Layout>
);

export default PublicBetaSignup;