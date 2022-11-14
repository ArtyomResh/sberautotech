import React, { useState } from 'react';

import Layout from '../layout';

import FeaturesSection from './components/features-section';
import PathDescription from './components/path-description';
import Footer from './components/footer';
import Hero from './components/hero';
import VideoSection from './components/video-section';
import RulesSection from './components/rules-section';
import SignupModal from './components/signup-modal';
import Alert from './components/alert';

const PublicBetaSignup = () => {
    const [showRegistrationResultAlert, setShowRegistrationResultAlert] = useState<boolean>(false);
    const [registrationResult, setRegistrationResult] = useState<'success' | 'error'>('success');

    const handleRegistrationResultAlertClose = () => setShowRegistrationResultAlert(false);

    const handleSubmitStart = () => {
        setShowRegistrationResultAlert(false);
    };

    const handleSignupSuccess = async () => {
        setRegistrationResult('success');
        setShowRegistrationResultAlert(true);
    };

    const handleSignupError = async () => {
        setRegistrationResult('error');
        setShowRegistrationResultAlert(true);
    };

    const registrationAlert = registrationResult === 'success' ? <Alert type="success" onCloseClick={handleRegistrationResultAlertClose}>Мы&#160;приняли вашу заявку!<br />До&#160;встречи в&#160;будушем.</Alert> : <Alert type="error" onCloseClick={handleRegistrationResultAlertClose}>Заявка не&#160;отправлена.<br />Попробуйте еще раз.</Alert>;

    return (
        <Layout theme={{ mode: 'dark', logoColor: '#040A0A' }}>
            <Hero />

            <PathDescription />

            <FeaturesSection />

            <RulesSection />

            <VideoSection />

            <Footer />

            <SignupModal onSuccess={handleSignupSuccess} onError={handleSignupError} onSubmit={handleSubmitStart} />
            {showRegistrationResultAlert && registrationAlert}
        </Layout>
    );
};

export default PublicBetaSignup;
