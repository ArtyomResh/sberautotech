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
  }
`;

const Career = () => {
    const data = useStaticQuery(query);

    return (
        <Layout seo={data.strapiHomepage.seo}>
            <h1>CAREER</h1>
            <p>CAREER</p>
        </Layout>
    );
};

export default Career;
