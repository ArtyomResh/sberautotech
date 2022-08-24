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
    allStrapiDirections {
      edges {
        node {
          description
          header
          id
          subDescriptionFirst
          subDescriptionSecond
          target
          strapiId
          position
        }
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
                    url
                }
            }
          }
          top_list {
            header
            list_items {
              link {
                style
                text
                to
              }
            }
          }
          bottom_slider {
            header
            header_position
            slider_items {
                localFile {
                    url
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

interface IDirection {
    node: {
        strapiId: number;
        target: string;
        header: string;
        description: string;
        subDescriptionFirst: string;
        subDescriptionSecond: string;
        position: number;
    };
}

const Career = () => {
    const data = useStaticQuery(query);
    const { top_slider, top_list, bottom_slider, bottom_list } = data.allStrapiCareer.edges[0].node;

    const directions = data.allStrapiDirections.edges
        .sort(
            (a: IDirection, b: IDirection) => a.node.position - b.node.position
        )
        .map((direction: IDirection, i: number) => ({
            ...top_list.list_items[i],
            ...direction.node,
        }));
  
    return (
        <Layout seo={data.strapiCareer.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
            <div className="career__carousel">
                <Carousel data={top_slider} />
            </div>
            <ListAccordeon data={{ header: top_list.header, list_items: directions }} />
            <Carousel data={bottom_slider} />
            <AdvantagesList data={bottom_list} />
            <Footer />
        </Layout>
    );
};

export default Career;
