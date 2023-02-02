import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';
import useDeviceDetect from '../hooks/use-device-detect';

import Layout from '../components/layout';
import MainPageBlock, { IBlock } from '../components/main-page-block';

import { useAppContext } from '../context/context';
import { INavProps } from '../components/nav';
import { INavHierachicalLink, INavPanel } from '../types/strapi/navPanel';
import { IStrapiSingleType } from '../types/strapi';

import './index.css';

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
            }
          }
        }
      }
    }
    allStrapiHomepage {
      edges {
        node {
          seo {
            metaTitle
            metaDescription
          }
          first_screen {
            background {
              localFile {
                url
              }
              id
            }
            text
            id
            pageId
          }
          second_screen {
            background {
              localFile {
                url
              }
              id
            }
            backgroundPoster {
              localFile {
                url
              }
              id
            }
            mobileBackground {
              localFile {
                url
              }
            }
            mobileBackgroundPoster {
              localFile {
                url
              }
            }
            text
            id
            pageId
          }
          third_screen {
            background {
              localFile {
                url
              }
              id
            }
            backgroundPoster {
              localFile {
                url
              }
              id
            }
            mobileBackground {
              localFile {
                url
              }
            }
            mobileBackgroundPoster {
              localFile {
                url
              }
            }
            cards {
              id
              text
              image {
                localFile {
                  url
                }
                id
              }
            }
            id
            text
            pageId
          }
          fourth_screen {
            background {
              localFile {
                url
              }
              id
            }
            backgroundPoster {
              localFile {
                url
              }
              id
            }
            mobileBackground {
              localFile {
                url
              }
            }
            mobileBackgroundPoster {
              localFile {
                url
              }
            }
            text
            id
            pageId
          }
          fifth_screen {
            background {
              localFile {
                url
              }
              id
            }
            mobileBackground {
              localFile {
                url
              }
            }
            text
            id
            pageId
          }
          id
        }
      }
    }
  }
`;

const ANIMATION_DURATION = 1000;
const MAX_MOMENTUM_SCROLL_DURATION = 1750;
const MAX_MOMENTUM_SCROLL_DURATION_MOBILE = 1050;

interface IMainPageScreenData extends IBlock {
    pageId: string
}

interface IIndexPageBlocksProps {
    screens: Array<IMainPageScreenData>,
    activePageId: string,
    isMobile: boolean | null,
    setActivePageId: (id: string) => void,
    links: Array<INavHierachicalLink>
}

const getScreenBlockId = (screen: IMainPageScreenData) => `main-page-screen-${screen.pageId}`;

const IndexPageBlocks = ({ screens, activePageId, isMobile, setActivePageId, links }: IIndexPageBlocksProps) => {
    const cn = useClassnames();
    const { isContactFormVisible, isRespondFormVisible, isNavVisible } = useAppContext();

    useEffect(() => {
        if(isContactFormVisible || isRespondFormVisible || isNavVisible) {
            const bodyElement = document.querySelector('body') as HTMLBodyElement;

            bodyElement.style.overflow = 'hidden';
            bodyElement.style.position = 'fixed';

            return () => {
                bodyElement.style.overflow = 'unset';
                bodyElement.style.position = 'unset';
            };
        }
    }, [isContactFormVisible, isRespondFormVisible, isNavVisible]);

    const pageNumber: number = screens.findIndex(({ pageId }) => pageId === activePageId);
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollStartTime, setLastScrollStartTime] = useState(Date.now());

    const handleScroll = useCallback((deltaY: number) => {
        const deltaPage = deltaY > 0 ? 1 : -1;
        const nextPageNumber = pageNumber + deltaPage;
        const pagesLength = screens.length;

        const hasNextPage = (nextPageNumber >= 0) && (nextPageNumber < pagesLength);

        const timeFromLastScrollStart = Date.now() - lastScrollStartTime;
        const isNewScroll = timeFromLastScrollStart > (isMobile ? MAX_MOMENTUM_SCROLL_DURATION_MOBILE : MAX_MOMENTUM_SCROLL_DURATION);

        if(!isScrolling && hasNextPage && isNewScroll) {
            setLastScrollStartTime(Date.now());
            setIsScrolling(true);
            setActivePageId(screens[nextPageNumber]?.pageId || '');
            setTimeout(() => {
                setIsScrolling(false);
            }, ANIMATION_DURATION);
        }
    }, [pageNumber, isScrolling, lastScrollStartTime]);

    useEffect(() => {
        if(isContactFormVisible || isRespondFormVisible || isNavVisible) {
            return;
        }
        const onWheel = (e: WheelEvent) => {
            handleScroll(e.deltaY);
        };

        window.addEventListener('wheel', onWheel);

        let prevY = 0;

        const onTouchMove = (e: TouchEvent) => {
            const currY = e.touches[0].pageY;
            const deltaY = prevY - currY;

            handleScroll(deltaY);
        };

        const onTouchStart = (e: TouchEvent) => {
            prevY = e.touches[0].pageY;

            window.addEventListener('touchmove', onTouchMove);
        };

        const onTouchEnd = () => {
            window.removeEventListener('touchmove', onTouchMove);
        };

        window.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchend', onTouchEnd);

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [handleScroll, isRespondFormVisible, isContactFormVisible, isNavVisible]);

    const pageIdLinks = useMemo(() => {
        const res: {[navId: string]: string} = {};

        links.forEach((link) => {
            if(link.to) {
                res[link.navId] = link.to;
            }
            link.sublinks?.forEach((sublink) => {
                res[sublink.navId] = sublink.to;
            });
        });

        return res;
    }, [links]);

    return (
        <div className={cn('main-page-blocks')}>
            {screens.map((screen, index) => {
                const link = (screen.pageId && pageIdLinks[screen.pageId]) || '/';

                return (
                    <Link to={link} key={`page-screen-${index}`}>
                        <MainPageBlock block={screen} index={index} blockId={getScreenBlockId(screen)} pageNumber={pageNumber} />
                    </Link>
                );
            })}
        </div>
    );
};

interface IQueryData {
    allStrapiNavPanel: IStrapiSingleType<Pick<INavPanel, 'hierarchicalLinks'>>,
    allStrapiHomepage: any
}

const IndexPage = () => {
    const data = useStaticQuery<IQueryData>(query);
    const screens = data.allStrapiHomepage.edges[0].node;
    const { hierarchicalLinks: links } = data.allStrapiNavPanel.edges[0].node;
    const { mainPageActivePageId, setMainPageActivePageId } = useAppContext();
    const { isMobile } = useDeviceDetect();
    const cn = useClassnames();

    const activePageId = mainPageActivePageId || '';
    const setActivePageId = (pageId: INavProps['currentPageId']) => {
        setMainPageActivePageId?.(pageId);
    };

    const allScreens = [
        screens.second_screen[0],
        screens.third_screen[0],
        screens.first_screen[0],
        screens.fourth_screen[0],
        screens.fifth_screen[0]
    ];

    useEffect(() => {
        if(window.history.state?.toTop || mainPageActivePageId === null) {
            setActivePageId(allScreens[0].pageId);
        }
    }, []);


    return (
        <div className={cn('main__page', `main__page_${activePageId}`)}>
            <Layout seo={screens.seo}>
                <IndexPageBlocks
                    screens={allScreens}
                    isMobile={isMobile}
                    activePageId={activePageId}
                    setActivePageId={setActivePageId}
                    links={links}
                />
            </Layout>
        </div>
    );
};

export default IndexPage;
