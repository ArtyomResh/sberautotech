require('dotenv').config({
    path: '.env'
});

module.exports = {
    siteMetadata: {
        siteUrl: 'https://www.sberautotech.ru'
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-google-gtag',
            options: {
                // You can add multiple tracking ids and a pageview event will be fired for all of them.
                trackingIds: [
                    'G-ENYDG5W28X'
                ],
                // This object is used for configuration specific to this plugin
                pluginConfig: {
                // Puts tracking script in the head instead of the body
                    head      : false,
                    // Setting this parameter is also optional
                    respectDNT: true,
                    // Avoids sending pageview hits from custom paths
                    exclude   : ['/preview/**', '/do-not-track/me/too/']
                }
            }
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name      : 'Sber Automotive Technologies',
                short_name: 'SberAutoTech',
                start_url : '/',
                icon      : 'src/images/favicon.png',
                display   : 'minimal-ui'
            }
        },
        {
            resolve: 'gatsby-plugin-typescript',
            options: {
                isTSX        : true,
                allExtensions: true
            }
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /\.inline\.svg$/
                }
            }
        },
        'gatsby-plugin-postcss',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images`
            }
        },
        {
            resolve: 'gatsby-source-strapi',
            options: {
                queryLimit  : 10000,
                apiURL      : process.env.API_URL || 'http://localhost:1337',
                contentTypes: [],
                singleTypes : ['homepage', 'global', 'self-driving-car', 'career', 'about-company']
            }
        },
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                output: '/'
            }
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host   : 'https://sberautotech.ru',
                sitemap: 'https://sberautotech.ru/sitemap-index.xml',
                env    : {
                    development: {
                        policy: [{ userAgent: '*', disallow: ['/'] }]
                    },
                    production: {
                        policy: [{ userAgent: '*', allow: '/' }]
                    }
                }
            }
        }
    ]
};
