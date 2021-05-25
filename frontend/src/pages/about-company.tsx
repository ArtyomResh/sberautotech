import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';

import Layout from '../components/layout';

import style from './about-company.css';
import Footer from '../components/footer';
import Carousel from '../components/self-driving-cars-carousel';
import ListAccordeon from '../components/list-accordeon';
import useFormattedText from '../hooks/use-formatted-text';

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
          slider {
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
  }
`;


const AboutCompanyPage = () => {
    const cn = useClassnames(style);
    const data = useStaticQuery(query);
    const { headerBackground, headerText, list, slider, footer } = data.allStrapiAboutCompany.edges[0].node;

    const header = useFormattedText(headerText);

    return (
        <Layout seo={data.strapiGlobal.defaultSeo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={0}>
            <div className={cn('about-company__wrapper')}>
                {header && (
                    <div className={cn('about-company__header-wrapper')}>
                        <img className={cn('about-company__header-image')} src={headerBackground.localFile.publicURL} />
                        <p
                            className={cn('about-company__header-text')}
                            dangerouslySetInnerHTML={{ __html: header }}
                        />
                    </div>
                )}
                <ListAccordeon data={list} className={cn('about-company__list')} />
                <Carousel data={slider} />
                <Footer data={footer} />
            </div>
        </Layout>
    );
};

export default AboutCompanyPage;
