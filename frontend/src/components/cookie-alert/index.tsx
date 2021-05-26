import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    onAcceptClick: () => void,
    onDeclineClick: () => void
}

const CookieAlert = ({ onAcceptClick, onDeclineClick }: IProps) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('cookie-alert')}>
            <div className={cn('cookie-alert__left')}>
                <h1 className={cn('cookie-alert__title')}>ПАО Сбербанк использует cookie</h1>
                <p className={cn('cookie-alert__text')}>
                    (файлы с данными о прошлых посещениях сайта) для персонализации сервисов и удобства пользователей.
                    Сбербанк серьезно относится к защите персональных данных — ознакомьтесь с условиями и принципами их обработки.
                    Вы можете запретить сохранение cookie в настройках своего браузера.
                </p>
            </div>
            <div className={cn('cookie-alert__right')}>
                <button className={cn('cookie-alert__button')} onClick={onAcceptClick}>Принять</button>
                <button className={cn('cookie-alert__button', 'cookie-alert__button_dark')} onClick={onDeclineClick}>Нет</button>
            </div>
        </div>
    );
};

export default CookieAlert;