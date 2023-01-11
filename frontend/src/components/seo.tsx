import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import picPath from '../../static/pic.png';

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

export interface ISeo {
    metaTitle?: string,
    metaDescription?: string,
    shareImage?: string,
    article?: boolean
}

interface IProps {
    seo?: ISeo
}


const SEO = ({ seo = {} }: IProps) => {
    const { strapiGlobal } = useStaticQuery(query);
    const { favicon } = strapiGlobal;

    const getMetaTags = () => {
        const tags: HelmetProps['meta'] = [];

        if(seo.metaTitle) {
            tags.push(
                {
                    property: 'og:title',
                    content : seo.metaTitle
                },
                {
                    name   : 'twitter:title',
                    content: seo.metaTitle
                }
            );
        }

        if(seo.metaDescription) {
            tags.push(
                {
                    name   : 'description',
                    content: seo.metaDescription
                },
                {
                    property: 'og:description',
                    content : seo.metaDescription
                },
                {
                    name   : 'twitter:description',
                    content: seo.metaDescription
                }
            );
        }

        const shareImage = seo.shareImage || `https://sberautotech.ru${picPath}`;

        tags.push(
            {
                name   : 'image',
                content: shareImage
            },
            {
                property: 'og:image',
                content : shareImage
            },
            {
                property: 'vk:image',
                content : shareImage
            },
            {
                name   : 'twitter:image',
                content: shareImage
            }
        );

        if(seo.article) {
            tags.push({
                property: 'og:type',
                content : 'article'
            });
        }
        tags.push({ name: 'twitter:card', content: 'summary_large_image' });

        return tags;
    };

    const metaTags = getMetaTags();

    return (
        <Helmet
            title={seo.metaTitle}
            titleTemplate="%s"
            meta={metaTags}
            link={[
                {
                    rel  : 'icon',
                    type : 'image/png',
                    sizes: '16x16',
                    href : favicon.url
                }
            ]}
        />
    );
};

export default SEO;

SEO.propTypes = {
    shareImage: PropTypes.string,
    article   : PropTypes.bool
};

SEO.defaultProps = {
    shareImage: null,
    article   : false
};
