require('dotenv').config({
    path: '.env'
});

module.exports = {
    plugins: [
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
                singleTypes : ['homepage', 'global', 'self-driving-car', 'career']
            }
        }
    ]
};
