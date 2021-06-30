import React, { useCallback, useState, useRef } from 'react';

import { graphql, Link } from 'gatsby';
import { useClassnames } from '../hooks/use-classnames';
import { toUnescapedHTML } from '../utils';

import style from './vacancy.css';

import ThreeHundredIcon from '../images/three-hundred.inline.svg';
import PlayButton from '../images/play-button-vacancy.inline.svg';

import Layout from '../components/layout';
import LeftBlockVacancyPage from '../components/left-block-vacancy-page';

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
          id
        }
        title
        whatToDo
        whatWaitingFor
    }
  }
`;

interface INodes {
  about: string,
  area: IArea,
  city: ICity,
  conditions: string,
  customDescription: string,
  direction: IDirection,
  jobType: IJobType,
  publicationDate: string,
  tags: ITags,
  title: string,
  whatToDo: string,
  whatWaitingFor: string,
  headerBottom: string,
  countText: string,
  textBottom: string,
  video: string,
  videoPoster: string
}

interface IArea {
  text: string
}

interface IDirection {
  header: string
}

interface ICity {
  text: string
}

interface IJobType {
  duration: string,
  text: string
}

interface ITags {
  text: string,
  value: string
}


const VacancyPage = ({ data }: any) => {
  const cn = useClassnames(style);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState<boolean>(false);
  const { about, area, city, conditions, customDescription, direction, jobType, publicationDate, tags, title, whatToDo, whatWaitingFor }: INodes = data.strapiVacancies;
  const { headerBottom, countText, textBottom, video, videoPoster }: INodes = data.allStrapiVacancyPage.edges[0].node;

  const toggleVideo = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
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

  const getDate = useCallback((date) => {
    const parsedDate = new Date(date);
    const monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    return `${parsedDate.getDate()} ${monthList[parsedDate.getMonth()]}`;
  }, []);

  return (
    <Layout seo={data.allStrapiVacancyPage.edges[0].node.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }}>
      <div className={cn('vacancy')}>
        <div className={cn('vacancy__wrapper')}>
          <div className={cn('vacancy__left-block')}>
            <LeftBlockVacancyPage city={city} jobType={jobType} backToPreviousPage={backToPreviousPage} />
          </div>
          <div className={cn('vacancy__right-block')}>
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
              {tags.map((el, i) => <Link to={`/vacancies?tags=${el.id}`}><span key={i} className={cn('vacancy__tag')}>{el.text}</span></Link>)}
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
            <div className={cn('vacancy__text-wrapper')}>
              <h1>Кого мы ищем</h1>
              {toUnescapedHTML(customDescription)}
            </div>
            <div className={cn('vacancy__text-wrapper')}>
              <h1>Обязанности</h1>
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
        <div className={cn('vacancy__video-wrapper')} onClick={toggleVideo}>
          <PlayButton className={cn('vacancy__play-button', { 'vacancy__play-button_hidden': play })} />
          <video
            className={cn('vacancy__video')}
            ref={videoRef}
            src={video.localFile.publicURL}
            poster={videoPoster.localFile.publicURL}
          >
          </video>
        </div>
        <div className={cn('vacancy__bottom-block')}>
          <div className={cn('vacancy__left-side')}>
            <ThreeHundredIcon />
            <p>{countText}</p>
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
      </div>
    </Layout>
  );
};

export default VacancyPage;

