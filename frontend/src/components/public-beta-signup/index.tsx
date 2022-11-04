import React from 'react';

import Layout from '../layout';

import FeaturesSection from './components/features-section';
import PathDescription from './components/path-description';
import Footer from './components/footer';
import Hero from './components/hero';
import VideoSection from './components/video-section';
import RulesSection from './components/rules-section';
import Alert from './components/alert';

const PublicBetaSignup = () => (
    <Layout theme={{ mode: 'dark', logoColor: '#040A0A' }}>
        <Hero />

        <PathDescription />

        <FeaturesSection />

        <RulesSection />

        <VideoSection />

        <Footer />

        <Alert type="success" onCloseClick={() => console.log('click')}>
            Мы приняли вашу заявку! <br />
            До встречи в будущем.
        </Alert>
    </Layout>
);

export default PublicBetaSignup;
