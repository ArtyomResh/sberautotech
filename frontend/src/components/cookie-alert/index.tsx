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
            <h1 className={cn('cookie-alert__title')}>ПАО Сбербанк использует cookie</h1>
            <p className={cn('cookie-alert__text')}>
                (файлы с данными о прошлых посещениях сайта) для персонализации сервисов и удобства пользователей.
                Сбербанк серьезно относится к защите персональных данных — ознакомьтесь с условиями и принципами их обработки.
                Вы можете запретить сохранение cookie в настройках своего браузера.
            </p>
        </CookieConsent>
    );
};

export default CookieAlert;