import React from 'react';

import Layout from '../layout';
import Footer from '../footer';

const TechnologyPage = () => {
    const pageId = 'technology';
    const seo = {
        metaTitle      : 'Страница технологий',
        metaDescription: 'Технологичные технологии'
    };

    return (
        <Layout seo={seo} pageId={pageId}>
            Я страница технологий, привет!
            <Footer />
        </Layout>
    );
};

export default TechnologyPage;
