import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const MINIMUM_SCROLL = 20;
const TIMEOUT_DELAY = 0;
const PADDING = 20;

import useDocumentScrollThrottled from './use-document-scroll-throttled';
import { gtagClicked } from '../../utils';
import LogoWhite from '../../images/logo-white.inline.svg';
import LogoBlack from '../../images/logo-black.inline.svg';
import Burger from '../../images/burger.inline.svg';
import Cross from '../../images/cross.inline.svg';

export interface INavItem {
    text: string,
    link: string
}

export interface ITheme {
    mode: string,
    logoColor: string,
    whiteLogoImportant?: boolean
}

export interface INav {
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>,
    theme: ITheme,
    links: Array<INavItem>,
    pageNumber: number,
    setPageNumber?: (page: number) => void,
    whiteLogoImportant?: boolean
}

const Nav = ({ setIsPopupVisible, theme, links, pageNumber, setPageNumber, whiteLogoImportant }: INav) => {
    const [isOpen, setIsOpen] = useState(false);
    const [indicatorStyles, setIndicatorStyles] = useState({});
    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const cn = useClassnames(style);

    useEffect(() => {
        setTimeout(() => {
            const activeElement = document.querySelector(`.nav__link-${pageNumber}`) as HTMLElement;

            setIndicatorStyles({
                transform: `translateX(${activeElement?.offsetLeft - PADDING}px)`,
                width    : activeElement?.offsetWidth
            });
        }, 200);
    }, [pageNumber]);

    useDocumentScrollThrottled(({ previousScrollTop, currentScrollTop }) => {
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        setTimeout(() => {
            if(theme.mode === 'dark') {
                setShouldHideHeader(isScrolledDown && isMinimumScrolled);
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
                    'nav__wrapper_hidden'   : shouldHideHeader
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
                        links.map(({ text, link }: INavItem, i: number) => (
                            <li key={i} className={cn('nav__list-item', { 'nav__list-item_active': pageNumber === i })}>
                                <Link to={link} className={cn('nav__link', `nav__link-${i}`)}>
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
                        Присоединиться
                    </button>
                    <span className={cn('nav__disclaimer')}>
                        Информация, опубликованная на Сайте предоставляется только в ознакомительных целях.
                    </span>
                    <div className={cn('nav__link-block')}>
                        <a className={cn('nav__link-bottom-block')} href="/" title="Политика конфиденциальности">Политика конфиденциальности</a>
                        <a className={cn('nav__link-bottom-block')} href="/" title="Оферта">Оферта</a>
                    </div>
                </div>
                <button
                    type="button"
                    className={cn('nav__accept-button')}
                    onClick={onClick}
                >Присоединиться
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
