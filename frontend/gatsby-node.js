const path = require('path');

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
        graphql(request).then((result) => {
            if (result.errors) {
                reject(result.errors);
            }

            return result;
        })
    );
});

const createVacancyPages = (vacancyEdges) => {
    return !vacancyEdges ? [] : vacancyEdges.map(({ node }) => {
        if (node.isSecret) {
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

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
        type StrapiCareer implements Node {
            isHidden: Boolean
            pageId: String
        }

        type StrapiVacancyPage implements Node {
            isHidden: Boolean
            pageId: String
        }

        type StrapiVacanciesPage implements Node {
            isHidden: Boolean
            pageId: String
        }

        type StrapiAboutCompany implements Node {
            pageId: String
        }

        type StrapiFlip implements Node {
            pageId: String
        }

        type StrapiSelfDrivingCar implements Node {
            pageId: String
        }

        type StrapiRespondForm implements Node {
            errorContactSend: String
            successContactSend: String
            commercialProposalsEmail: String
            commercialProposalsEmailLabel: String
        }

        type StrapiFooter implements Node {
            modalLinkText: String
            copyright: String
            coreBusiness: String
            accreditationText: String
            accreditationIsLink: Boolean
            privacyPolicyIsLink: Boolean
        }

        type StrapiNavPanelHierarchicalLinksSublinksImage {
            localFile: File @link(from: "localFile___NODE")
        }

        type StrapiNavPanelHierarchicalLinksSublinks {
            text: String
            to: String
            navId: String
            image: StrapiNavPanelHierarchicalLinksSublinksImage
        }

        type StrapiNavPanelHierarchicalLinks {
            text: String
            to: String
            navId: String
            sublinks: [StrapiNavPanelHierarchicalLinksSublinks]
        }

        type StrapiNavPanel implements Node {
            hierarchicalLinks: [StrapiNavPanelHierarchicalLinks]
            switchLangUrl: String
        }

        type StrapiHomepageScreensBackgroundVideoVariantPreview {
            localFile: File @link(from: "localFile___NODE")
        }

        type StrapiHomepageScreensBackgroundVideoVariantSources {
            localFile: File @link(from: "localFile___NODE")
        }

        type StrapiHomepageScreensBackgroundVideoVariant {
            preview: StrapiHomepageScreensBackgroundVideoVariantPreview
            sources: [StrapiHomepageScreensBackgroundVideoVariantSources]
        }

        type StrapiHomepageScreensBackgroundVideo {
            desktopNormal: StrapiHomepageScreensBackgroundVideoVariant
            mobile: StrapiHomepageScreensBackgroundVideoVariant
        }

        type StrapiHomepageScreensBackgroundImageVariant {
            localFile: File @link(from: "localFile___NODE")
        }

        type StrapiHomepageScreensBackgroundImage {
            desktopNormal: StrapiHomepageScreensBackgroundImageVariant
            mobile: StrapiHomepageScreensBackgroundImageVariant
        }

        type StrapiHomepageScreens {
            text: String
            link: String
            pageId: String
            backgroundVideo: StrapiHomepageScreensBackgroundVideo
            backgroundImage: StrapiHomepageScreensBackgroundImage
        }

        type StrapiHomepage implements Node {
            screens: [StrapiHomepageScreens]
        }
    `);
};

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

    if (!vacancyPageIsHidden) {
        // Create pages for each article.
        const vacancyPages = createVacancyPages(data.data?.allStrapiVacancies?.edges);

        vacancyPages.forEach((page) => createPage(page));
    }
};

exports.onCreatePage = async (args) => {
    const { actions, page } = args;
    const { deletePage } = actions;

    if (page.path === '/vacancy/' && vacancyPageIsHidden) {
        deletePage(page);
    }

    if (page.path === '/vacancies/' && vacanciesPageIsHidden) {
        deletePage(page);
    }

    if (page.path === '/career/' && careerPageIsHidden) {
        deletePage(page);
    }


    // TODO: открыть страницу в рамках SBER-306
    const hideTechnology = process.env.NODE_ENV !== 'development' && process.env.IS_DEV_STAGE !== 'true';

    if (page.path === '/technology/' && hideTechnology) {
        deletePage(page);
    }

    const hideFleet = process.env.NODE_ENV !== 'development' && process.env.IS_DEV_STAGE !== 'true';

    if(page.path === '/fleet/' && hideFleet) {
        deletePage(page);
    }
};
