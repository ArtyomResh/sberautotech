import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';

import Layout from '../components/layout';

import style from './about-company.css';
import Footer from '../components/footer';
import Carousel from '../components/self-driving-cars-carousel';
import ListAccordeon from '../components/list-accordeon';

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
            <div className={cn('about-company__wrapper')}>
                <div className={cn('about-company__header-wrapper')}>
                    <img className={cn('about-company__header-image')} src={headerBackground.localFile.publicURL} />
                    <p className={cn('about-company__header-text')}>{headerText}</p>
                </div>
                <ListAccordeon data={list} className={cn('about-company__list')} />
                <Carousel data={slider_items} />
                <Footer data={footer} />
            </div>
        </Layout>
    );
};

export default AboutCompanyPage;
