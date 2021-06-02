import React, { useState, useEffect, useCallback } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';
import useDeviceDetect from '../hooks/use-device-detect';

import Layout from '../components/layout';
import MainPageBlock from '../components/main-page-block';

import style from './index.css';
import Loader from '../components/loader/loaderComponent';

const query = graphql`
  query {
    strapiHomepage {
      seo {
        metaTitle
        metaDescription
      }
    }
    allStrapiHomepage {
      edges {
        node {
          first_screen {
            background {
              localFile {
                publicURL
              }
              id
            }
            text
            id
          }
          second_screen {
            background {
              localFile {
                publicURL
              }
              id
            }
            backgroundPoster {
              localFile {
                publicURL
              }
              id
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            text
            id
          }
          third_screen {
            background {
              localFile {
                publicURL
              }
              id
            }
            backgroundPoster {
              localFile {
                publicURL
              }
              id
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            cards {
              id
              text
              image {
                localFile {
                  publicURL
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
                publicURL
              }
              id
            }
            backgroundPoster {
              localFile {
                publicURL
              }
              id
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            text
            link {
              style
              text
              to
              id
            }
            id
          }
          id
        }
      }
    }
  }
`;

const PAGES_LENGTH = 4;
const ANIMATION_DURATION = 1000;
const MAX_MOMENTUM_SCROLL_DURATION = 1750;
const MAX_MOMENTUM_SCROLL_DURATION_MOBILE = 1050;

const IndexPage = () => {
    const cn = useClassnames(style);

    const [pageNumber, setPageNumber] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollStartTime, setLastScrollStartTime] = useState(Date.now());
    const [isLoading, setIsLoading] = useState(true);
    const { isMobile } = useDeviceDetect();

    const data = useStaticQuery(query);
    const screens = data.allStrapiHomepage.edges[0].node;

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
        if(isMobile !== null) {
            const preloadVideos = [
                fetch(screens.first_screen[0][isMobile ? 'background' : 'background'].localFile.publicURL).then((response) => response.blob()),
                fetch(screens.second_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.publicURL).then((response) => response.blob()),
                fetch(screens.third_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.publicURL).then((response) => response.blob()),
                fetch(screens.fourth_screen[0][isMobile ? 'mobileBackground' : 'background'].localFile.publicURL).then((response) => response.blob())
            ];

            Promise.all(preloadVideos).then((data) => {
                setIsLoading(false);

                data.forEach((blob, i) => {
                    const bound = document.getElementById(String(i + 1));
                    const video = bound.querySelector('video');

                    video?.setAttribute('src', URL.createObjectURL(blob));
                });
            }).catch((e) => console.log(e));
        }
    }, [isMobile]);

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
    }, [handleScroll]);

    return (
        <div className={cn('main__page', `main__page_${pageNumber}`)}>
            <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'light', logoColor: '#040A0A' }} pageNumber={pageNumber} setPageNumber={setPageNumber}>
                {isLoading ? (
                    <div className={cn('loader__wrapper')}><Loader stopColor="#BDFFF8" /></div>
                ) : (
                    <div className={cn('main-page-blocks')}>
                        <Link to="/flip">
                            <MainPageBlock block={screens.second_screen[0]} index={0} pageNumber={pageNumber} />
                        </Link>
                        <Link to="/self-driving-car">
                            <MainPageBlock block={screens.third_screen[0]} index={1} pageNumber={pageNumber} />
                        </Link>
                        <Link to="/about-company">
                            <MainPageBlock block={screens.first_screen[0]} index={2} pageNumber={pageNumber} />
                        </Link>
                        <Link to="/career">
                            <MainPageBlock block={screens.fourth_screen[0]} index={3} pageNumber={pageNumber} />
                        </Link>
                    </div>
                )}
            </Layout>
        </div>
    );
};

export default IndexPage;
