import React, { useState } from 'react';

import Logo from '../../../../../static/logo.inline.svg';

// import { YM_ID } from '../../../../constants';
import { useClassnames } from '../../../../hooks/use-classnames';
import useDocumentScrollThrottled from '../../../nav/use-document-scroll-throttled';
// import { BETA_TEST_SIGNUP_FORM_URL } from '../../constants';
// import LinkButton from '../../../link-button';

import styles from './index.css';

const Header = () => {
    const cn = useClassnames(styles);
    const [shouldHideHeader, setShouldHideHeader] = useState(true);

    useDocumentScrollThrottled(({ currentScrollTop }) => {
        const MINIMUM_SCROLL = 1000;
        const TIMEOUT_DELAY = 0;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        setTimeout(() => {
            if(isMinimumScrolled) {
                setShouldHideHeader(false);
            } else {
                setShouldHideHeader(true);
            }
        }, TIMEOUT_DELAY);
    });

    // const handleLinkClick = () => {
    //     // @ts-expect-error: ym подставляется только при NODE_ENV === 'production'
    //     typeof ym !== 'undefined' && ym(YM_ID, 'reachGoal', 'click--button--prinyat_uchastie');
    // };

    return (
        <header className={cn('header', { 'header_hidden': shouldHideHeader })}>
            <Logo className={cn('header_logo')} />

            {/* <LinkButton
                className={cn('header__button')}
                href={BETA_TEST_SIGNUP_FORM_URL}
                size="s"
                onClick={handleLinkClick}
            >
                Принять участие
            </LinkButton> */}
        </header>
    );
};

export default Header;
