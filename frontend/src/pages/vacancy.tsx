import React, { useCallback } from 'react';
import { Link, graphql } from 'gatsby';
import { useClassnames } from '../hooks/use-classnames';
import { toUnescapedHTML } from '../utils';

import style from './vacancy.css';

import ArrowLeft from '../images/arrow-left.inline.svg';
import FaceBookIcon from '../images/facebook-icon.inline.svg';
import TwitterIcon from '../images/twitter-icon.inline.svg';
import VKIcon from '../images/vk-icon.inline.svg';
import ShareLinkIcon from '../images/share-link-icon.inline.svg';

import Layout from '../components/layout';
import Button from '../components/button';

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
              publicURL
            }
          }
          videoPoster {
            localFile {
              publicURL
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
        }
        title
        whatToDo
        whatWaitingFor
    }
  }
`;

const VacancyPage = ({ data }: any) => {
    const cn = useClassnames(style);
    const { about, area, city, conditions, customDescription, direction, jobType, publicationDate, tags, title, whatToDo, whatWaitingFor } = data.strapiVacancies;

    console.log(data);

    const getDate = useCallback((date) => {
        const parsedDate = new Date(date);
        const monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        return `${parsedDate.getDate()} ${monthList[parsedDate.getMonth()]}`;
    }, []);

    return (
        <Layout seo={data.allStrapiVacancyPage.edges[0].node.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
            {/* <h1>{data.strapiVacancies.title}</h1>
            <p>ID вакансии: {data.strapiVacancies.id}</p> */}
            <div className={cn('vacancy')}>
                <div className={cn('vacancy__left-block')}>
                    <div className={cn('vacancy__left-block-header')}>
                        <ArrowLeft className={cn('vacancy__left-block-arrow-left')} />
                        <h1>Вакансия</h1>
                    </div>
                    <div className={cn('vacancy__left-block-main')}>
                        <ul className={cn('vacancy__title-wrapper')}>
                            <li>{city.text}</li>
                            <li>{jobType.duration}</li>
                            <li>{jobType.text}</li>
                            <li>Офис</li>
                            <Button className={cn('vacancy__respond-button')} label="Откликнуться" />
                        </ul>
                    </div>
                    <div className={cn('vacancy__left-block-bottom')}>
                        <div className={cn('vacancy__link-wrapper')}>
                            <a href="#"><FaceBookIcon /></a>
                            <a href="#"><TwitterIcon /></a>
                            <a href="#"><VKIcon /></a>
                            <a href="#"><ShareLinkIcon /></a>
                        </div>
                    </div>
                </div>
                <div className={cn('vacancy__right-block')}>
                    <div className={cn('vacancy__header')}>
                        <div className={cn('vacancy__date-and-direction')}>
                            <span>{getDate(publicationDate)}</span>
                            <span>{direction.header}</span>
                        </div>
                        <div className={cn('vacancy__title')}>
                            <h1>{title}</h1>
                        </div>
                        <div className={cn('vacancy__area')}>
                            <p>{area.text}</p>
                        </div>
                        <div className={cn('vacancy__tags-wrapper')}>
                            {tags.map((el, i) => <span key={i} className={cn('vacancy__tag')}>{el.text}</span>)}
                        </div>
                        <div className={cn('vacancy__about-wrapper')}>
                            {toUnescapedHTML(about)}
                        </div>
                        <div className={cn('vacancy__text-wrapper')}>
                            <h1>Кого мы ищем</h1>
                            {toUnescapedHTML(customDescription)}
                        </div>
                        <div className={cn('vacancy__text-wrapper')}>
                            <h1>Обзанности</h1>
                            {toUnescapedHTML(whatToDo)}
                        </div>
                        <div className={cn('vacancy__text-wrapper')}>
                            <h1>Требования</h1>
                            {toUnescapedHTML(whatWaitingFor)}
                        </div>
                        <div className={cn('vacancy__text-wrapper')}>
                            <h1>Условия</h1>
                            {toUnescapedHTML(conditions)}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default VacancyPage;

