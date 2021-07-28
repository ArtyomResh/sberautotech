import React, { useCallback, useState, useRef } from 'react';

import { graphql, Link } from 'gatsby';
import { useClassnames } from '../hooks/use-classnames';
import { toUnescapedHTML } from '../utils';

import style from './vacancy.css';

import PlayButton from '../images/play-button-vacancy.inline.svg';

import Layout from '../components/layout';
import LeftBlockVacancyPage from '../components/left-block-vacancy-page';
import ButtonWrapper from '../components/button-wrapper';

export const query = graphql`
  query VacancyPage($id: Int) {
    allStrapiVacancyPage {
      edges {
        node {
          seo {
            metaTitle
            metaDescription
          }
          headerBottom
          textBottom
          count
          countText
          video {
            localFile {
              url
            }
          }
          videoPoster {
            localFile {
              url
            }
          }
        }
      }
    }
    strapiVacancies(strapiId: {eq: $id}) {
        about
        area {
          text
          value
        }
        city {
          countryText
          countryValue
          text
          value
        }
        conditions
        customDescription
        direction {
          header
          id
        }
        jobType {
          text
          value
          duration
        }
        publicationDate
        strapiId
        tags {
          text
          value
          id
        }
        title
        whatToDo
        whatWaitingFor
        customDescriptionHeader
        conditionsHeader
        plussesHeader
        plusses
        whatToDoHeader
        whatWaitingForHeader
    }
  }
`;

interface IProps {
    data: IData
}

interface IEdges {
    edges: Array<INodes>
}

interface IData {
    strapiVacancies: IStrapiVacancies,
    allStrapiVacancyPage: IEdges
}

interface ISeo {
    metaTitle: string,
    metaDescription: string
}

export interface IStrapiVacancies {
    about: string,
    area: IArea,
    city: ICity,
    conditions: string,
    customDescription: string,
    direction: IDirection,
    jobType: IJobType,
    publicationDate: string,
    tags: Array<ITag>,
    title: string,
    whatToDo: string,
    whatWaitingFor: string,
    customDescriptionHeader: string,
    conditionsHeader: string,
    plussesHeader: string,
    plusses: string,
    whatToDoHeader: string,
    whatWaitingForHeader: string
}

interface INodes {
    node: INode
}

interface INode {
    count: string,
    countText: string,
    headerBottom: string,
    seo: ISeo,
    textBottom: string,
    video: ILocalFile,
    videoPoster: ILocalFile
}

interface IArea {
    text: string
}

interface IDirection {
    header: string,
    id: number
}

interface ICity {
    text: string
}

interface IJobType {
    duration: string,
    text: string
}
interface ITag {
    text: string,
    value: string,
    id: number
}

interface IUrl {
    url: string
}

interface ILocalFile {
    localFile: IUrl
}

const VacancyPage: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [play, setPlay] = useState<boolean>(false);

    const { about, area, city, conditions, customDescription, direction, jobType, tags, title, whatToDo, whatWaitingFor, customDescriptionHeader, conditionsHeader, plussesHeader, plusses, whatToDoHeader, whatWaitingForHeader } = data.strapiVacancies;
    const { count, headerBottom, countText, textBottom, video, videoPoster } = data.allStrapiVacancyPage.edges[0].node;

    const toggleVideo = useCallback(() => {
        if(videoRef.current) {
            if(videoRef.current.paused) {
                void videoRef.current.play().then(() => setPlay(true));

                return;
            }

            videoRef.current.pause();
            setPlay(false);
        }
    }, []);

    const backToPreviousPage = useCallback(() => {
        window.history.back();
    }, []);

    return (
        <div className={cn('vacancy__page')}>
            <Layout seo={{ ...data.allStrapiVacancyPage.edges[0].node.seo, metaTitle: title }} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
                <div className={cn('vacancy')}>
                    <div className={cn('vacancy__wrapper')}>
                        <div className={cn('vacancy__left-block')}>
                            <LeftBlockVacancyPage city={city} jobType={jobType} backToPreviousPage={backToPreviousPage} title={title} />
                        </div>
                        <div className={cn('vacancy__right-block')}>
                            <div className={cn('vacancy__date-and-direction')}>
                                <Link to={`/vacancies?direction=${direction?.id}`}><span>{direction?.header}</span></Link>
                            </div>
                            <div className={cn('vacancy__title')}>
                                <h1>{title}</h1>
                            </div>
                            <div className={cn('vacancy__area')}>
                                <p>{area?.text}</p>
                            </div>
                            <div className={cn('vacancy__tags-wrapper')}>
                                {tags.map((el: ITag, i: number) => <Link key={i} to={`/vacancies?tags=${el.id}`}><span className={cn('vacancy__tag')}>{el.text}</span></Link>)}
                            </div>
                            <div className={cn('vacancy__left-block-main', 'vacancy__left-block-main_mobile')}>
                                <ul className={cn('vacancy__title-wrapper')}>
                                    <li>{city.text}</li>
                                    <li>{jobType.duration}</li>
                                    <li>{jobType.text}</li>
                                    <li>Офис</li>
                                </ul>
                            </div>
                            <div className={cn('vacancy__about-wrapper')}>
                                {toUnescapedHTML(about)}
                            </div>
                            {customDescription ? (
                                <div className={cn('vacancy__text-wrapper')}>
                                    <h1>{customDescriptionHeader}</h1>
                                    {toUnescapedHTML(customDescription)}
                                </div>) : null}
                            <div className={cn('vacancy__text-wrapper')}>
                                <h1>{whatToDoHeader}</h1>
                                {toUnescapedHTML(whatToDo)}
                            </div>
                            <div className={cn('vacancy__text-wrapper')}>
                                <h1>{whatWaitingForHeader}</h1>
                                {toUnescapedHTML(whatWaitingFor)}
                            </div>
                            {plusses ? (
                                <div className={cn('vacancy__text-wrapper')}>
                                    <h1>{plussesHeader}</h1>
                                    {toUnescapedHTML(plusses)}
                                </div>) : null}
                            <div className={cn('vacancy__text-wrapper')}>
                                <h1>{conditionsHeader}</h1>
                                {toUnescapedHTML(conditions)}
                            </div>
                        </div>
                    </div>
                    <div className={cn('vacancy__video-wrapper')} onClick={toggleVideo}>
                        <PlayButton className={cn('vacancy__play-button', { 'vacancy__play-button_hidden': play })} />
                        <video
                            className={cn('vacancy__video')}
                            ref={videoRef}
                            src={video.localFile.url}
                            loop={true}
                        >
                        </video>
                    </div>
                    <div className={cn('vacancy__bottom-block')}>
                        <div className={cn('vacancy__left-side')}>
                            <span className={cn('vacancy__count')}>{count}</span>
                            <p className={cn('vacancy__count-text')}>{countText}</p>
                        </div>
                        <div className={cn('vacancy__right-side')}>
                            <div className={cn('vacancy__slogan')}>
                                <p>{textBottom}</p>
                            </div>
                            <div className={cn('vacancy__big-slogan')}>
                                <p className={cn('vacancy__external-part')}>
                                    {toUnescapedHTML(headerBottom.replace('{', '<span>').replace('}', '</span>'))}
                                </p>
                            </div>
                        </div>
                    </div>
                    <ButtonWrapper className={cn('vacancy__respond-button_mobile')} label="Откликнуться" title={title} />
                </div>
            </Layout>
        </div>
    );
};

export default VacancyPage;
