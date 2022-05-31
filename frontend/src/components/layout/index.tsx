import React from 'react';

import Nav, { INav } from '../nav';
import Seo from '../seo';
import RespondForm from '../respond-form';
import CookieAlert from '../cookie-alert';
import { useClassnames } from '../../hooks/use-classnames';

import { AppProvider } from '../../context/context';

import style from './index.css';

interface IProps {
    children: React.ReactNode,
    seo?: Record<string, unknown>,
    theme?: INav['theme'],
    pageNumber?: INav['pageNumber'],
    setPageNumber?: INav['setPageNumber'],
    type?: string
}

const Layout = ({ children, seo, theme, pageNumber, setPageNumber, type }: IProps) => {
    const cn = useClassnames(style);

    if(type === 'pmef-landing-page') {
        return (
            <AppProvider>
                <main>{children}</main>
            </AppProvider>
        );
    }

    return (
        <AppProvider>
            <div className={cn('app__wrapper')}>
                <Seo seo={seo} />
                <Nav theme={theme} pageNumber={pageNumber} setPageNumber={setPageNumber} whiteLogoImportant={theme?.whiteLogoImportant} />
                <main>{children}</main>
                <RespondForm />
                <CookieAlert />
            </div>
        </AppProvider>
    );
};

export default Layout;
