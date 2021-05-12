import React, { useState, SetStateAction, Dispatch } from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

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
    logoColor: string
}

export interface INav {
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>,
    theme: ITheme,
    links: Array<INavItem>,
    pageNumber: number,
    setPageNumber: (page: number) => void
}

const Nav = ({ setIsPopupVisible, theme, links, pageNumber, setPageNumber }: INav) => {
    const [isOpen, setIsOpen] = useState(false);
    const cn = useClassnames(style);

    const onMenuButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const redirectHandler = () => {
        if(window.location.pathname === '/') {
            setPageNumber(0);

            return;
        }
        window.location.pathname = '/';
    };

    return (
        <nav className={cn('nav__wrapper', `nav__wrapper_${theme.mode}`, { 'nav__wrapper_open-menu': isOpen })}>
            <div className={cn('nav__left')}>
                <span className={cn('nav__logo')} onClick={redirectHandler}>
                    {theme.mode === 'light' && !isOpen ? <LogoWhite /> : <LogoBlack />}
                </span>
            </div>
            <div className={cn('nav__center', { 'nav__center_close': !isOpen })}>
                <ul className={cn('nav__list')}>
                    {
                        links.map(({ text, link }: INavItem, i: number) => (
                            <li key={i} className={cn('nav__list-item', { 'nav__list-item_active': pageNumber === i })}>
                                <Link to={link} className={cn('nav__link')}>
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
                    onClick={() => setIsPopupVisible(true)}
                >Присоединиться
                </button>
            </div>
            <div className={cn('nav__right')}>
                <button className={cn('nav__menu-button')} onClick={onMenuButtonClick}>
                    {isOpen ? <Cross fill="#040A0A" /> : <Burger fill={theme.mode === 'light' ? '#FFF' : '#040A0A'} />}
                </button>
            </div>
        </nav>
    );
};

export default Nav;
