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
    allStrapiSelfDrivingCar {
      edges {
        node {
          id
          double_block {
            header
            id
            text
            bottomBackground {
              publicURL
            }
            topBackground {
              publicURL
            }
          }
          story_cards {
            header
            id
            text
            image {
              publicURL
            }
          }
          slider_items {
            header
            id
            text
            background {
              publicURL
            }
          }
        }
      }
    }
  }
`;

const SelfDrivingCar = () => {
    const data = useStaticQuery(query);
    console.log(data)
    return (
        <Layout seo={data.strapiHomepage.seo} theme={{mode: 'dark', logoColor: '#040A0A'}}>
            <h1>SelfDrivingCar</h1>
            <p>SelfDrivingCar</p>
        </Layout>
    );
};

export default SelfDrivingCar;
