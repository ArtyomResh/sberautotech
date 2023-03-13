import { isThisQuarter } from 'date-fns';
import React from 'react';

import Footer from '../footer';
import Layout from '../layout';
import PageSection from '../PageSection';

import AboutTesting from './components/AboutTesting';
import DriveAlgorithms from './components/DriveAlgorithms';
import Principles from './components/Principles';
import Sensors from './components/Sensors';
import TechnologyBanner from './components/TechnologyBanner';
import TransportTypes from './components/TransportTypes';

const TechnologyPage = () => {
    const pageId = 'technology';
    const seo = {
        metaTitle      : 'Страница технологий',
        metaDescription: 'Технологичные технологии'
    };

    const footerText = 'Заполните форму, чтобы познакомиться с&nbsp;нами поближе или задать вопрос!';

    return (
        <Layout seo={seo} pageId={pageId} withNavOffset={true}>
            <PageSection removeAboveOffset={true} removeBelowOffset={true}>
                <TechnologyBanner />
            </PageSection>

            <PageSection removeAboveOffset={true} removeBelowOffset={true}>
                <Principles />
            </PageSection>

            <PageSection>
                <TransportTypes />
            </PageSection>

            <PageSection>
                <Sensors />
            </PageSection>

            <PageSection>
                <DriveAlgorithms />
            </PageSection>

            <PageSection>
                <AboutTesting />
            </PageSection>

            <Footer header={footerText} />
        </Layout>
    );
};

export default TechnologyPage;
