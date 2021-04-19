import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

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
    allStrapiBlock {
      edges {
        node {
          id
          text
          background {
            publicURL
          }
          link {
            text
            to
          }
          cards {
            text
            image {
              publicURL
            }
          }
          position
        }
      }
    }
  }
`;

const IndexPage = () => {
    const data = useStaticQuery(query);
    const blocks = data.allStrapiBlock.edges.sort((a, b) => (
        a.node.position - b.node.position
    ));

    return (
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'light', logoColor: 'white' }}>
            {blocks.map(({ node }, i: number) => (
                <MainPageBlock key={i} data={node} />
            ))}
        </Layout>
    );
};

export default IndexPage;
