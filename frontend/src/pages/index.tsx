import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useState, useEffect, useCallback } from 'react';


import Layout from '../components/layout';
import MainPageBlock from '../components/main-page-block';
import { INavProps } from '../components/nav';
import { useAppContext } from '../context/context';
import { useClassnames } from '../hooks/use-classnames';
import useDeviceDetect from '../hooks/use-device-detect';
import { IStrapiSingleType } from '../types/strapi';
import { IHomepage, IHomePageScreenBlock } from '../types/strapi/homepage';

import './index.css';

const query = graphql`
  query {
    allStrapiHomepage {
      edges {
        node {
          seo {
            metaTitle
            metaDescription
          }
          screens {
            text
            link
            pageId
            backgroundVideo {
              desktopNormal {
                preview {
                  localFile {
                      url
                  }
                }
                sources {
                  localFile {
                     url
                  }
                }
              }
              mobile {
                preview {
                  localFile {
                      url
                  }
                }
                sources {
                  localFile {
                     url
                  }
                }
              }
            }
            backgroundImage {
              desktopNormal {
                localFile {
                    url
                }
              }
              mobile {
                localFile {
                    url
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ANIMATION_DURATION = 1000;
const MAX_MOMENTUM_SCROLL_DURATION = 1750;
const MAX_MOMENTUM_SCROLL_DURATION_MOBILE = 1050;

interface IIndexPageBlocksProps {
    screens: Array<IHomePageScreenBlock>,
    activePageId: string,
    isMobile: boolean | null,
    setActivePageId: (id: string) => void
}

const IndexPageBlocks = ({ screens, activePageId, isMobile, setActivePageId }: IIndexPageBlocksProps) => {
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

    return (
        <div className={cn('main__screens')}>
            {screens.map((screen, index) => {
                const link = screen.link || '/';

                return (
                    <Link to={link} key={`page-screen-${index}`}>
                        <MainPageBlock block={screen} index={index} pageNumber={pageNumber} />
                    </Link>
                );
            })}
        </div>
    );
};

interface IQueryData {
    allStrapiHomepage: IStrapiSingleType<Pick<IHomepage, 'screens' |'seo'>>
}

const IndexPage = () => {
    const data = useStaticQuery<IQueryData>(query);
    const homepageData = data.allStrapiHomepage.edges[0].node;
    const { mainPageActivePageId, setMainPageActivePageId } = useAppContext();
    const { isMobile } = useDeviceDetect();
    const cn = useClassnames();

    const activePageId = mainPageActivePageId || '';
    const setActivePageId = (pageId: INavProps['currentPageId']) => {
        setMainPageActivePageId?.(pageId);
    };

    const allScreens = homepageData.screens;

    useEffect(() => {
        if(window.history.state?.toTop || mainPageActivePageId === null) {
            setActivePageId(allScreens[0].pageId);
            window.history.replaceState({ toTop: false }, '', window.location.href);
        }
    }, []);


    return (
        <div className={cn('main__page')}>
            <Layout seo={homepageData.seo}>
                <IndexPageBlocks
                    screens={allScreens}
                    isMobile={isMobile}
                    activePageId={activePageId}
                    setActivePageId={setActivePageId}
                />
            </Layout>
        </div>
    );
};

export default IndexPage;
