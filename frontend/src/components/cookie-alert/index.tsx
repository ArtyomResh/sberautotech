import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import CookieConsent from 'react-cookie-consent';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const query = graphql`
  query {
    strapiGlobal {
      cookieBanner {
        title
        description
        decline
        accept
      }
    }
  }
`;

const CookieAlert = () => {
    const cn = useClassnames(style);
    const { strapiGlobal: { cookieBanner: { title, description, decline, accept } } } = useStaticQuery(query);

    return (
        <CookieConsent
            disableStyles={true}
            location="bottom"
            buttonText={accept}
            declineButtonText={decline}
            containerClasses={cn('cookie-alert')}
            buttonWrapperClasses={cn('cookie-alert__right')}
            buttonClasses={cn('cookie-alert__button')}
            declineButtonClasses={cn('cookie-alert__button', 'cookie-alert__button_dark')}
            enableDeclineButton={true}
            flipButtons={true}
            cookieName="gatsby-gdpr-google-analytics"
        >
            <h1 className={cn('cookie-alert__title')}>
                {title}
            </h1>
            <p className={cn('cookie-alert__text')}>
                {description}
            </p>
        </CookieConsent>
    );
};

export default CookieAlert;
