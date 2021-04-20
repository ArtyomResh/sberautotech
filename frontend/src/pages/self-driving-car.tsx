import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import MainBlock from '../components/self-driving-cars-main'
import Swiper from '../components/self-driving-cars-swiper'
import Carousel from '../components/self-driving-cars-carousel'

import 'swiper/swiper-bundle.css';

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
            textBottom
            bottomVideo {
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
    const {double_block, story_cards, slider_items } = data.allStrapiSelfDrivingCar.edges[0].node;



    // return (
    //     <Layout seo={data.strapiHomepage.seo} theme={{mode: 'dark', logoColor: '#040A0A'}}>
    //         <MainBlock data={double_block}/>
    //         <Swiper data={story_cards} />
    //     </Layout>
    // );
    return (
        <>
            <MainBlock data={double_block}/>
            <Swiper data={story_cards} />
            <Carousel data={slider_items} />
        </>
    );
};

export default SelfDrivingCar;
