import React from 'react';

import Layout from '../layout';

import OpenTesting from '../beta-test-signup/open-beta';
import FeaturesSection from './components/features-section';
import VideoSection from './components/video-section';
import RulesSection from './components/rules-section';

const PublicBetaSignup = () => (
    <Layout theme={{ mode: 'dark', logoColor: '#040A0A' }}>
        <OpenTesting testingStartsAt={new Date()} />

        <FeaturesSection />

        <RulesSection />

        <VideoSection />
    </Layout>
);

export default PublicBetaSignup;
