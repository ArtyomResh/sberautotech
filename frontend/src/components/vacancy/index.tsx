import React, { useCallback, useState, useRef } from 'react';
import { Link } from 'gatsby';
import ReactMarkdown, { PluginOptions } from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { useClassnames } from '../../hooks/use-classnames';
import { toUnescapedHTML } from '../../utils';
import PlayButton from '../../images/play-button-vacancy.inline.svg';
import { IVacancy, ITag } from '../../types/strapi/vacancies';
import { IStrapiSingleType } from '../../types/strapi';
import { IVacancyPage } from '../../types/strapi/vacancyPage';

import Layout from '../layout';

import VacancySidebar from './components/vacancy-sidebar';
import ButtonWrapper from './components/button-wrapper';

import './index.css';

type TNode = Pick<IVacancyPage,
'pageId'|
'count'|
'countText'|
'headerBottom'|
'seo'|
'textBottom'|
'video'
>;

interface IData {
    strapiVacancies: IVacancy,
    allStrapiVacancyPage: IStrapiSingleType<TNode>
}

export interface IProps {
    data: IData
}

const Vacancy: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [play, setPlay] = useState<boolean>(false);

    const { about, area, city, conditions, customDescription, direction, jobType, tags, title, whatToDo, whatWaitingFor, customDescriptionHeader, conditionsHeader, plussesHeader, plusses, whatToDoHeader, whatWaitingForHeader, huntflowId } = data.strapiVacancies;
    const { seo, pageId, count, headerBottom, countText, textBottom, video } = data.allStrapiVacancyPage.edges[0].node;

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

    const rehypePlugins = [rehypeRaw] as PluginOptions['rehypePlugins'];

    return (
        <div className={cn('vacancy__page')}>
            <Layout
                seo={{
                    ...seo,
                    shareImage: seo.shareImage.localFile.url,
                    metaTitle : title
                }}
                pageId={pageId}
            >
                <div className={cn('vacancy')}>
                    <div className={cn('vacancy__wrapper')}>

                        <VacancySidebar city={city} jobType={jobType} backToPreviousPage={backToPreviousPage} title={title} huntflowId={huntflowId} />

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

                            <ul className={cn('vacancy__description-list')}>
                                <li>{city.text}</li>
                                <li>{jobType.duration}</li>
                                <li>{jobType.text}</li>
                                <li>Офис</li>
                            </ul>

                            <div className={cn('vacancy__about-wrapper')}>
                                <ReactMarkdown rehypePlugins={rehypePlugins} children={about} />
                            </div>

                            {customDescription ? (
                                <div className={cn('vacancy__text-wrapper')}>
                                    <h1>{customDescriptionHeader}</h1>

                                    <ReactMarkdown rehypePlugins={rehypePlugins} children={customDescription} />
                                </div>) : null}

                            <div className={cn('vacancy__text-wrapper')}>
                                <h1>{whatToDoHeader}</h1>

                                <ReactMarkdown rehypePlugins={rehypePlugins} children={whatToDo} />
                            </div>

                            <div className={cn('vacancy__text-wrapper')}>
                                <h1>{whatWaitingForHeader}</h1>

                                <ReactMarkdown rehypePlugins={rehypePlugins} children={whatWaitingFor} />
                            </div>

                            {plusses ? (
                                <div className={cn('vacancy__text-wrapper')}>
                                    <h1>{plussesHeader}</h1>

                                    <ReactMarkdown rehypePlugins={rehypePlugins} children={plusses} />
                                </div>) : null}

                            <div className={cn('vacancy__text-wrapper')}>
                                <h1>{conditionsHeader}</h1>

                                <ReactMarkdown rehypePlugins={rehypePlugins} children={conditions} />
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
                        />
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

                    <ButtonWrapper
                        className={cn('vacancy__respond-button_mobile')}
                        title={title}
                        huntflowId={huntflowId}
                    >
                        Откликнуться
                    </ButtonWrapper>
                </div>
            </Layout>
        </div>
    );
};

export default Vacancy;
