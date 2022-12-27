import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { debounce } from 'lodash';
import { isMobile, isSafari } from 'react-device-detect';

import { useClassnames } from '../hooks/use-classnames';

import Layout from '../components/layout';
import Footer from '../components/footer';
import Loader from '../components/loader/loaderComponent';
import FlipScreen from '../components/flip-screen';

import FlipLogoIcon from '../images/flip-logo.svg';
import SberCloudLogoIcon from '../images/sbercloud-logo.svg';

import style from './flip.css';

const query = graphql`
  query {
    allStrapiFlip {
      edges {
        node {
          seo {
            metaTitle
            metaDescription
          }
          pageId
          first_screen {
            background {
              localFile {
                url
              }
            }
            backgroundOgg {
              localFile {
                url
              }
            }
            mobileBackground {
              localFile {
                url
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
                url
              }
            }
            backgroundOgg {
              localFile {
                url
              }
            }
            mobileBackground {
              localFile {
                url
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
                url
              }
            }
            backgroundOgg {
              localFile {
                url
              }
            }
            mobileBackground {
              localFile {
                url
              }
            }
            primary_header
            primary_text
            primary_text_float
            secondary_header
            secondary_text
            secondary_text_float
          }
          fourth_screen {
            background {
              localFile {
                url
              }
            }
            backgroundOgg {
              localFile {
                url
              }
            }
            mobileBackground {
              localFile {
                url
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
                url
              }
            }
            backgroundOgg {
              localFile {
                url
              }
            }
            mobileBackground {
              localFile {
                url
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
                url
              }
            }
            backgroundOgg {
              localFile {
                url
              }
            }
            mobileBackground {
              localFile {
                url
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
                url
              }
            }
            backgroundOgg {
              localFile {
                url
              }
            }
            mobileBackground {
              localFile {
                url
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
                url
              }
            }
            backgroundOgg {
              localFile {
                url
              }
            }
            mobileBackground {
              localFile {
                url
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
    const videoSource = useMemo(() => (isMobile ? 'mobileBackground' : isSafari ? 'background' : 'backgroundOgg'), []);

    const {
        seo,
        pageId,
        first_screen,
        third_screen,
        fourth_screen,
        fifth_screen,
        sixth_screen,
        seventh_screen,
        eighth_screen
    } = data.allStrapiFlip.edges[0].node;

    const registerVideo = useCallback((boundSelector: string, videoBlob: string) => {
        const bound = document.querySelector(boundSelector);
        const video = document.querySelector(`${boundSelector} video`) as HTMLVideoElement;

        video?.setAttribute('src', videoBlob);

        if(isMobile) {
            return;
        }

        const primaryTextBlock = bound?.querySelector('.flip__text-wrapper_primary') as HTMLElement;
        const primaryText = primaryTextBlock?.querySelector('.flip__screen-text') as HTMLElement;
        const secondaryTextBlock = bound?.querySelector('.flip__text-wrapper_secondary') as HTMLElement;

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
                        secondaryTextBlock.style.opacity = '1';

                        if(primaryText) {
                            primaryText.style.opacity = '0';
                        }
                    } else {
                        primaryTextBlock.style.transform = 'translateY(0px)';
                        secondaryTextBlock.style.opacity = '0';

                        if(primaryText) {
                            primaryText.style.opacity = '1';
                        }
                    }
                }

                video.currentTime = video.duration * percentScrolled;
            }
            requestAnimationFrame(scrollVideo);
        }, DEBOUNCE_TIMER);

        requestAnimationFrame(scrollVideo);
    }, []);

    useEffect(() => {
        if(isMobile !== null) {
            const preloadVideos = [
                fetch(first_screen[videoSource].localFile.url).then((response) => response.blob()),
                fetch(third_screen[videoSource].localFile.url).then((response) => response.blob()),
                fetch(fourth_screen[videoSource].localFile.url).then((response) => response.blob()),
                fetch(fifth_screen[videoSource].localFile.url).then((response) => response.blob()),
                fetch(sixth_screen[videoSource].localFile.url).then((response) => response.blob()),
                fetch(seventh_screen[videoSource].localFile.url).then((response) => response.blob()),
                fetch(eighth_screen[videoSource].localFile.url).then((response) => response.blob())
            ];

            Promise.all(preloadVideos).then((data) => {
                setIsLoading(false);
                data.map((screen, i) => registerVideo(`#bound-${i + 1}`, URL.createObjectURL(screen)));
            }).catch((e) => console.log(e));
        }
    }, [isMobile]);

    return (
        <div className="flip__page">
            <Layout
                seo={seo}
                theme={{ mode: 'dark', logoColor: 'white', whiteLogoImportant: true }}
                pageId={pageId}
            >
                {isLoading ? (
                    <div className={cn('loader__wrapper')}><Loader stopColor="#BDFFF8" /></div>
                ) : (
                    <div className={cn('flip__wrapper', { 'flip__wrapper_mobile': isMobile })}>
                        <FlipScreen isMobile={isMobile} data={first_screen} id="bound-1" />
                        <FlipScreen isMobile={isMobile} data={third_screen} id="bound-2" />
                        <FlipScreen isMobile={isMobile} data={fourth_screen} id="bound-3" />
                        <FlipScreen isMobile={isMobile} data={fifth_screen} id="bound-4" />
                        <FlipScreen isMobile={isMobile} data={sixth_screen} id="bound-5" icon={SberCloudLogoIcon} />
                        <FlipScreen isMobile={isMobile} data={seventh_screen} id="bound-6" />
                        <FlipScreen isMobile={isMobile} data={eighth_screen} id="bound-7" />
                        <img className={cn('flip__logo')} src={FlipLogoIcon} />
                        <Footer className={cn('flip__footer')} />
                    </div>
                )}
            </Layout>
        </div>
    );
};

export default FlipPage;
