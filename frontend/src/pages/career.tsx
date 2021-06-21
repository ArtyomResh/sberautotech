import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Carousel from '../components/carousel';
import ListAccordeon from '../components/list-accordeon';
import AdvantagesList from '../components/advantages-list';
import Footer from '../components/footer';

const query = graphql`
  query {
    strapiCareer {
      seo {
        metaTitle
        metaDescription
      }
    }
    allStrapiCareer {
      edges {
        node {
          top_slider {
            header
            header_position
            slider_items {
                localFile {
                    publicURL
                }
            }
          }
          top_list {
            header
            list_items {
              id
              description
              header
              link {
                style
                text
                to
              }
              subDescriptionFirst
              subDescriptionSecond
              target
            }
          }
          bottom_slider {
            header
            header_position
            slider_items {
                localFile {
                    publicURL
                }
            }
          }
          bottom_list {
            header
            list_items {
              header
            }
          }
        }
      }
    }
  }
`;

const Career = () => {
    const data = useStaticQuery(query);
    const { top_slider, top_list, bottom_slider, bottom_list } = data.allStrapiCareer.edges[0].node;

    return (
        <Layout seo={data.strapiCareer.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
            <div className="career__carousel">
                <Carousel data={top_slider} />
            </div>
            <ListAccordeon data={top_list} />
            <Carousel data={bottom_slider} />
            <AdvantagesList data={bottom_list} />
            <Footer />
        </Layout>
    );
};

export default Career;
