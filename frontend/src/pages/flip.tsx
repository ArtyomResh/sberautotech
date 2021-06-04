import React, { useEffect, useMemo, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { debounce } from 'lodash';
import { isMobileOnly, isSafari } from 'react-device-detect';

import { useClassnames } from '../hooks/use-classnames';

import Layout from '../components/layout';
import FlipLogoIcon from '../images/flip-logo.svg';
import FlipSelfDrivingLevelIcon from '../images/flip-self-driving-level.svg';
import SberCloudLogoIcon from '../images/sbercloud-logo.svg';

import style from './flip.css';
import Footer from '../components/footer';
import Loader from '../components/loader/loaderComponent';
import useFormattedText from '../hooks/use-formatted-text';

const query = graphql`
  query {
    strapiFlip {
      seo {
        metaTitle
        metaDescription
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
            backgroundOgg {
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
          eighth_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundOgg {
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
          fifth_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundOgg {
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
            backgroundOgg {
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
          second_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundOgg {
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
          seventh_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundOgg {
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
          sixth_screen {
            background {
              localFile {
                publicURL
              }
            }
            backgroundOgg {
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
            backgroundOgg {
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
        }
      }
    }
  }
`;

const DEBOUNCE_TIMER = 50;

const FlipPage = () => {
    const cn = useClassnames(style);
    const data = useStaticQuery(query);
    const [isLoading, setIsLoading] = useState(true);

    console.log(isSafari)
    const {
        first_screen,
        // second_screen,
        third_screen,
        fourth_screen,
        fifth_screen,
        sixth_screen,
        seventh_screen,
        eighth_screen,
        footer
    } = data.allStrapiFlip.edges[0].node;

    const registerVideo = (boundSelector: string, videoSelector: string, videoBlob: string) => {
        const bound = document.querySelector(boundSelector);
        const video = document.querySelector(videoSelector);

        video?.setAttribute('src', videoBlob);

        if(isMobileOnly) {
            return;
        }

        const primaryTextBlock = bound?.querySelector('.flip__text-wrapper_primary');
        const primaryText = primaryTextBlock?.querySelector('.flip__screen-text');
        const secondaryTextBlock = bound?.querySelector('.flip__text-wrapper_secondary');

        const scrollVideo = debounce(() => {
            if(video?.duration) {
                const boundClientRectTop = bound?.getBoundingClientRect().top || 0;
                const boundScrollHeight = bound?.scrollHeight || 0;
                const distanceFromTop = window.scrollY + boundClientRectTop;
                const rawPercentScrolled = (window.scrollY - distanceFromTop) / (boundScrollHeight - window.innerHeight);
                const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);

                if(primaryTextBlock && secondaryTextBlock) {
                    if(percentScrolled >= 0.5) {
                        primaryTextBlock.style.transform = `translateY(-${primaryTextBlock.offsetTop - 60}px)`;
                        secondaryTextBlock.style.opacity = 1;

                        if(primaryText) {
                            primaryText.style.opacity = 0;
                        }
                    } else {
                        primaryTextBlock.style.transform = 'translateY(0px)';
                        secondaryTextBlock.style.opacity = 0;

                        if(primaryText) {
                            primaryText.style.opacity = 1;
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
        if(isMobileOnly !== null) {
            const preloadVideos = [
                fetch(first_screen[isMobileOnly ? 'mobileBackground' : isSafari ? 'background' : 'backgroundOgg'].localFile.publicURL).then((response) => response.blob()),
                // fetch(second_screen[isMobile ? 'mobileBackground' : isSafari ? 'background' : 'backgroundOgg'].localFile.publicURL).then((response) => response.blob()),
                fetch(third_screen[isMobileOnly ? 'mobileBackground' : isSafari ? 'background' : 'backgroundOgg'].localFile.publicURL).then((response) => response.blob()),
                fetch(fourth_screen[isMobileOnly ? 'mobileBackground' : isSafari ? 'background' : 'backgroundOgg'].localFile.publicURL).then((response) => response.blob()),
                fetch(fifth_screen[isMobileOnly ? 'mobileBackground' : isSafari ? 'background' : 'backgroundOgg'].localFile.publicURL).then((response) => response.blob()),
                fetch(sixth_screen[isMobileOnly ? 'mobileBackground' : isSafari ? 'background' : 'backgroundOgg'].localFile.publicURL).then((response) => response.blob()),
                fetch(seventh_screen[isMobileOnly ? 'mobileBackground' : isSafari ? 'background' : 'backgroundOgg'].localFile.publicURL).then((response) => response.blob()),
                fetch(eighth_screen[isMobileOnly ? 'mobileBackground' : isSafari ? 'background' : 'backgroundOgg'].localFile.publicURL).then((response) => response.blob())
            ];

            Promise.all(preloadVideos).then((data) => {
                setIsLoading(false);
                registerVideo('#bound-one', '#bound-one video', URL.createObjectURL(data[0]));
                // registerVideo('#bound-two', '#bound-two video', URL.createObjectURL(data[1]));
                registerVideo('#bound-three', '#bound-three video', URL.createObjectURL(data[1]));
                registerVideo('#bound-four', '#bound-four video', URL.createObjectURL(data[2]));
                registerVideo('#bound-five', '#bound-five video', URL.createObjectURL(data[3]));
                registerVideo('#bound-six', '#bound-six video', URL.createObjectURL(data[4]));
                registerVideo('#bound-seven', '#bound-seven video', URL.createObjectURL(data[5]));
                registerVideo('#bound-eight', '#bound-eight video', URL.createObjectURL(data[6]));
            }).catch((e) => console.log(e));
        }
    }, [isMobileOnly]);


    // Primary Headers
    const firstScreenHeader = useFormattedText(first_screen.primary_header);
    // const secondScreenHeader = useFormattedText(second_screen.primary_header);
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


    if(isLoading) {
        return (
            <div className="flip__page">
                <Layout seo={data.strapiFlip.seo} theme={{ mode: 'dark', logoColor: 'white', whiteLogoImportant: true }} pageNumber={0}>
                    <div className={cn('loader__wrapper')}><Loader stopColor="#BDFFF8" /></div>
                </Layout>
            </div>

        );
    }

    if(isMobileOnly) {
        return (
            <div className="flip__page">
                <Layout seo={data.strapiFlip.seo} theme={{ mode: 'dark', logoColor: 'white', whiteLogoImportant: true }} pageNumber={0}>
                    <div className={cn('flip__wrapper', 'flip__wrapper_mobile')}>
                        <div className={cn('flip__screen-wrapper')} id="bound-one">
                            <img className={cn('flip__logo')} src={FlipLogoIcon} />
                            <video
                                className={cn('flip__screen-background')}
                                muted={true}
                                playsInline={true}
                                autoPlay={true}
                                loop={true}
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
                        {/* <div className={cn('flip__screen-wrapper')} id="bound-two">
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: secondScreenHeader }} />
                            </div>
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>

                                <span className={cn('flip__screen-header', 'flip__screen-header_secondary')} />
                                <span className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${second_screen.secondary_text_float}`)}>
                                    <img src={FlipSelfDrivingLevelIcon} />
                                </span>
                            </div>
                            <video
                                className={cn('flip__screen-background')}
                                muted={true}
                                playsInline={true}
                                autoPlay={true}
                                loop={true}
                            />
                        </div> */}
                        <div className={cn('flip__screen-wrapper')} id="bound-three">
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: thirdScreenHeader }} />

                            </div>
                            <video
                                className={cn('flip__screen-background')}
                                muted={true}
                                playsInline={true}
                                autoPlay={true}
                                loop={true}
                            />
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                <span
                                    className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${third_screen.secondary_text_float}`)}
                                    dangerouslySetInnerHTML={{ __html: thirdScreenSecondaryText }}
                                />
                            </div>
                        </div>
                        <div className={cn('flip__screen-wrapper')} id="bound-four">
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: fourthScreenHeader }} />
                            </div>
                            <video
                                className={cn('flip__screen-background')}
                                muted={true}
                                playsInline={true}
                                autoPlay={true}
                                loop={true}
                            />
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                <span
                                    className={cn('flip__screen-text', 'flip__screen-text_primary', `flip__screen-text_${fourth_screen.primary_text_float}`)}
                                    dangerouslySetInnerHTML={{ __html: fourthScreenText }}
                                />
                                <span
                                    className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${fourth_screen.secondary_text_float}`)}
                                    dangerouslySetInnerHTML={{ __html: fourthScreenSecondaryText }}
                                />
                            </div>
                        </div>
                        <div className={cn('flip__screen-wrapper')} id="bound-five">
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: fifthScreenHeader }} />
                            </div>

                            <video
                                className={cn('flip__screen-background')}
                                muted={true}
                                playsInline={true}
                                autoPlay={true}
                                loop={true}
                            />
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                <span
                                    className={cn('flip__screen-text', 'flip__screen-text_primary', `flip__screen-text_${fifth_screen.primary_text_float}`)}
                                    dangerouslySetInnerHTML={{ __html: fifthScreenText }}
                                />
                                <span
                                    className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${fifth_screen.secondary_text_float}`)}
                                    dangerouslySetInnerHTML={{ __html: fifthScreenSecondaryText }}
                                />
                            </div>
                        </div>
                        <div className={cn('flip__screen-wrapper')} id="bound-six">
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: sixthScreenHeader }} />
                            </div>
                            <video
                                className={cn('flip__screen-background')}
                                muted={true}
                                playsInline={true}
                                autoPlay={true}
                                loop={true}
                            />
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                <span
                                    className={cn('flip__screen-text', 'flip__screen-text_primary', `flip__screen-text_${sixth_screen.primary_text_float}`)}
                                    dangerouslySetInnerHTML={{ __html: sixthScreenText }}
                                />
                                <span
                                    className={cn('flip__screen-text', 'flip__screen-text_secondary', `flip__screen-text_${sixth_screen.secondary_text_float}`)}
                                    dangerouslySetInnerHTML={{ __html: sixthScreenSecondaryText }}
                                />
                                <span><img className={cn('flip__screen-logo')} src={SberCloudLogoIcon} /></span>
                            </div>
                        </div>
                        <div className={cn('flip__screen-wrapper')} id="bound-seven">
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                                <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: seventhScreenHeader }} />
                            </div>
                            <video
                                className={cn('flip__screen-background')}
                                muted={true}
                                playsInline={true}
                                autoPlay={true}
                                loop={true}
                            />
                            <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                                <span className={cn('flip__screen-header', 'flip__screen-header_secondary')} dangerouslySetInnerHTML={{ __html: seventhScreenSecondaryHeader }} />
                            </div>
                        </div>
                        <div className={cn('flip__screen-wrapper')} id="bound-eight">
                            <div className={cn('flip__text-wrapper')}>
                                <span className={cn('flip__screen-header', 'flip__screen-header_primary')} dangerouslySetInnerHTML={{ __html: eighthScreenHeader }} />
                            </div>
                            <video
                                className={cn('flip__screen-background')}
                                muted={true}
                                playsInline={true}
                                autoPlay={true}
                                loop={true}
                            />
                        </div>
                        <Footer data={footer} />
                    </div>
                </Layout>
            </div>
        );
    }

    return (
        <div className="flip__page">
            <Layout seo={data.strapiFlip.seo} theme={{ mode: 'dark', logoColor: 'white', whiteLogoImportant: true }} pageNumber={0}>
                <div className={cn('flip__wrapper')}>
                    <div className={cn('flip__screen-wrapper')}>
                        <div id="bound-one" className="scroll-bound">
                            <div className="content">
                                <video
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
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
                        {/* <div id="bound-two" className="scroll-bound">
                            <div className="content">
                                <video
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
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
                        </div> */}
                        <div id="bound-three" className="scroll-bound">
                            <div className="content">
                                <video
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
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
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
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
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
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
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
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
                                    <span><img src={SberCloudLogoIcon} /></span>
                                </div>
                            </div>
                        </div>
                        <div id="bound-seven" className="scroll-bound">
                            <div className="content">
                                <video
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
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
                                    className={cn('flip__screen-background')}
                                    muted={true}
                                    playsInline={true}
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
