import React, { useEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { debounce } from 'lodash';

import { useClassnames } from '../hooks/use-classnames';

import Layout from '../components/layout';
import FlipLogoIcon from '../images/flip-logo.svg';
import FlipSelfDrivingLevelIcon from '../images/flip-self-driving-level.svg';
import SberCloudLogoIcon from '../images/sbercloud-logo.svg';

import style from './flip.css';
import Footer from '../components/footer';
import useFormattedText from '../hooks/use-formatted-text';

const query = graphql`
  query {
    strapiGlobal {
      defaultSeo {
        metaDescription
        metaTitle
      }
    }
    allStrapiFlip {
      edges {
        node {
          first_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundPoster {
              localFile {
                publicURL
              }
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            primary_header
            primary_text
            primary_text_float
            secondary_header
            secondary_text
            secondary_text_float
          }
          eighth_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundPoster {
              localFile {
                publicURL
              }
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            primary_header
            primary_text
            primary_text_float
            secondary_header
            secondary_text
            secondary_text_float
          }
          fifth_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundPoster {
              localFile {
                publicURL
              }
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            primary_header
            primary_text
            primary_text_float
            secondary_header
            secondary_text
            secondary_text_float
          }
          footer {
            description
            disclaimer
            email
            header
            link {
              style
              text
              to
            }
            privacyPolicyLink
            publicOfferLink
          }
          fourth_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundPoster {
              localFile {
                publicURL
              }
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            primary_header
            primary_text
            primary_text_float
            secondary_header
            secondary_text
            secondary_text_float
          }
          second_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundPoster {
              localFile {
                publicURL
              }
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            primary_header
            primary_text
            primary_text_float
            secondary_header
            secondary_text
            secondary_text_float
          }
          seventh_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundPoster {
              localFile {
                publicURL
              }
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            primary_header
            primary_text
            primary_text_float
            secondary_header
            secondary_text
            secondary_text_float
          }
          sixth_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundPoster {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            primary_header
            primary_text
            primary_text_float
            secondary_header
            secondary_text
            secondary_text_float
          }
          third_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundPoster {
              localFile {
                publicURL
              }
            }
            mobileBackground {
              localFile {
                publicURL
              }
            }
            mobileBackgroundPoster {
              localFile {
                publicURL
              }
            }
            primary_header
            primary_text
            primary_text_float
            secondary_header
            secondary_text
            secondary_text_float
          }
        }
      }
    }
  }
`;

const DEBOUNCE_TIMER = 50;

const FlipPage = () => {
    const cn = useClassnames(style);
    const data = useStaticQuery(query);
    const { first_screen, second_screen, third_screen, fourth_screen, fifth_screen, sixth_screen, seventh_screen, eighth_screen, footer } = data.allStrapiFlip.edges[0].node;

    const registerVideo = (boundSelector: string, videoSelector: string) => {
        const bound = document.querySelector(boundSelector);
        const video = document.querySelector(videoSelector);
        const primaryTextBlock = bound?.querySelector('.flip__text-wrapper_primary');
        const primaryText = primaryTextBlock?.querySelector('.flip__screen-text');
        const secondaryTextBlock = bound?.querySelector('.flip__text-wrapper_secondary');

        const scrollVideo = debounce(() => {
            if(video.duration) {
                const boundClientRectTop = bound?.getBoundingClientRect().top || 0;
                const boundScrollHeight = bound?.scrollHeight || 0;
                const distanceFromTop = window.scrollY + boundClientRectTop;
                const rawPercentScrolled = (window.scrollY - distanceFromTop) / (boundScrollHeight - window.innerHeight);
                const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);

                if(primaryTextBlock && secondaryTextBlock) {
                    if(percentScrolled >= 0.5) {
                        primaryTextBlock.style.top = '66px';
                        primaryTextBlock.style.bottom = 'unset';
                        secondaryTextBlock.style.display = 'flex';

                        if(primaryText) {
                            primaryText.style.display = 'none';
                        }
                    } else {
                        primaryTextBlock.style.top = 'unset';
                        primaryTextBlock.style.bottom = '0px';
                        secondaryTextBlock.style.display = 'none';

                        if(primaryText) {
                            primaryText.style.display = 'block';
                        }
                    }
                }

                if(percentScrolled) {
                    video.currentTime = video.duration * percentScrolled;
                }
            }
            requestAnimationFrame(scrollVideo);
        }, DEBOUNCE_TIMER);

        requestAnimationFrame(scrollVideo);
    };

    useEffect(() => {
        window.scrollTo({
            top     : 0,
            behavior: 'smooth'
        });

        registerVideo('#bound-one', '#bound-one video');
        registerVideo('#bound-two', '#bound-two video');
        registerVideo('#bound-three', '#bound-three video');
        registerVideo('#bound-four', '#bound-four video');
        registerVideo('#bound-five', '#bound-five video');
        registerVideo('#bound-six', '#bound-six video');
        registerVideo('#bound-seven', '#bound-seven video');
        registerVideo('#bound-eight', '#bound-eight video');
    }, []);

    // Primary Headers
    const firstScreenHeader = useFormattedText(first_screen.primary_header);
    const secondScreenHeader = useFormattedText(second_screen.primary_header);
    const thirdScreenHeader = useFormattedText(third_screen.primary_header);
    const fourthScreenHeader = useFormattedText(fourth_screen.primary_header);
    const fifthScreenHeader = useFormattedText(fifth_screen.primary_header);
    const sixthScreenHeader = useFormattedText(sixth_screen.primary_header);
    const seventhScreenHeader = useFormattedText(seventh_screen.primary_header);
    const eighthScreenHeader = useFormattedText(eighth_screen.primary_header);

    // Secondary Headers
    const firstScreenSecondaryHeader = useFormattedText(first_screen.secondary_header);
    const seventhScreenSecondaryHeader = useFormattedText(seventh_screen.secondary_header);

    // Primary Texts
    const fourthScreenText = useFormattedText(fourth_screen.primary_text);
    const fifthScreenText = useFormattedText(fifth_screen.primary_text);
    const sixthScreenText = useFormattedText(sixth_screen.primary_text);

    // Secondary Texts
    const firstScreenSecondaryText = useFormattedText(first_screen.secondary_text);
    const thirdScreenSecondaryText = useFormattedText(third_screen.secondary_text);
    const fourthScreenSecondaryText = useFormattedText(fourth_screen.secondary_text);
    const fifthScreenSecondaryText = useFormattedText(fifth_screen.secondary_text);
    const sixthScreenSecondaryText = useFormattedText(sixth_screen.secondary_text);

    return (
        <div className="flip__page">
            <Layout seo={data.strapiGlobal.defaultSeo} theme={{ mode: 'dark', whiteLogoImportant: true }} pageNumber={1}>
                <div className={cn('flip__wrapper')}>
                    <div className={cn('flip__screen-wrapper')}>
                        <div id="bound-one" className="scroll-bound">
                            <div className="content">
                                <video
                                    src={first_screen.background.localFile.publicURL}
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
                                    preload="true"
                                />
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: firstScreenHeader }} />
                                </div>
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_secondary')} dangerouslySetInnerHTML={{ __html: firstScreenSecondaryHeader }} />
                                    <span
                                        className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${first_screen.secondary_text_float}`)}
                                        dangerouslySetInnerHTML={{ __html: firstScreenSecondaryText }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="bound-two" className="scroll-bound">
                            <div className="content">
                                <video
                                    src={second_screen.background.localFile.publicURL}
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
                                    preload="true"
                                />
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: secondScreenHeader }} />
                                </div>
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>

                                    <span className={cn('flip__screen-header', 'flip__screen-header_secondary')} />
                                    <span className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${second_screen.secondary_text_float}`)}>
                                        <img src={FlipSelfDrivingLevelIcon} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div id="bound-three" className="scroll-bound">
                            <div className="content">
                                <video
                                    src={third_screen.background.localFile.publicURL}
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
                                    preload="true"
                                />
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: thirdScreenHeader }} />

                                </div>
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                    <span
                                        className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${third_screen.secondary_text_float}`)}
                                        dangerouslySetInnerHTML={{ __html: thirdScreenSecondaryText }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="bound-four" className="scroll-bound">
                            <div className="content">
                                <video
                                    src={fourth_screen.background.localFile.publicURL}
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
                                    preload="true"
                                />
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: fourthScreenHeader }} />
                                    <span
                                        className={cn('flip__screen-text', 'flip__screen-text_primary', `flip__screen-text_${fourth_screen.primary_text_float}`)}
                                        dangerouslySetInnerHTML={{ __html: fourthScreenText }}
                                    />
                                </div>
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_secondary')} />
                                    <span
                                        className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${fourth_screen.secondary_text_float}`)}
                                        dangerouslySetInnerHTML={{ __html: fourthScreenSecondaryText }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="bound-five" className="scroll-bound">
                            <div className="content">
                                <video
                                    src={fifth_screen.background.localFile.publicURL}
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
                                    preload="true"
                                />
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: fifthScreenHeader }} />
                                    <span
                                        className={cn('flip__screen-text', 'flip__screen-text_primary', `flip__screen-text_${fifth_screen.primary_text_float}`)}
                                        dangerouslySetInnerHTML={{ __html: fifthScreenText }}
                                    />
                                </div>
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                    <span
                                        className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${fifth_screen.secondary_text_float}`)}
                                        dangerouslySetInnerHTML={{ __html: fifthScreenSecondaryText }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="bound-six" className="scroll-bound">
                            <div className="content">
                                <video
                                    src={sixth_screen.background.localFile.publicURL}
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
                                    preload="true"
                                />
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: sixthScreenHeader }} />
                                    <span
                                        className={cn('flip__screen-text', 'flip__screen-text_primary', `flip__screen-text_${sixth_screen.primary_text_float}`)}
                                        dangerouslySetInnerHTML={{ __html: sixthScreenText }}
                                    />
                                </div>
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                    <span
                                        className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${sixth_screen.secondary_text_float}`)}
                                        dangerouslySetInnerHTML={{ __html: sixthScreenSecondaryText }}
                                    />
                                    <span> <img src={SberCloudLogoIcon} /></span>
                                </div>
                            </div>
                        </div>
                        <div id="bound-seven" className="scroll-bound">
                            <div className="content">
                                <video
                                    src={seventh_screen.background.localFile.publicURL}
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
                                    preload="true"
                                />
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: seventhScreenHeader }} />
                                </div>
                                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_secondary')} dangerouslySetInnerHTML={{ __html: seventhScreenSecondaryHeader }} />
                                </div>
                            </div>
                        </div>
                        <div id="bound-eight" className="scroll-bound">
                            <div className="content">
                                <video
                                    src={eighth_screen.background.localFile.publicURL}
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
                                    preload="true"
                                />
                                <div className={cn('flip__text-wrapper')}>
                                    <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: eighthScreenHeader }} />
                                </div>
                            </div>
                        </div>


                        <img className={cn('flip__logo')} src={FlipLogoIcon} />
                    </div>
                    <Footer data={footer} />
                </div>
            </Layout>
        </div>
    );
};

export default FlipPage;
