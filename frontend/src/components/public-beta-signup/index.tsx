import React, { useState, useEffect } from 'react';

import Layout from '../layout';

import FeaturesSection from './components/features-section';
import PathDescription from './components/path-description';
import Footer from './components/footer';
import Hero from './components/hero';
import VideoSection from './components/video-section';
import RulesSection from './components/rules-section';
// import SignupModal from './components/signup-modal';
// import Alert from './components/alert';
import Header from './components/header';

const PublicBetaSignup = () => {
    const [showRegistrationResultAlert, setShowRegistrationResultAlert] = useState<boolean>(false);
    // const [registrationResult, setRegistrationResult] = useState<'success' | 'error'>('success');

    useEffect(() => {
        const popupShowTime = 3000;

        if(showRegistrationResultAlert) {
            const timer = setTimeout(() => {
                setShowRegistrationResultAlert(false);
            }, popupShowTime);

            return () => clearTimeout(timer);
        }
    }, [showRegistrationResultAlert]);

    // const handleRegistrationResultAlertClose = () => setShowRegistrationResultAlert(false);

    // const handleSubmitStart = () => {
    //     setShowRegistrationResultAlert(false);
    // };

    // const handleSignupSuccess = async () => {
    //     setRegistrationResult('success');
    //     setShowRegistrationResultAlert(true);
    // };

    // const handleSignupError = async () => {
    //     setRegistrationResult('error');
    //     setShowRegistrationResultAlert(true);
    // };

    // const alertsDataByRegistrationResult = {
    //     success: 'Мы&#160;приняли вашу заявку!<br />До&#160;встречи в&#160;будушем.',
    //     error  : 'Заявка не&#160;отправлена.<br />Попробуйте еще раз.'
    // };

    return (
        <Layout theme={{ mode: 'dark', logoColor: '#040A0A' }} withNav={false} pageId="moscow">
            <Header />

            <Hero /* onLinkClick={handleRegistrationResultAlertClose} */ />

            <PathDescription />

            <FeaturesSection />

            <RulesSection />

            <VideoSection />

            <Footer />

            {/* <SignupModal onSuccess={handleSignupSuccess} onError={handleSignupError} onSubmit={handleSubmitStart} /> */}

            {/* <Alert
                type={registrationResult}
                onCloseClick={handleRegistrationResultAlertClose}
                isVisible={showRegistrationResultAlert}
            >
                {alertsDataByRegistrationResult[registrationResult]}
            </Alert> */}
        </Layout>
    );
};

export default PublicBetaSignup;
