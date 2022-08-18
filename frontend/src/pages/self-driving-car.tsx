import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import MainBlock from '../components/self-driving-cars-main';
import Carousel from '../components/carousel';
import Footer from '../components/footer';

import 'swiper/swiper-bundle.css';

const query = graphql`
  query {
    strapiSelfDrivingCar {
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
            background {
              localFile {
                url
              }
            }
            mobileBackground {
              localFile {
                url
              }
            }
          }
          story_cards {
            header
            id
            text
            image {
              localFile {
                url
              }
            }
            subText
            subTextSecond
          }
          slider {
            header
            header_position
            text
            text_position
            slider_items {
                localFile {
                    url
                }
            }
          }
        }
      }
    }
  }
`;

const SelfDrivingCar = () => {
    const data = useStaticQuery(query);
    const { double_block, story_cards, slider } = data.allStrapiSelfDrivingCar.edges[0].node;

    return (
        <Layout seo={data.strapiSelfDrivingCar.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={1}>
            <MainBlock data={double_block} storyCards={story_cards} />
            <Carousel data={slider} />
            <Footer />
        </Layout>
    );
};

export default SelfDrivingCar;
