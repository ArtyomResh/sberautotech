import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';
import { toUnescapedHTML } from '../utils';

import Layout from '../components/layout';
import style from './privacy-policy.css';

const query = graphql`
  query {
    strapiGlobal {
      defaultSeo {
        metaDescription
        metaTitle
      }
    }
    allStrapiPrivacyPolicy {
      edges {
        node {
          privacyPolicyText
        }
      }
    }
  }
`;

const PrivacyPolicy = () => {
    const cn = useClassnames(style);
    const data = useStaticQuery(query);

    return (
        <Layout seo={data.strapiGlobal.defaultSeo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageId="privacy_policy">
            <div className={cn('privacy-policy__wrapper')}>
                {toUnescapedHTML(data.allStrapiPrivacyPolicy.edges[0].node.privacyPolicyText)}
            </div>
        </Layout>
    );
};

export default PrivacyPolicy;
