import React, { useCallback, useContext, useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import ReactPageScroller from 'react-page-scroller';

import Layout from '../components/layout';
import MainPageBlock, { IBlock } from '../components/main-page-block';
import { appContext, AppProvider } from '../store';

const query = graphql`
  query {
    strapiHomepage {
      seo {
        metaTitle
        metaDescription
      }
    }
    allStrapiBlock {
      edges {
        node {
          id
          text
          background {
            localFile {
              publicURL
            }
          }
          link {
            text
            to
            style
          }
          cards {
            text
            image {
              localFile {
                publicURL
              }
            }
          }
          position
        }
      }
    }
  }
`;

const IndexPage = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const data = useStaticQuery(query);
    const blocks = data.allStrapiBlock.edges.sort((a, b) => a.node.position - b.node.position);

    const { activeTab, setActiveTab } = useContext(appContext);

    const handlePageChange = useCallback((pageNumber: number) => {
        console.log(setActiveTab, activeTab);

        if(setActiveTab) {
            setActiveTab(pageNumber);
        }
    }, [setActiveTab]);

    console.log('RENDER!');

    return (
        <AppProvider>
            <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'light', logoColor: 'white' }} pageNumber={pageNumber}>
                <ReactPageScroller
                    onBeforePageScroll={handlePageChange}
                >
                    {blocks.map(({ node }: { node: IBlock }, i: number) => (
                        <MainPageBlock key={i} block={node} />
                    ))}
                </ReactPageScroller>
            </Layout>
        </AppProvider>
    );
};

export default IndexPage;
