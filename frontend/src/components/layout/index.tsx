import React from 'react';

import Nav, { INav } from '../nav';
import Seo, { ISeo } from '../seo';
import RespondForm from '../RespondForm';
import ContactForm from '../ContactForm';
import CookieAlert from '../cookie-alert';
import { useClassnames } from '../../hooks/use-classnames';

import { AppProvider } from '../../context/context';

import style from './index.css';

interface IProps {
    children: React.ReactNode,
    seo?: ISeo,
    theme: INav['theme'],
    pageId: INav['pageId'],
    withNav?: boolean
}

const Layout = ({ children, seo, theme, pageId, withNav = true }: IProps) => {
    const cn = useClassnames(style);

    return (
        <AppProvider>
            <div className={cn('app__wrapper')}>
                <Seo seo={seo} />
                {withNav && (
                    <Nav
                        theme={theme}
                        pageId={pageId}
                        whiteLogoImportant={theme?.whiteLogoImportant}
                    />
                )}
                <main>{children}</main>
                <RespondForm />
                <ContactForm />
                <CookieAlert />
            </div>
        </AppProvider>
    );
};

export default Layout;
