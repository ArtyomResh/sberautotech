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
    type?: string,
    withNav?: boolean
}

const Layout = ({ children, seo, theme, pageNumber, setPageNumber, type, withNav = true }: IProps) => {
    const cn = useClassnames(style);

    return (
        <AppProvider>
            <div className={cn('app__wrapper')}>
                <Seo seo={seo} />
                {withNav && (
                    <Nav
                        theme={theme}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        whiteLogoImportant={theme?.whiteLogoImportant}
                    />
                )}
                <main>{children}</main>
                <RespondForm />
                <CookieAlert />
            </div>
        </AppProvider>
    );
};

export default Layout;
