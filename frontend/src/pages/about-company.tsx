import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';

import Layout from '../components/layout';

import style from './about-company.css';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import ListAccordeon from '../components/list-accordeon';
import useFormattedText from '../hooks/use-formatted-text';
import { toUnescapedHTML } from '../utils';

const query = graphql`
  query {
    strapiAboutCompany {
      seo {
        metaTitle
        metaDescription
      }
    }
    allStrapiAboutCompany {
      edges {
        node {
          headerBackground {
            localFile {
              url
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
                  url
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
                    url
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
    const { headerBackground, headerText, list, slider } = data.allStrapiAboutCompany.edges[0].node;

    const header = useFormattedText(headerText);

    return (
        <div className={cn('about-company__page')}>
            <Layout seo={data.strapiAboutCompany.seo} theme={{ mode: 'dark', logoColor: '#040A0A', whiteLogoImportant: true }} pageNumber={3}>
                <div className={cn('about-company__wrapper')}>
                    {header && (
                        <div className={cn('about-company__header-wrapper')}>
                            <img className={cn('about-company__header-image')} src={headerBackground.localFile.url} />
                            <p className={cn('about-company__header-text')}>{toUnescapedHTML(header)}</p>
                        </div>
                    )}
                    <ListAccordeon data={list} className={cn('about-company__list')} />
                    <Carousel data={slider} />
                    <Footer />
                </div>
            </Layout>
        </div>

    );
};

export default AboutCompanyPage;
