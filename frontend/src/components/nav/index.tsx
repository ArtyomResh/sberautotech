import React, { useState, useEffect, useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';
import useWindowSize from '../../hooks/use-window-resize';

import style from './index.css';

const MINIMUM_SCROLL = 5;
const TIMEOUT_DELAY = 0;
const PADDING = 20;

import useDocumentScrollThrottled from './use-document-scroll-throttled';
import { gtagClicked, toUnescapedHTML } from '../../utils';
import { appContext } from '../../context/context';
import { YM_ID } from '../../constants';

import LogoWhite from '../../images/logo-white.inline.svg';
import LogoBlack from '../../images/logo-black.inline.svg';
import Burger from '../../images/burger.inline.svg';
import Cross from '../../images/cross.inline.svg';
import Button from '../button';
import { BETA_TEST_LANADING_NAV_ID, BETA_TEST_LANDING_URL } from '../public-beta-signup/constants';
import { isRu } from '../../utils/locale';

export interface INavItem {
    text: string,
    to: string,
    navId: string
}

export interface ITheme {
    mode: string,
    logoColor: string,
    whiteLogoImportant?: boolean
}

export interface INav {
    theme: ITheme,
    pageId: string,
    setActivePageId?: (page: string) => void,
    whiteLogoImportant?: boolean
}

const query = graphql`
  query {
    allStrapiNavPanel {
      edges {
        node {
          links {
              text
              to
              navId
          }
          joinButtonText
        }
      }
    }
    allStrapiFooter {
        edges {
          node {
            disclaimer
            privacyPolicyLink
            privacyPolicyText
          }
        }
      }
  }
`;

export const BETA_TEST_NAV_LINK: INavItem = {
    to   : BETA_TEST_LANDING_URL,
    text : 'Крылатское',
    navId: BETA_TEST_LANADING_NAV_ID
};


const Nav = ({ theme, pageId, setActivePageId, whiteLogoImportant }: INav) => {
    const data = useStaticQuery(query);
    const [isOpen, setIsOpen] = useState(false);
    const [indicatorStyles, setIndicatorStyles] = useState({});
    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [shouldAddShadow, setShouldAddShadow] = useState(false);
    const { setIsContactFormVisible } = useContext(appContext);
    const [width, height] = useWindowSize();
    const cn = useClassnames(style);

    const { links, joinButtonText } = data.allStrapiNavPanel.edges[0].node;
    const { disclaimer, privacyPolicyLink, privacyPolicyText } = data.allStrapiFooter.edges[0].node;

    useEffect(() => {
        const ANIMATION_DELAY = 200;

        setTimeout(() => {
            const activeElement = document.querySelector(`.nav__link-${pageId}`) as HTMLElement;

            setIndicatorStyles({
                transform: `translateX(${activeElement?.offsetLeft - PADDING}px)`,
                width    : activeElement?.offsetWidth
            });
        }, ANIMATION_DELAY);
    }, [pageId, width, height]);

    useDocumentScrollThrottled(({ previousScrollTop, currentScrollTop }) => {
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        setTimeout(() => {
            if(theme.mode === 'dark') {
                setShouldHideHeader(isScrolledDown && isMinimumScrolled);
                setShouldAddShadow(isMinimumScrolled);
            }
        }, TIMEOUT_DELAY);
    });

    const onMenuButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const redirectHandler = () => {
        if(pageId) {
            setActivePageId?.(pageId);
        }

        if(isOpen) {
            onMenuButtonClick();
        }
    };

    const onClick = () => {
        gtagClicked('header_button_click');
        // @ts-expect-error: ym подставляется только при NODE_ENV === 'production'
        typeof ym !== 'undefined' && ym(YM_ID, 'reachGoal', 'form--success--svyazatsya_s_nami');

        setIsContactFormVisible?.(true);
    };

    return (
        <nav
            className={
                cn('nav', `nav_${theme.mode}`, {
                    'nav_open-menu': isOpen,
                    'nav_hidden'   : shouldHideHeader,
                    'nav_shadow'   : shouldAddShadow
                })
            }
        >
            <div className={cn('nav__left')}>
                <Link className={cn('nav__logo')} to="/" onClick={redirectHandler}>
                    {(theme.mode === 'light' && !isOpen) || (whiteLogoImportant && !isOpen) ? <LogoWhite /> : <LogoBlack />}
                </Link>
            </div>
            <div className={cn('nav__center', { 'nav__center_close': !isOpen })}>
                <ul className={cn('nav__list')}>
                    <div className={cn('nav__indicator')} style={indicatorStyles} />
                    {
                        (isRu ? [BETA_TEST_NAV_LINK, ...links] : links).map(({ text, to, navId }: INavItem, i: number) => (
                            <li key={i} className={cn('nav__list-item', { 'nav__list-item_active': pageId === navId })}>
                                <Link to={to} className={cn('nav__link', `nav__link-${navId}`)}>
                                    {text}
                                </Link>
                            </li>
                        ))
                    }
                </ul>

                <div className={cn('nav__bottom-block')}>
                    {isRu && (
                        <Button
                            type="button"
                            className={cn('nav__bottom-block-accept-button')}
                            isBlock={true}
                            onClick={onClick}
                        >
                            {joinButtonText}
                        </Button>
                    )}

                    <div className={cn('nav__link-block')}>
                        <Link className={cn('nav__link-bottom-block')} to={privacyPolicyLink} title={privacyPolicyText}>{privacyPolicyText}</Link>
                    </div>

                    <span className={cn('nav__disclaimer')}>
                        {toUnescapedHTML(disclaimer)}
                    </span>
                </div>

                {isRu && (
                    <Button
                        type="button"
                        buttonSize="s"
                        className={cn('nav__accept-button')}
                        onClick={onClick}
                    >
                        {joinButtonText}
                    </Button>
                )}
            </div>
            <div className={cn('nav__right')}>
                <button className={cn('nav__menu-button')} onClick={onMenuButtonClick}>
                    {isOpen ? <Cross fill="#040A0A" /> : <Burger fill={theme.mode === 'light' || whiteLogoImportant ? '#FFF' : '#040A0A'} />}
                </button>
            </div>
        </nav>
    );
};

export default Nav;
