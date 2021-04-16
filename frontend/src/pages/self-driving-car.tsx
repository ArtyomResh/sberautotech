import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import MainBlock from '../components/self-driving-cars-main'

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
    const {double_block, id, slider_items, story_cards } = data.allStrapiSelfDrivingCar.edges[0].node;

    

    // return (
    //     <Layout seo={data.strapiHomepage.seo} theme={{mode: 'dark', logoColor: '#040A0A'}}>
    //         <MainBlock data={double_block}/>
    //     </Layout>
    // );
    
    return <MainBlock data={double_block}/>
};

export default SelfDrivingCar;
