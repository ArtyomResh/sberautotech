import React from 'react';
import { useClassnames } from '../../hooks/use-classnames';
import { gtagClicked } from '../../utils';

import style from './index.css';

interface IProps {
    data: {
        header: string,
        description: string,
        disclaimer: string,
        privacyPolicyLink: string,
        publicOfferLink: string,
        email: string,
        link: {
            to: string,
            text: string
        }
    }
}

const Footer = ({ data }: IProps) => {
    const cn = useClassnames(style);

    return (
        <footer className={cn('footer__wrapper')}>
            <div className={cn('footer__top-block')}>
                <div className={cn('footer__header')}>{data.header}</div>
                <a
                    target="_blank"
                    href={data.link.to}
                    className={cn('footer__link')}
                    onClick={() => gtagClicked('footer_button_click')}
                >
                    {data.link.text}
                </a>
            </div>
            <div className={cn('footer__bottom-block')}>
                <div className={cn('footer__bottom-block_left')}>
                    <span className={cn('footer__disclaimer')}>{data.disclaimer}</span>
                    <a className={cn('footer__documents-link')} href={data.privacyPolicyLink}>Политика конфиденциальности</a>
                    <a className={cn('footer__documents-link')} href={data.publicOfferLink}>Оферта</a>
                </div>
                <div className={cn('footer__bottom-block_right')}>
                    <a className={cn('footer__email-link')} href={`mailto:${data.email}`}>{data.email}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
