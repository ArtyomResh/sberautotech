import React from 'react';

import Layout from '../components/layout';

const NotFoundPage = () => (
    <Layout
        theme={{ mode: 'dark', logoColor: '#040A0A' }}
        seo={{
            metaTitle      : '404: Not found',
            metaDescription: 'It looks like you got lost'
        }}
        pageNumber={0}
    >
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn't exist... the sadness.</p>
    </Layout>
);

export default NotFoundPage;
