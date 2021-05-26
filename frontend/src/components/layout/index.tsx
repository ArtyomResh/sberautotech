import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Nav, { INav } from '../nav';
import Seo from '../seo';
import RespondForm from '../respond-form';
import CookieAlert from '../cookie-alert';
import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const LINKS = [
    { text: 'О компании', link: '/about-company' },
    { text: 'Беспилотный транспорт', link: '/self-driving-car' },
    { text: 'Карьера', link: '/career' }
];

interface IProps {
    children: React.ReactNode,
    seo: Record<string, unknown>,
    theme: INav['theme'],
    pageNumber: INav['pageNumber'],
    setPageNumber?: INav['setPageNumber']
}

const SHOW_COOKIE_POLICY = 'SHOW_COOKIE_POLICY';

const Layout = ({ children, seo, theme, pageNumber, setPageNumber }: IProps) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isCookieVisible, setIsCookieVisible] = useState(Boolean(!localStorage.getItem(SHOW_COOKIE_POLICY)));
    const cn = useClassnames(style);

    const onClick = () => {
        setIsCookieVisible(false);
        localStorage.setItem(SHOW_COOKIE_POLICY, 'false');
    };

    return (
        <div className={cn('app__wrapper')}>
            <Seo seo={seo} />
            <Nav setIsPopupVisible={setIsPopupVisible} theme={theme} links={LINKS} pageNumber={pageNumber} setPageNumber={setPageNumber} />
            <main>{children}</main>
            {isPopupVisible && <RespondForm setIsPopupVisible={setIsPopupVisible} />}
            {isCookieVisible && <CookieAlert onAcceptClick={onClick} onDeclineClick={onClick} />}
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
