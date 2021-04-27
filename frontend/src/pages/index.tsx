import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ReactPageScroller from 'react-page-scroller';

import Layout from '../components/layout';
import MainPageBlock from '../components/main-page-block';

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

const IndexPage = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const data = useStaticQuery(query);
    const screens = data.allStrapiHomepage.edges[0].node;

    const handlePageChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };

    return (
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'light', logoColor: '#040A0A' }} pageNumber={pageNumber}>
            <ReactPageScroller
                pageOnChange={handlePageChange}
            >
                <MainPageBlock block={screens.first_screen[0]} />
                <MainPageBlock block={screens.second_screen[0]} />
                <MainPageBlock block={screens.third_screen[0]} />
            </ReactPageScroller>
        </Layout>
    );
};

export default IndexPage;
