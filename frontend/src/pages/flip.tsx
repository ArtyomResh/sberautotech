import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';

import Layout from '../components/layout';
import FlipLogoIcon from '../images/flip-logo.svg';

import style from './flip.css';
import Footer from '../components/footer';
// import Carousel from '../components/self-driving-cars-carousel';
// import ListAccordeon from '../components/list-accordeon';
// import useFormattedText from '../hooks/use-formatted-text';

const query = graphql`
  query {
    strapiGlobal {
      defaultSeo {
        metaDescription
        metaTitle
      }
    }
    allStrapiFlip {
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
        }
      }
    }
  }
`;


const FlipPage = () => {
    const cn = useClassnames(style);
    const data = useStaticQuery(query);
    const { footer } = data.allStrapiFlip.edges[0].node;

    // const header = useFormattedText(headerText);

    return (
        <Layout seo={data.strapiGlobal.defaultSeo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={1}>
            <div className={cn('flip__wrapper')}>
                FLIP!!!
                <img src={FlipLogoIcon} />
                <Footer data={footer} />
            </div>
        </Layout>
    );
};

export default FlipPage;
