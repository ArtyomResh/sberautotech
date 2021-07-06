import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Nav, { INav } from '../nav';
import Seo from '../seo';
import RespondForm from '../respond-form';
import CookieAlert from '../cookie-alert';
import { useClassnames } from '../../hooks/use-classnames';

import { AppProvider } from '../../context/context';

import style from './index.css';

interface IProps {
    children: React.ReactNode,
    seo: Record<string, unknown>,
    theme: INav['theme'],
    pageNumber?: INav['pageNumber'],
    setPageNumber?: INav['setPageNumber']
}

const Layout = ({ children, seo, theme, pageNumber, setPageNumber }: IProps) => {
    const cn = useClassnames(style);


    return (
        <AppProvider>
            <div className={cn('app__wrapper')}>
                <Seo seo={seo} />
                <Nav theme={theme} pageNumber={pageNumber} setPageNumber={setPageNumber} whiteLogoImportant={theme.whiteLogoImportant} />
                <main>{children}</main>
                <RespondForm />
                <CookieAlert />
            </div>
        </AppProvider>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
