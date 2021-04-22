require('dotenv').config({
    path: '.env'
});

module.exports = {

    plugins: [
        {
            resolve: 'gatsby-plugin-typescript',
            options: {
                isTSX        : true,
                allExtensions: true
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
                contentTypes: ['block', 'story-card', 'double-block', 'slider-item', 'list', 'list-item'],
                singleTypes : ['homepage', 'global', 'self-driving-car', 'career']
            }
        }
    ]
};
