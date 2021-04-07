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

const SelfDrivingCar = () => {
    const data = useStaticQuery(query);

    return (
        <Layout seo={data.strapiHomepage.seo}>
            <h1>SelfDrivingCar</h1>
            <p>SelfDrivingCar</p>
        </Layout>
    );
};

export default SelfDrivingCar;
