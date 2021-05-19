import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';

import Layout from '../components/layout';

import style from './index.css';
import Footer from '../components/footer';
import Carousel from '../components/self-driving-cars-carousel';

const query = graphql`
  query {
    strapiGlobal {
      defaultSeo {
        metaDescription
        metaTitle
      }
    }
    allStrapiAboutCompany {
      edges {
        node {
          footer {
            description
            disclaimer
            email
            header
            id
            link {
              id
              style
              text
              to
            }
            privacyPolicyLink
            publicOfferLink
          }
          headerBackground {
            localFile {
              publicURL
            }
          }
          headerText
          id
          list {
            list_items {
              description
              header
              id
              image {
                localFile {
                  publicURL
                }
              }
              target
            }
            id
          }
          slider_items {
            background {
              localFile {
                publicURL
              }
            }
            header
            headerLink
            id
            text
          }
        }
      }
    }
  }
`;


const AboutCompanyPage = () => {
    const cn = useClassnames(style);
    const data = useStaticQuery(query);
    const { headerBackground, headerText, list, slider_items, footer } = data.allStrapiAboutCompany.edges[0].node;

    return (
        <Layout seo={data.strapiGlobal.defaultSeo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={0}>
            <div>
                <img src={headerBackground.localFile.publicURL} />
                <p>{headerText}</p>
            </div>
            <ul>
                {list.list_items.map((item, i: number) => (
                    <li key={i}>
                        {item.target}
                    </li>
                ))}
            </ul>
            <Carousel data={slider_items} />
            <Footer data={footer} />
        </Layout>
    );
};

export default AboutCompanyPage;
