import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import VacanciesList from '../components/vacancies-list';

const query = graphql`
  query($city: StringQueryOperatorInput, $jobType: StringQueryOperatorInput) {
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
          footer {
            id
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
    allStrapiVacancies(filter: { city: $city, jobType: $jobType }) {
      edges {
        node {
          id
          title
          division
          conditions
          city
          about
          jobType
          publicationDate
          whatWaitingFor
          whatToDo
        }
      }
    }
  }
`;

const Vacancies = () => {
    const data = useStaticQuery(query);
    const { top_slider, footer } = data.allStrapiCareer.edges[0].node;
    const vacanciesList = data.allStrapiVacancies.edges.map((edge) => edge.node);

    return (
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={2}>
            <div className="career__carousel">
                <Carousel data={top_slider} />
            </div>

            <VacanciesList data={vacanciesList} />

            <Footer data={footer} />
        </Layout>
    );
};

export default Vacancies;
