import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import VacanciesList from '../components/vacancies-list';

const query = graphql`
  query {
    allStrapiVacanciesPage {
      edges {
        node {
          seo {
            metaTitle
            metaDescription
          }
        }
      }
    }
    allStrapiVacancies {
      edges {
        node {
          area {
            text
            value
          }
          city {
            text
            value
          }
          jobType {
            text
            value
          }
          tags {
            text
            value
          }
          title
          direction {
            header
          }
          strapiId
          publicationDate
        }
      }
    }
  }
`;

const Vacancies = () => {
    const data = useStaticQuery(query);
    const vacanciesList = data.allStrapiVacancies.edges.map((edge) => edge.node);

    return (
        <Layout seo={data.allStrapiVacanciesPage.edges[0].node.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
            <VacanciesList data={vacanciesList} />
        </Layout>
    );
};

export default Vacancies;
