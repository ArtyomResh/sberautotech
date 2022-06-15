import React, { useState, SetStateAction, Dispatch, useEffect, useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';
import useWindowSize from '../../hooks/use-window-resize';

import style from './index.css';

const MINIMUM_SCROLL = 5;
const TIMEOUT_DELAY = 0;
const PADDING = 20;

import useDocumentScrollThrottled from './use-document-scroll-throttled';
import { gtagClicked } from '../../utils';
import { appContext } from '../../context/context';

import LogoWhite from '../../images/logo-white.inline.svg';
import LogoBlack from '../../images/logo-black.inline.svg';
import Burger from '../../images/burger.inline.svg';
import Cross from '../../images/cross.inline.svg';

export interface INavItem {
    text: string,
    to: string
}

export interface ITheme {
    mode: string,
    logoColor: string,
    whiteLogoImportant?: boolean
}

export interface INav {
    theme: ITheme,
    pageNumber: number,
    setPageNumber?: (page: number) => void,
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
          }
          joinButtonText
        }
      }
    }
    allStrapiFooter {
        edges {
          node {
            header
            description
            disclaimer
            privacyPolicyLink
            privacyPolicyText
            email
            link {
                text
                to
            }
          }
        }
      }
  }
`;

const Nav = ({ theme, pageNumber, setPageNumber, whiteLogoImportant }: INav) => {
    const data = useStaticQuery(query);
    const [isOpen, setIsOpen] = useState(false);
    const [indicatorStyles, setIndicatorStyles] = useState({});
    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [shouldAddShadow, setShouldAddShadow] = useState(false);
    const { setIsPopupVisible } = useContext(appContext);
    const [width, height] = useWindowSize();
    const cn = useClassnames(style);

    const { links, joinButtonText } = data.allStrapiNavPanel.edges[0].node;
    const { disclaimer, privacyPolicyLink, privacyPolicyText } = data.allStrapiFooter.edges[0].node;

    useEffect(() => {
        setTimeout(() => {
            const activeElement = document.querySelector(`.nav__link-${pageNumber}`) as HTMLElement;

            setIndicatorStyles({
                transform: `translateX(${activeElement?.offsetLeft - PADDING}px)`,
                width    : activeElement?.offsetWidth
            });
        }, 200);
    }, [pageNumber, width, height]);

    console.log(links);

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
        if(pageNumber) {
            setPageNumber?.(0);
        }

        if(isOpen) {
            onMenuButtonClick();
        }
    };

    const onClick = () => {
        gtagClicked('header_button_click', 'Join button');
        setIsPopupVisible(true);
    };

    return (
        <nav
            className={
                cn('nav__wrapper', `nav__wrapper_${theme.mode}`, {
                    'nav__wrapper_open-menu': isOpen,
                    'nav__wrapper_hidden'   : shouldHideHeader,
                    'nav__wrapper_shadow'   : shouldAddShadow
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
                        links.map(({ text, to }: INavItem, i: number) => (
                            <li key={i} className={cn('nav__list-item', { 'nav__list-item_active': pageNumber === i })}>
                                <Link to={to} className={cn('nav__link', `nav__link-${i}`)}>
                                    {text}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div className={cn('nav__bottom-block')}>
                    <button
                        type="button"
                        className={cn('nav__bottom-block-accept-button')}
                        onClick={() => setIsPopupVisible(true)}
                    >
                        {joinButtonText}
                    </button>
                    <div className={cn('nav__link-block')}>
                        <Link className={cn('nav__link-bottom-block')} to={privacyPolicyLink} title={privacyPolicyText}>{privacyPolicyText}</Link>
                    </div>
                    <span className={cn('nav__disclaimer')}>
                        {disclaimer}
                    </span>
                </div>
                <button
                    type="button"
                    className={cn('nav__accept-button')}
                    onClick={onClick}
                >{joinButtonText}
                </button>
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
