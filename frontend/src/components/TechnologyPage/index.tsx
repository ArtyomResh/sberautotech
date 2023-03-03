import React from 'react';

import Footer from '../footer';
import Layout from '../layout';

import AboutTesting from './components/AboutTesting';
import DriveAlgorithms from './components/DriveAlgorithms';
import PageSection from './components/PageSection';
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

    return (
        <Layout seo={seo} pageId={pageId}>
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

            <Footer />
        </Layout>
    );
};

export default TechnologyPage;
