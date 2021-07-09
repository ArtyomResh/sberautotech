import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const query = graphql`
  query {
    strapiGlobal {
      favicon {
        localFile {
          url
        }
      }
    }
  }
`;

const SEO = ({ seo = {} }) => {
    const { strapiGlobal } = useStaticQuery(query);
    const { siteName, favicon } = strapiGlobal;

    const getMetaTags = () => {
        const tags = [];

        if (seo.metaTitle) {
            tags.push(
                {
                    property: 'og:title',
                    content: seo.metaTitle
                },
                {
                    name: 'twitter:title',
                    content: seo.metaTitle
                }
            );
        }

        if (seo.metaDescription) {
            tags.push(
                {
                    name: 'description',
                    content: seo.metaDescription
                },
                {
                    property: 'og:description',
                    content: seo.metaDescription
                },
                {
                    name: 'twitter:description',
                    content: seo.metaDescription
                }
            );
        }

        if (seo.shareImage) {
            const imageUrl = (process.env.GATSBY_ROOT_URL || 'http://localhost:8000');

            tags.push(
                {
                    name: 'image',
                    content: imageUrl
                },
                {
                    property: 'og:image',
                    content: imageUrl
                },
                {
                    name: 'twitter:image',
                    content: imageUrl
                }
            );
        }

        if (seo.article) {
            tags.push({
                property: 'og:type',
                content: 'article'
            });
        }
        tags.push({ name: 'twitter:card', content: 'summary_large_image' });

        return tags;
    };

    const metaTags = getMetaTags();

    return (
        <Helmet
            title={seo.metaTitle}
            titleTemplate={`%s`}
            meta={metaTags}
            link={[
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: favicon.url
                }
            ]}
        />
    );
};

export default SEO;

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    article: PropTypes.bool
};

SEO.defaultProps = {
    title: null,
    description: null,
    image: null,
    article: false
};
