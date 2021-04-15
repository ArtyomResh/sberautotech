import React from 'react';
import { Link } from 'gatsby';
import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const Footer = ({ text, links, phones }) => {
    const cn = useClassnames(style);

    return (
        <footer className={cn('footer__wrapper')}>
            <div className={cn('footer__left')}>
                <p>{text}</p>
            </div>
            <div className={cn('footer__center')}>
                {
                    // TODO: формат ссылок
                    links.map(({ text, to }, i) => <Link key={i} className={cn('footer__link')} to={to}>{text}</Link>)
                }
            </div>
            <div className={cn('footer__right')}>
                {
                    // TODO: формат номеров
                    phones.map((phone, i) => <a key={i} className={cn('footer__link')} href={`tel:${phone.replace(/ /g, '')}`}>{phone}</a>)
                }
            </div>
        </footer>
    );
};

export default Footer;
