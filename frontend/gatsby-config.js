require('dotenv').config({
    path: '.env'
});

module.exports = {
    siteMetadata: {
        siteUrl: 'https://www.sberautotech.ru'
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-gdpr-cookies',
            options: {
                googleTagManager: {
                    trackingId: 'G-ENYDG5W28X'
                }
            },
            environments: ['production', 'development']
        },
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
                contentTypes: [
                    {
                        name: `vacancy`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `tag`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `direction`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    }
                ],
                singleTypes : [
                    {
                        name: `homepage`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `global`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `self-driving-car`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `career`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `about-company`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `flip`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `nav-panel`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `footer`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `privacy-policy`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `respond-form`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `vacancies`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `tags`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `directions`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `cities`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `areas`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    },
                    {
                        name: `job-types`,
                        api: { qs: { _locale: process.env.GATSBY_LOCALE_CODE } }
                    }
                ]
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
                policy : [{ userAgent: '*', allow: '/' }]
            }
        },
        {
            resolve: `gatsby-plugin-recaptcha`,
            options: {
               async: false,
               defer: false,
               args: `?onload=onloadCallback&render=explicit`,
            },
         }
    ]
};
