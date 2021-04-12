import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';

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
              publicURL
            }
            header
            id
            text
          }
        }
      }
    }
  }
`;

const Career = () => {
    const data = useStaticQuery(query);
    console.log(data)
    return (
        <Layout seo={data.strapiHomepage.seo} theme={{mode: 'dark', logoColor: '#040A0A'}}>
            <h1>CAREER</h1>
            <p>CAREER</p>
        </Layout>
    );
};

export default Career;
