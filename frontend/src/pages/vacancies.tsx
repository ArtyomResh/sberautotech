import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import VacanciesList from '../components/vacancies-list';

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
            header
            header_position
            slider_items {
                localFile {
                    publicURL
                }
            }
          }
        }
      }
    }
    allStrapiVacancies {
      edges {
        node {
          id
          title
          conditions
          city {
            text
          }
          about
          jobType {
            text
          }
          customDescription
          publicationDate
        }
      }
    }
  }
`;

const Vacancies = () => {
    const data = useStaticQuery(query);
    const { top_slider } = data.allStrapiCareer.edges[0].node;
    const vacanciesList = data.allStrapiVacancies.edges.map((edge) => edge.node);

    return (
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
            <div className="career__carousel">
                <Carousel data={top_slider} />
            </div>
            <VacanciesList data={vacanciesList} />
            <Footer />
        </Layout>
    );
};

export default Vacancies;
