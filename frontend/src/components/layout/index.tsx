import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Nav, { INav } from '../nav';
import Seo from '../seo';
import RespondForm from '../respond-form';
import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const LINKS = [
    { text: 'ФЛИП', link: '/flip' },
    { text: 'Беспилотный автомобиль', link: '/self-driving-car' },
    { text: 'Карьера', link: '/career' },
    { text: 'О компании', link: '/about-company' }
];

interface IProps {
    children: React.ReactNode,
    seo: Record<string, unknown>,
    theme: INav['theme'],
    pageNumber: INav['pageNumber'],
    setPageNumber?: INav['setPageNumber']
}

const Layout = ({ children, seo, theme, pageNumber, setPageNumber }: IProps) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const cn = useClassnames(style);

    return (
        <div className={cn('app__wrapper')}>
            <Seo seo={seo} />
            <Nav setIsPopupVisible={setIsPopupVisible} theme={theme} links={LINKS} pageNumber={pageNumber} setPageNumber={setPageNumber} whiteLogoImportant={theme.whiteLogoImportant} />
            <main>{children}</main>
            {isPopupVisible ? (
                <RespondForm setIsPopupVisible={setIsPopupVisible} />
            ) : null}
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
