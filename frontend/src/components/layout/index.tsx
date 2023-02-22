import React from 'react';

import Nav, { INavProps } from '../nav';
import Seo, { ISeo } from '../seo';
import RespondForm from '../RespondForm';
import ContactForm from '../ContactForm';
import CookieAlert from '../cookie-alert';
import { useClassnames } from '../../hooks/use-classnames';

import { AppProvider } from '../../context/context';

import './index.css';

interface IProps {
    children: React.ReactNode,
    seo?: ISeo,
    pageId?: INavProps['currentPageId'],
    withNav?: boolean
}

const Layout = ({ children, seo, pageId, withNav = true }: IProps) => {
    const cn = useClassnames();

    return (
        <AppProvider>
            <div className={cn('app__wrapper')}>
                <Seo seo={seo} />
                {withNav && (
                    <Nav currentPageId={pageId} />
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
