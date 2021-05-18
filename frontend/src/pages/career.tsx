import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Carousel from '../components/self-driving-cars-carousel';
import ListAccordeon from '../components/list-accordeon';
import AdvantagesList from '../components/advantages-list';
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
          top_slider {
            background {
              localFile {
                publicURL
              }
            }
            header
            headerLink
            text
          }
          top_list {
            header
            list_items {
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
            background {
              localFile {
                publicURL
              }
            }
            header
            headerLink
            text
          }
          bottom_list {
            header
            list_items {
              header
            }
          }
          footer {
            description
            disclaimer
            header
            link {
              style
              text
              to
            }
            privacyPolicyLink
            publicOfferLink
            email
          }
        }
      }
    }
  }
`;

const Career = () => {
    const data = useStaticQuery(query);
    const { top_slider, top_list, bottom_slider, bottom_list, footer } = data.allStrapiCareer.edges[0].node;

    return (
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={2}>
            <div className="career__carousel">
                <Carousel data={top_slider} />
            </div>
            <ListAccordeon data={top_list} />
            <Carousel data={bottom_slider} />
            <AdvantagesList data={bottom_list} />
            <Footer data={footer} />
        </Layout>
    );
};

export default Career;
