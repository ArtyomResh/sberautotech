import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Footer from '../components/footer';

const query = graphql`
  query {
    strapiHomepage {
      seo {
        metaTitle
        metaDescription
      }
    }
    allStrapiCareer {
      edges {
        node {
          id
          slider_items {
            background {
              localFile {
                publicURL
              }
            }
            header
            id
            text
          }
        }
      }
    }
    allStrapiList(filter: {id: {eq: "List_1"}}) {
      edges {
        node {
          list_items {
            description
            header
            link {
              style
              text
              to
            }
            id
            subDescriptionFirst
            subDescriptionSecond
            target
          }
          header
          id
        }
      }
    }
  }
`;

const Career = () => {
    const data = useStaticQuery(query);

    return (
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }}>
            <h1>CAREER</h1>
            <p>CAREER</p>
            <Footer />
        </Layout>
    );
};

export default Career;
