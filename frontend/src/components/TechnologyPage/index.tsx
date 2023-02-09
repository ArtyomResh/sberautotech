import React from 'react';

import Layout from '../layout';
import Footer from '../footer';
import { TechnologyBanner } from './components/TechnologyBanner';
import { PageSection } from './components/PageSection';

const TechnologyPage = () => {
    const pageId = 'technology';
    const seo = {
        metaTitle      : 'Страница технологий',
        metaDescription: 'Технологичные технологии'
    };

    return (
        <Layout seo={seo} pageId={pageId}>
            {/* Избавиться от хака с margin-top в рамках https://jira.csssr.io/browse/SBER-255 */}
            <div style={{ marginTop: 84 }}>
                <PageSection removeAboveOffset={true} removeBelowOffset={true}>
                    <TechnologyBanner />
                </PageSection>
            </div>

            <Footer />
        </Layout>
    );
};

export default TechnologyPage;
