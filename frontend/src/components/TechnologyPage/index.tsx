import React from 'react';

import Footer from '../footer';
import Layout from '../layout';

import { PageSection } from './components/PageSection';
import Principles from './components/Principles';
import Sensors from './components/Sensors';
import { TechnologyBanner } from './components/TechnologyBanner';
import TransportTypes from './components/TransportTypes';

const TechnologyPage = () => {
    const pageId = 'technology';
    const seo = {
        metaTitle      : 'Страница технологий',
        metaDescription: 'Технологичные технологии'
    };

    return (
        <Layout seo={seo} pageId={pageId}>
            {/* Избавиться от хака с margin-top в рамках https://jira.csssr.io/browse/SBER-256 */}
            <div style={{ marginTop: 84 }}>
                <PageSection removeAboveOffset={true} removeBelowOffset={true}>
                    <TechnologyBanner />
                </PageSection>
            </div>

            <PageSection>
                <Principles />
            </PageSection>

            <PageSection>
                <TransportTypes />
            </PageSection>

            <PageSection>
                <Sensors />
            </PageSection>

            <Footer />
        </Layout>
    );
};

export default TechnologyPage;
