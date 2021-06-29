import { graphql, useStaticQuery } from 'gatsby';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Layout from '../components/layout';
import VacanciesList from '../components/vacancies-list';
import TagsList from '../components/tags-list';
import DirectionsList from '../components/directions-list'

import { useClassnames } from '../hooks/use-classnames';

import SearchIcon from '../images/search.svg';
import CrossIcon from '../images/cross.svg';

import style from './vacancies.css';

const query = graphql`
  query {
    allStrapiVacanciesPage {
      edges {
        node {
          seo {
            metaTitle
            metaDescription
          }
        }
      }
    }
    allStrapiVacancies {
      edges {
        node {
          locale
          area {
            text
            value
            id
          }
          city {
            text
            value
            id
          }
          jobType {
            text
            value
            id
          }
          tags {
            text
            value
            id
          }
          title
          direction {
            header
            id
          }
          strapiId
          publicationDate
        }
      }
    }
    allStrapiTags {
      edges {
        node {
          text
          value
          strapiId
        }
      }
    }
    allStrapiDirections {
      edges {
        node {
          header
          strapiId
        }
      }
    }
  }
`;

const THROTTLE = 2500;

const Vacancies = () => {
  const cn = useClassnames(style);
  const data = useStaticQuery(query);

  const $container = useRef<HTMLInputElement>(null);

  const [searchString, setSearchString] = useState('')

  const vacanciesList = data.allStrapiVacancies.edges.map((edge) => edge.node);
  const tags = data.allStrapiTags.edges.map((tag) => tag.node);
  const directions = data.allStrapiDirections.edges.map((direction) => direction.node);

  const [activeDirections, setActiveDirections] = useState<Array<number>>([])
  const [activeTags, setActiveTags] = useState<Array<number>>([])
  const [filteredVacancies, setFilteredVacancies] = useState<Array<any>>(vacanciesList)

  const onClickDirection = useCallback((e) => {
    const selectedDirectionId = Number(e.target.getAttribute('data-id'));
    if (!selectedDirectionId) {
      setActiveDirections([])
      return;
    }

    if (!activeDirections.includes(selectedDirectionId)) {
      setActiveDirections([...activeDirections, selectedDirectionId])
      return;
    }

    setActiveDirections(activeDirections.filter(item => item !== selectedDirectionId));
  }, [activeDirections])

  const onClickTag = useCallback((e) => {
    const selectedTagId = Number(e.target.getAttribute('data-id'));

    if (!activeTags.includes(selectedTagId)) {
      setActiveTags([...activeTags, selectedTagId])
      return;
    }

    setActiveTags(activeTags.filter(item => item !== selectedTagId));
  }, [activeTags])

  useEffect(() => {
    console.log('HERE', searchString, activeDirections, activeTags, vacanciesList)



    const newFilteredVacancies = vacanciesList.filter((vacancy) => {

      if (activeDirections.length && !activeDirections.includes(vacancy.direction.id)) {
        return false;
      }

      if (searchString.length && !vacancy.title.toLowerCase().includes(searchString.toLowerCase())) {
        return false;
      }

      if (activeTags.length) {
        return vacancy.tags.filter(({ id }) => activeTags.includes(id)).length ? true : false;
      }

      console.log(vacancy)

      return true;
    })

    setFilteredVacancies(newFilteredVacancies);

  }, [searchString, activeDirections, activeTags])

  return (
    <Layout seo={data.allStrapiVacanciesPage.edges[0].node.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
      <div className={cn('vacancies-page__wrapper')}>
        <DirectionsList directions={directions} count={vacanciesList.length} activeDirections={activeDirections} onClickDirection={onClickDirection} />
        <div className={cn('vacancies__wrapper')}>
          <div className={cn('vacancies__search-wrapper')}>
            <input
              ref={$container}
              className={cn('vacancies__search')}
              value={searchString}
              type="text"
              placeholder="Поиск"
              onChange={(e) => setSearchString(e.target.value)}
            />
            {(searchString) ? (
              <img className={cn('vacancies__search-icon')} src={CrossIcon} onClick={() => setSearchString('')} />
            ) : (
                <img className={cn('vacancies__search-icon')} src={SearchIcon} onClick={() => $container.current?.focus()} />
              )
            }
          </div>
          <div className={cn('vacancies__result-wrapper')}>
            {(searchString) ? (
              <p className={cn('vacancies__result')}>
                Найдено {filteredVacancies.length} ваканси{(() => {
                  if (filteredVacancies.length === 0 || filteredVacancies.length > 4) {
                    return 'й'
                  }
                  if (filteredVacancies.length === 1) {
                    return 'я'
                  }
                  if (filteredVacancies.length > 1 && filteredVacancies.length < 5) {
                    return 'и'
                  }
                })()}
              </p>
            ) : null}
          </div>
          <div className={cn('vacancies__tags-wrapper')}>
            <TagsList tags={tags} activeTags={activeTags} onClickTag={onClickTag} />
          </div>
          <VacanciesList data={filteredVacancies} activeTags={activeTags} />
        </div>
      </div>
    </Layout>
  );
};

export default Vacancies;
