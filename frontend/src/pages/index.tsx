import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';

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
          stories {
            text
            image {
              publicURL
            }
          }
        }
      }
    }
  }
`;

const IndexPage = () => {
    const data = useStaticQuery(query);

    return (
        <Layout seo={data.strapiHomepage.seo}>
            {
                data.allStrapiBlock.edges.map(
                    ({ node }, i: number) => (
                        <div key={i}>
                            <img src={node.background.publicURL} />
                            {
                                (node.link) ? (
                                    <Link to={node.link.to}>
                                        <button>{node.link.text}</button>
                                    </Link>
                                ) : null
                            }
                            <span>{node.text}</span>
                            {
                                node.stories.length ? node.stories.map((story) => (
                                    <div key={story.id}>
                                        <img src={story.image.publicURL} />
                                        <span>{story.text}</span>
                                    </div>
                                )) : null
                            }
                        </div>
                    )
                )
            }
        </Layout>
    );
};

export default IndexPage;
