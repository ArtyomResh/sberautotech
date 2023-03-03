import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useState, useRef } from 'react';

import { YM_ID } from '../../constants';
import { useAppContext } from '../../context/context';
import { useClassnames } from '../../hooks/use-classnames';
import Burger from '../../images/burger.inline.svg';
import Cross from '../../images/cross.inline.svg';
import LogoBlack from '../../images/logo-black.inline.svg';
import { IStrapiSingleType } from '../../types/strapi';
import { INavHierachicalLink, INavPanel, INavSubLink } from '../../types/strapi/navPanel';
import { gtagClicked } from '../../utils';
import Button from '../button-like/button';
import GridWrapper from '../grid-wrapper';

import './index.css';
import useDocumentScrollThrottled from './use-document-scroll-throttled';

const MINIMUM_SCROLL = 5;
const TIMEOUT_DELAY = 0;

export interface INavProps {
    currentPageId?: string
}

const query = graphql`
  query {
    allStrapiNavPanel {
      edges {
        node {
          hierarchicalLinks {
              text
              to
              navId
              sublinks {
                text
                to
                navId
                image {
                    localFile {
                        url
                    }
                }
              }
          }
          joinButtonText
          switchLangUrl
        }
      }
    }
  }
`;

type TNavId = INavHierachicalLink['navId'] | INavSubLink['navId'];

interface IQueryData {
    allStrapiNavPanel: IStrapiSingleType<Pick<INavPanel, 'hierarchicalLinks' | 'joinButtonText' | 'switchLangUrl'>>
}


const NavMenuItem: React.FC<{
    item: INavHierachicalLink,
    onMouseEnter: React.MouseEventHandler,
    onMouseLeave: React.MouseEventHandler
}> = ({ item, onMouseEnter, onMouseLeave }) => {
    const { text, to, navId, sublinks } = item;
    const cn = useClassnames();
    const sublistRef = useRef<HTMLDivElement>(null);

    return (
        <li
            id={`nav__link-${navId}`}
            className={cn('nav__list-item')}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {to ? (
                <Link
                    to={to}
                    className={cn('nav__list-item-link')}
                >
                    {text}
                </Link>
            ) : (
                <div
                    className={cn('nav__list-item-text')}
                >
                    {text}
                </div>
            ) }
            {sublinks && sublinks.length > 0 && (
                <div className={cn('nav__submenu')}>
                    <div className={cn('nav__submenu-overlay')} style={{ height: sublistRef.current?.clientHeight }} />
                    <div className={cn('nav__submenu-content')} ref={sublistRef}>
                        <ul className={cn('nav__submenu-list')}>
                            {sublinks.map((sublink, index) => (
                                <li key={`sublink-${index}`} className={cn('nav__submenu-list-item')}>
                                    <Link to={sublink.to} className={cn('nav__submenu-list-item-link')}>
                                        {sublink.text}
                                    </Link>
                                    {sublink.image?.localFile.url && <img src={sublink.image?.localFile.url} className={cn('nav__submenu-list-item-icon')} /> }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </li>
    );
};

const Nav = ({ currentPageId }: INavProps) => {
    const data = useStaticQuery<IQueryData>(query);
    const [isOpen, setIsOpen] = useState(false);
    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [isMinimumScrolled, setIsMinimumScrolled] = useState(false);
    const { setIsContactFormVisible, setIsNavVisible } = useAppContext();
    const cn = useClassnames();
    const [hoveredMenuItemId, setHoveredMenuItemId] = useState<TNavId | null>(null);
    const { hierarchicalLinks, joinButtonText/* , switchLangUrl*/ } = data.allStrapiNavPanel.edges[0].node;

    // TODO: убрать скрытие ссылки на страницу технологии в рамках SBER-306
    const hideTechnology = process.env.NODE_ENV !== 'development' && process.env.IS_DEV_STAGE !== 'true';

    const links = hideTechnology ? hierarchicalLinks.filter((link) => !link.to || !link.to.includes('/technology')) : hierarchicalLinks;

    const isSubMenuOpened = (link: INavHierachicalLink) => {
        return !shouldHideHeader && link.sublinks.length > 0 && hoveredMenuItemId === link.navId;
    };

    const shouldShowShadow = isMinimumScrolled && !links.some(isSubMenuOpened) && !isOpen;

    useDocumentScrollThrottled(({ previousScrollTop, currentScrollTop }) => {
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        setTimeout(() => {
            setShouldHideHeader(isScrolledDown && isMinimumScrolled);
            setIsMinimumScrolled(isMinimumScrolled);
        }, TIMEOUT_DELAY);
    });

    const onMenuButtonClick = () => {
        setIsOpen(!isOpen);
        setIsNavVisible?.(!isOpen);
    };

    const redirectHandler = () => {
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


    const handleMenuItemMouseEnter = (navId: TNavId) => () => {
        setHoveredMenuItemId(navId);
    };
    const handleMenuItemMouseLeave = () => {
        setHoveredMenuItemId(null);
    };

    // TODO: вернуть в рамках https://jira.csssr.io/browse/SBER-265
    // const renderSwitchLangBtn = () => {
    //     return Boolean(switchLangUrl) && (
    //         <a className={cn('nav__switch-lang-link')} href={switchLangUrl} onClick={redirectHandler}>
    //             {isRu ? 'En' : 'Ru'}
    //         </a>
    //     );
    // };

    return (
        <GridWrapper
            as="nav"
            className={
                cn('nav', {
                    'nav_open-menu': isOpen,
                    'nav_hidden'   : shouldHideHeader,
                    'nav_shadow'   : shouldShowShadow
                })
            }
        >
            <div className={cn('nav__left')}>
                <Link className={cn('nav__logo')} to="/" onClick={redirectHandler} state={{ toTop: true }}>
                    <LogoBlack />
                </Link>
            </div>
            <div className={cn('nav__center', { 'nav__center_close': !isOpen })}>
                <ul className={cn('nav__list')}>
                    {
                        links.map((item: INavHierachicalLink, i: number) => (
                            <NavMenuItem
                                key={i}
                                item={item}
                                onMouseEnter={handleMenuItemMouseEnter(item.navId)}
                                onMouseLeave={handleMenuItemMouseLeave}
                            />
                        ))
                    }
                </ul>

                <div className={cn('nav__buttons')}>
                    <div className={cn('nav__desktop-switch-lang-btn')}>
                        {/* {renderSwitchLangBtn()} */}
                    </div>
                    <Button
                        type="button"
                        buttonSize="s"
                        className={cn('nav__contact-button')}
                        onClick={onClick}
                    >
                        {joinButtonText}
                    </Button>
                </div>
            </div>
            <div className={cn('nav__collapsed-menu-buttons')}>
                {/* {renderSwitchLangBtn()} */}
                <button className={cn('nav__burger')} onClick={onMenuButtonClick}>
                    {isOpen ? <Cross fill="#040A0A" /> : <Burger />}
                </button>
            </div>
        </GridWrapper>
    );
};

export default Nav;
