import React, { useState, useEffect, useCallback, useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';
import useDeviceDetect from '../hooks/use-device-detect';

import Layout from '../components/layout';
import MainPageBlock, { IBlock } from '../components/main-page-block';

import style from './index.css';
import Loader from '../components/loader/loaderComponent';
import { appContext } from '../context/context';
import { INavItem } from '../components/nav';

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
    pageId?: string
}

interface IIndexPageBlocksProps {
    screens: Array<IMainPageScreenData>,
    activePageId: string,
    isMobile: boolean | null,
    setActivePageId: (id: string) => void,
    links: Array<INavItem>,
    navId?: string
}

const getScreenBlockId = (screen: IMainPageScreenData) => `main-page-screen-${screen.pageId}`;

const IndexPageBlocks = ({ screens, activePageId, isMobile, setActivePageId, links }: IIndexPageBlocksProps) => {
    const cn = useClassnames(style);
    const { isContactFormVisible, isRespondFormVisible, isNavVisible } = useContext(appContext);
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollStartTime, setLastScrollStartTime] = useState(Date.now());
    const pageNumber: number = links.findIndex(({ navId }) => navId === activePageId);
    const pagesLength = screens.length;

    const handleScroll = useCallback((deltaY: number) => {
        const deltaPage = deltaY > 0 ? 1 : -1;
        const nextPageNumber = pageNumber + deltaPage;

        const hasNextPage = (nextPageNumber >= 0) && (nextPageNumber < pagesLength);

        const timeFromLastScrollStart = Date.now() - lastScrollStartTime;
        const isNewScroll = timeFromLastScrollStart > (isMobile ? MAX_MOMENTUM_SCROLL_DURATION_MOBILE : MAX_MOMENTUM_SCROLL_DURATION);

        if(!isScrolling && hasNextPage && isNewScroll) {
            setLastScrollStartTime(Date.now());
            setIsScrolling(true);
            setActivePageId(links[nextPageNumber].navId);
            setTimeout(() => {
                setIsScrolling(false);
            }, ANIMATION_DURATION);
        }
    }, [pageNumber, isScrolling, lastScrollStartTime]);

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

    return (
        <div className={cn('main-pa.ge-blocks')}>
            {screens.map((screen, index) => {
                const link = links.find((link) => link.navId === screen.pageId)?.to || '/';

                return (
                    <Link to={link} key={`page-screen-${index}`}>
                        <MainPageBlock block={screen} index={index} blockId={getScreenBlockId(screen)} pageNumber={pageNumber} />
                    </Link>
                );
            })}
        </div>
    );
};

const IndexPage = () => {
    const data = useStaticQuery(query);
    const screens = data.allStrapiHomepage.edges[0].node;
    const { links } = data.allStrapiNavPanel.edges[0].node as {links: Array<INavItem>};
    const [activePageId, setActivePageId] = useState(links[0].navId);
    const [isLoading, setIsLoading] = useState(true);
    const { isMobile } = useDeviceDetect();
    const cn = useClassnames(style);


    useEffect(() => {
        if(isMobile !== null) {
            const preloadVideos = [
                fetch(screens.second_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.url).then((response) => response.blob()).then((blob) => ({ blob, blockId: getScreenBlockId(screens.second_screen[0]) })),
                fetch(screens.third_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.url).then((response) => response.blob()).then((blob) => ({ blob, blockId: getScreenBlockId(screens.third_screen[0]) })),
                fetch(screens.first_screen[0][isMobile ? 'background' : 'background'].localFile.url).then((response) => response.blob()).then((blob) => ({ blob, blockId: getScreenBlockId(screens.first_screen[0]) })),
                fetch(screens.fourth_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.url).then((response) => response.blob()).then((blob) => ({ blob, blockId: getScreenBlockId(screens.fourth_screen[0]) }))
            ].filter(Boolean);

            Promise.all(preloadVideos).then((data) => {
                setIsLoading(false);
                data.forEach(({ blob, blockId }) => {
                    const bound = document.getElementById(blockId);
                    const video = bound?.querySelector('video');

                    video?.setAttribute('src', URL.createObjectURL(blob));
                });
            }).catch((e) => console.log(e));
        }
    }, [isMobile]);

    const allScreens = [
        screens.second_screen[0],
        screens.third_screen[0],
        screens.first_screen[0],
        screens.fourth_screen[0],
        screens.fifth_screen[0]
    ];

    const sortedScreens = links.map((link, index) => {
        return allScreens.find((screen) => screen.pageId && link.navId === screen.pageId) || allScreens[index];
    });

    return (
        <div className={cn('main__page', `main__page_${activePageId}`)}>
            <Layout seo={screens.seo} theme={{ mode: 'light', logoColor: '#040A0A' }} pageId={activePageId} setActivePageId={setActivePageId}>
                {isLoading ? (
                    <div className={cn('loader__wrapper')}><Loader stopColor="#BDFFF8" /></div>
                ) : (
                    <IndexPageBlocks screens={sortedScreens} isMobile={isMobile} activePageId={activePageId} setActivePageId={setActivePageId} links={links} />
                )}
            </Layout>
        </div>
    );
};

export default IndexPage;
