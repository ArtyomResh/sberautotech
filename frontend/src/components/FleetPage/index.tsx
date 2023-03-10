import React from 'react';

import Footer from '../footer';
import Layout from '../layout';
import PageSection from '../PageSection';

const FleetPage = () => {
    const pageId = 'fleet';
    const seo = {
        metaTitle      : 'Флот беспилотных автомобилей',
        metaDescription: 'Беспилотная технология совместима с разными видами транспорта. Флот SberAutoTech — это почти 200 легковых и грузовых автомобилей, а также ФЛИП, полностью автономный электромобиль'
    };

    return (
        <Layout seo={seo} pageId={pageId} withNavOffset={true}>
            <PageSection removeAboveOffset={true} removeBelowOffset={true}>
                <h1>Страница "ФЛОТ"</h1>
            </PageSection>

            <Footer />
        </Layout>
    );
};

export default FleetPage;
