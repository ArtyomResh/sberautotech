import React, { useState, useEffect, useCallback } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';

import Layout from '../components/layout';
import MainPageBlock from '../components/main-page-block';

import style from './index.css';

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
            link {
              style
              text
              to
              id
            }
            text
          }
          third_screen {
            background {
              localFile {
                publicURL
              }
              id
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

const PAGES_LENGTH = 3;
const ANIMATION_DURATION = 1000;
const MAX_MOMENTUM_SCROLL_DURATION = 1750;

const IndexPage = () => {
    const cn = useClassnames(style);

    const [pageNumber, setPageNumber] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollStartTime, setLastScrollStartTime] = useState(Date.now());

    const data = useStaticQuery(query);
    const screens = data.allStrapiHomepage.edges[0].node;

    const handleScroll = useCallback((deltaY: number) => {
        const deltaPage = deltaY > 0 ? 1 : -1;
        const nextPageNumber = pageNumber + deltaPage;
        const hasNextPage = (nextPageNumber >= 0) && (nextPageNumber < PAGES_LENGTH);

        const timeFromLastScrollStart = Date.now() - lastScrollStartTime;
        const isNewScroll = timeFromLastScrollStart > MAX_MOMENTUM_SCROLL_DURATION;

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
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'light', logoColor: '#040A0A' }} pageNumber={pageNumber} setPageNumber={setPageNumber} >
            <div className={cn('main-page-blocks')}>
                <MainPageBlock block={screens.first_screen[0]} index={0} pageNumber={pageNumber} />
                <MainPageBlock block={screens.second_screen[0]} index={1} pageNumber={pageNumber} />
                <MainPageBlock block={screens.third_screen[0]} index={2} pageNumber={pageNumber} />
            </div>
        </Layout>
    );
};

export default IndexPage;
