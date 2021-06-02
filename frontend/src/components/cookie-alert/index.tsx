import React from 'react';
import CookieConsent from 'react-cookie-consent';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const CookieAlert = () => {
    const cn = useClassnames(style);

    return (
        <CookieConsent
            disableStyles={true}
            location="bottom"
            buttonText="Принять"
            declineButtonText="Нет"
            containerClasses={cn('cookie-alert')}
            buttonWrapperClasses={cn('cookie-alert__right')}
            buttonClasses={cn('cookie-alert__button')}
            declineButtonClasses={cn('cookie-alert__button', 'cookie-alert__button_dark')}
            enableDeclineButton={true}
            flipButtons={true}
            cookieName="gatsby-gdpr-google-analytics"
        >
            <h1 className={cn('cookie-alert__title')}>
                Мы используем файлы cookies (куки-файлы) c целью повышения удобства пользования веб-сайтом.
            </h1>
            <p className={cn('cookie-alert__text')}>
                Если Вы не хотите, чтобы Ваши пользовательские данные обрабатывались, пожалуйста, ограничьте их использование в своём браузере.
            </p>
        </CookieConsent>
    );
};

export default CookieAlert;