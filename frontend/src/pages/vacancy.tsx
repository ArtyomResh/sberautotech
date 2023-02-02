import React from 'react';
import { graphql } from 'gatsby';

import Vacancy, { IProps as IVacancyProps } from '../components/vacancy';

export const query = graphql`
  query VacancyPage($id: Int) {
    allStrapiVacancyPage {
      edges {
        node {
          seo {
            metaTitle
            metaDescription
            shareImage {
                localFile {
                    url
                }
              }
          }
          pageId,
          headerBottom
          textBottom
          count
          countText
          video {
            localFile {
              url
            }
          }
        }
      }
    }
    strapiVacancies(strapiId: {eq: $id}) {
        about
        area {
          text
          value
        }
        city {
          countryText
          countryValue
          text
          value
        }
        conditions
        customDescription
        direction {
          header
          id
        }
        jobType {
          text
          value
          duration
        }
        strapiId
        tags {
          text
          value
          id
        }
        title
        whatToDo
        whatWaitingFor
        customDescriptionHeader
        conditionsHeader
        plussesHeader
        plusses
        whatToDoHeader
        whatWaitingForHeader
        huntflowId
    }
  }
`;

const VacancyPage: React.FC<IVacancyProps> = ({ data }) => {
    return <Vacancy data={data} />;
};

export default VacancyPage;
