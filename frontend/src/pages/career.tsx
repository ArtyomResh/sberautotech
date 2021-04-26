import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';

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
          top_list {
            header
            list_items {
              header
            }
          }
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
          footer {
            description
            disclaimer
            header
            firstPhone
            link {
              style
              text
              to
            }
            privacyPolicyLink
            publicOfferLink
            secondPhone
          }
        }
      }
    }
  }
`;

const Career = () => {
    const data = useStaticQuery(query);

    console.log(data);

    return (
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
            <h1>CAREER</h1>
            <p>CAREER</p>
        </Layout>
    );
};

export default Career;
