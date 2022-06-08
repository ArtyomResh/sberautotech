import React, { useState, useEffect, useCallback, useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';
import useDeviceDetect from '../hooks/use-device-detect';

import Layout from '../components/layout';
import MainPageBlock from '../components/main-page-block';

import style from './index.css';
import Loader from '../components/loader/loaderComponent';
import { appContext } from '../context/context';

const query = graphql`
  query {
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
          }
          sixth_screen {
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
          }
          id
        }
      }
    }
  }
`;

const PAGES_LENGTH = 5;
const ANIMATION_DURATION = 1000;
const MAX_MOMENTUM_SCROLL_DURATION = 1750;
const MAX_MOMENTUM_SCROLL_DURATION_MOBILE = 1050;

const IndexPageBlocks = ({ screens, pageNumber, isMobile, setPageNumber }) => {
    const cn = useClassnames(style);
    const { isPopupVisible, isRespondFormVisible } = useContext(appContext);
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollStartTime, setLastScrollStartTime] = useState(Date.now());

    const handleScroll = useCallback((deltaY: number) => {
        const deltaPage = deltaY > 0 ? 1 : -1;
        const nextPageNumber = pageNumber + deltaPage;

        const hasNextPage = (nextPageNumber >= 0) && (nextPageNumber < PAGES_LENGTH);

        const timeFromLastScrollStart = Date.now() - lastScrollStartTime;
        const isNewScroll = timeFromLastScrollStart > (isMobile ? MAX_MOMENTUM_SCROLL_DURATION_MOBILE : MAX_MOMENTUM_SCROLL_DURATION);

        if(!isScrolling && hasNextPage && isNewScroll) {
            setLastScrollStartTime(Date.now());
            setIsScrolling(true);
            setPageNumber(nextPageNumber);
            setTimeout(() => {
                setIsScrolling(false);
            }, ANIMATION_DURATION);
        }
    }, [pageNumber, isScrolling, lastScrollStartTime]);

    useEffect(() => {
        const bodyElement = document.querySelector('body') as HTMLBodyElement;

        bodyElement.style.overflow = 'hidden';
        bodyElement.style.position = 'fixed';

        return () => {
            bodyElement.style.overflow = 'unset';
            bodyElement.style.position = 'unset';
        };
    }, []);

    useEffect(() => {
        if(isPopupVisible || isRespondFormVisible) {
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
    }, [handleScroll, isRespondFormVisible, isPopupVisible]);

    return (
        <div className={cn('main-page-blocks')}>
            <Link to="/spb">
                <MainPageBlock block={screens.sixth_screen[0]} index={0} pageNumber={pageNumber} />
            </Link>
            <Link to="/flip">
                <MainPageBlock block={screens.second_screen[0]} index={1} pageNumber={pageNumber} />
            </Link>
            <Link to="/self-driving-car">
                <MainPageBlock block={screens.third_screen[0]} index={2} pageNumber={pageNumber} />
            </Link>
            <Link to="/about-company">
                <MainPageBlock block={screens.first_screen[0]} index={3} pageNumber={pageNumber} />
            </Link>
            <Link to="/career">
                <MainPageBlock block={screens.fourth_screen[0]} index={4} pageNumber={pageNumber} />
            </Link>
            <Link to="/vacancies">
                <MainPageBlock block={screens.fifth_screen[0]} index={5} pageNumber={pageNumber} />
            </Link>
        </div>
    );
};

const IndexPage = () => {
    const cn = useClassnames(style);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { isMobile } = useDeviceDetect();

    const data = useStaticQuery(query);
    const screens = data.allStrapiHomepage.edges[0].node;

    useEffect(() => {
        if(isMobile !== null) {
            const preloadVideos = [
                fetch(screens.sixth_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.url).then((response) => response.blob()),
                fetch(screens.second_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.url).then((response) => response.blob()),
                fetch(screens.third_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.url).then((response) => response.blob()),
                fetch(screens.first_screen[0][isMobile ? 'background' : 'background'].localFile.url).then((response) => response.blob()),
                fetch(screens.fourth_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.url).then((response) => response.blob())
            ];

            Promise.all(preloadVideos).then((data) => {
                setIsLoading(false);

                data.forEach((blob, i) => {
                    const bound = document.getElementById(String(i));
                    const video = bound.querySelector('video');

                    video?.setAttribute('src', URL.createObjectURL(blob));
                });
            }).catch((e) => console.log(e));
        }
    }, [isMobile]);

    return (
        <div className={cn('main__page', `main__page_${pageNumber}`)}>
            <Layout seo={screens.seo} theme={{ mode: 'light', logoColor: '#040A0A' }} pageNumber={pageNumber} setPageNumber={setPageNumber}>
                {isLoading ? (
                    <div className={cn('loader__wrapper')}><Loader stopColor="#BDFFF8" /></div>
                ) : (
                    <IndexPageBlocks screens={screens} pageNumber={pageNumber} isMobile={isMobile} setPageNumber={setPageNumber} />
                )}
            </Layout>
        </div>
    );
};

export default IndexPage;
