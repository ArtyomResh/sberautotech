import React from 'react';

import { AppProvider } from '../../context/context';
import { useClassnames } from '../../hooks/use-classnames';
import ContactForm from '../ContactForm';
import CookieAlert from '../cookie-alert';
import Nav, { INavProps } from '../nav';
import RespondForm from '../RespondForm';
import Seo, { ISeo } from '../seo';

import './index.css';

interface IProps {
    children: React.ReactNode,
    seo?: ISeo,
    pageId?: INavProps['currentPageId'],
    withNavOffset?: boolean
}

const Layout = ({ children, seo, pageId, withNavOffset }: IProps) => {
    const cn = useClassnames();
    const cssBlock = 'app-layout';

    return (
        <AppProvider>
            <div className={cn(cssBlock)}>
                <Seo seo={seo} />
                <Nav currentPageId={pageId} />
                <main className={cn(`${cssBlock}__main`, { [`${cssBlock}__main_nav-offset`]: withNavOffset })}>{children}</main>
                <RespondForm />
                <ContactForm />
                <CookieAlert />
            </div>
        </AppProvider>
    );
};

export default Layout;
