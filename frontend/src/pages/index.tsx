import React, { useState, useEffect, useCallback } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import throttle from 'lodash/throttle';

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

const IndexPage = () => {
    const cn = useClassnames(style);

    const [pageNumber, setPageNumber] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const data = useStaticQuery(query);
    const screens = data.allStrapiHomepage.edges[0].node;

    const handleScroll = useCallback(throttle((e) => {
        const deltaPage = e.deltaY > 0 ? 1 : -1;
        const nextPageNumber = pageNumber + deltaPage;
        const hasNextPage = (nextPageNumber >= 0) && (nextPageNumber < PAGES_LENGTH);

        if(!isScrolling && hasNextPage) {
            setIsScrolling(true);
            setPageNumber(nextPageNumber);
            setTimeout(() => {
                setIsScrolling(false);
            }, ANIMATION_DURATION);
        }
    }, ANIMATION_DURATION), [pageNumber, isScrolling]);

    useEffect(() => {
        window.addEventListener('mousewheel', handleScroll);

        return () => {
            window.removeEventListener('mousewheel', handleScroll);
        };
    }, [handleScroll]);

    return (
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'light', logoColor: '#040A0A' }} pageNumber={pageNumber}>
            <div className={cn('main-page-blocks')}>
                <MainPageBlock block={screens.first_screen[0]} index={0} pageNumber={pageNumber} />
                <MainPageBlock block={screens.second_screen[0]} index={1} pageNumber={pageNumber} />
                <MainPageBlock block={screens.third_screen[0]} index={2} pageNumber={pageNumber} />
            </div>
        </Layout>
    );
};

export default IndexPage;
