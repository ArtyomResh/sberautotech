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

const createVacancyPages = (vacancyEdges) => {
    return !vacancyEdges ? [] : vacancyEdges.map(({ node }) => {
        if(node.isSecret) {
            return {
                path: `/vacancies/special/${node.strapiId}`,
                component: path.resolve('src/pages/vacancy.tsx'),
                context: {
                    id: node.strapiId
                }
            };
        }

        return {
            path: `/vacancies/${node.strapiId}`,
            component: path.resolve('src/pages/vacancy.tsx'),
            context: {
                id: node.strapiId
            }
        };
    });
};

let vacancyPageIsHidden = false;
let vacanciesPageIsHidden = false;
let careerPageIsHidden = false;

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    const data = await makeRequest(graphql, `
      {
        allStrapiCareer {
            edges {
                node {
                    isHidden
                }
            }
        }
        allStrapiVacancyPage {
            edges {
                node {
                    isHidden
                }
            }
        }
        allStrapiVacanciesPage {
            edges {
                node {
                    isHidden
                }
            }
        }
        allStrapiVacancies {
          edges {
            node {
              strapiId
              isSecret
            }
          }
        }
      }
      `);

    vacancyPageIsHidden = data.data?.allStrapiVacancyPage?.edges[0].node.isHidden;
    vacanciesPageIsHidden = data.data?.allStrapiVacanciesPage?.edges[0].node.isHidden;
    careerPageIsHidden = data.data?.allStrapiCareer?.edges[0].node.isHidden;

    if(!vacancyPageIsHidden) {
        // Create pages for each article.
        const vacancyPages = createVacancyPages(data.data?.allStrapiVacancies?.edges);

        vacancyPages.forEach((page) => createPage(page));
    }
};

exports.onCreatePage = async (args) => {
    const { actions, page } = args;
    const { deletePage } = actions;

    if(page.path === '/vacancy/' && vacancyPageIsHidden) {
        deletePage(page);
    }

    if(page.path === '/vacancies/' && vacanciesPageIsHidden) {
        deletePage(page);
    }

    if(page.path === '/career/' && careerPageIsHidden) {
        deletePage(page);
    }

    const hideTechnology = process.env.NODE_ENV !== 'development' && process.env.IS_DEV_STAGE !== 'true';

    if(page.path === '/technology/' && hideTechnology) {
        deletePage(page);
    }
};
