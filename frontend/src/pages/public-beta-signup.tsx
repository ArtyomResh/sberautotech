import Layout from '../components/layout';
import React from 'react';
import style from './public-beta-signup.css';
import { useClassnames } from '../hooks/use-classnames';

const PublicBetaSignup = () => {
    const cn = useClassnames(style);

    return (
        <Layout theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={4}>
            <div className={cn('public-beta-signup__wrapper')}>
                <h1>Публичное тестирование</h1>
            </div>
        </Layout>
    );
};

export default PublicBetaSignup;
