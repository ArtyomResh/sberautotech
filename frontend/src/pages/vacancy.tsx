import React from 'react';
import { Link, graphql } from 'gatsby';
import { useClassnames } from '../hooks/use-classnames';

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
                        <div className={cn('vacancy__title-wrapper')}>
                            <span >Москва</span>
                            <span>5-ти дневная рабочая неделя</span>
                            <span>Полная занятость</span>
                            <span>Офис</span>
                            <Button className={cn('vacancy__respond-button')} label="Откликнуться" />
                        </div>
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
                <div className={cn('vacancy__left-block-fake')}></div>
                <div className={cn('vacancy__right-block')}>
                    <div className={cn('vacancy__header')}>
                        <div className={cn('vacancy__date-and-direction')}>
                            <span>1 июня</span>
                            <span>Умный автомобиль и встраиваемые системы</span>
                        </div>
                        <div className={cn('vacancy__title')}>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                        </div>
                        <div className={cn('vacancy__title')}>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>

                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>

                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>
                            <h1>Руководитель направления технической поддержки SberAutoTech</h1>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default VacancyPage;

