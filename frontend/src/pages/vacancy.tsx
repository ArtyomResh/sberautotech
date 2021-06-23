import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

export const query = graphql`
  query VacancyPage($id: Int) {
    allStrapiVacancyPage {
      edges {
        node {
          seo {
            metaTitle
            metaDescription
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
        }
        jobType {
          text
          value
          duration
        }
        publicationDate
        strapiId
        tags {
          text
          value
        }
        title
        whatToDo
        whatWaitingFor
    }
  }
`

const VacancyPage = ({ data }: any) => {
    return (
        <Layout seo={data.allStrapiVacancyPage.edges[0].node.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
            <h1>{data.strapiVacancies.title}</h1>
            <p>ID вакансии: {data.strapiVacancies.id}</p>
        </Layout>
    )
}

export default VacancyPage

