const path = require('path');

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
        graphql(request).then((result) => {
            if(result.errors) {
                reject(result.errors);
            }

            return result;
        })
    );
});

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    const getVacancies = makeRequest(graphql, `
      {
        allStrapiVacancies {
          edges {
            node {
              strapiId
              isSecret
            }
          }
        }
      }
      `).then((result) => {
    // Create pages for each article.
        result.data?.allStrapiVacancies?.edges?.forEach(({ node }) => {
            if(node.isSecret) {
                createPage({
                    path     : `/vacancies/special/${node.strapiId}`,
                    component: path.resolve('src/pages/vacancy.tsx'),
                    context  : {
                        id: node.strapiId
                    }
                });
            } else {
                createPage({
                    path     : `/vacancies/${node.strapiId}`,
                    component: path.resolve('src/pages/vacancy.tsx'),
                    context  : {
                        id: node.strapiId
                    }
                });
            }
        });
    });

    // Query for articles nodes to use in creating pages.
    return getVacancies;
};