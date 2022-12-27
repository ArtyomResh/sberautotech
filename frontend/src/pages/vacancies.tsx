import { graphql, PageProps, useStaticQuery } from 'gatsby';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import Layout from '../components/layout';
import VacanciesList from '../components/vacancies-list';
import TagsList from '../components/tags-list';
import DirectionsList from '../components/directions-list';
import Button from '../components/button';

import { useClassnames } from '../hooks/use-classnames';
import { pluralize } from '../utils';

import SearchIcon from '../images/search.svg';
import CrossIcon from '../images/cross.svg';

import { IStrapiCollection, IStrapiSingleType, TStrapiEntity } from '../types/strapi';
import { IDirection, IVacancy } from '../types/strapi/vacancies';
import { IVacanciesPage } from '../types/strapi/vacanciesPage';

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
          pageId
        }
      }
    }
    allStrapiVacancies(filter: {isSecret: {nin: true}}) {
      edges {
        node {
          id
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


type TVacancy = Pick<TStrapiEntity<IVacancy>,
'id' |
'area' |
'city' |
'jobType' |
'tags' |
'title' |
'direction' |
'strapiId' >;


type TDirection = Pick<TStrapiEntity<IDirection>,
'header' |
'strapiId'
>;

type TVacanciesPage = Pick<TStrapiEntity<IVacanciesPage>,
'seo' |
'pageId'
>;

interface IVacanciesPageData {
    allStrapiVacancies: IStrapiCollection<TVacancy>,
    allStrapiDirections: IStrapiCollection<TDirection>,
    allStrapiVacanciesPage: IStrapiSingleType<TVacanciesPage>
}

const Vacancies: React.FC<PageProps> = ({ location }) => {
    const cn = useClassnames(style);
    const data = useStaticQuery<IVacanciesPageData>(query);
    const params = new URLSearchParams(location.search);
    const directionParam = params.get('direction');
    const tagsParam = params.get('tags')?.split(',').map((item) => Number(item)) || [];

    const $container = useRef<HTMLInputElement>(null);

    const [searchString, setSearchString] = useState('');

    const vacanciesList = data.allStrapiVacancies.edges.map((edge) => edge.node);
    const directions = data.allStrapiDirections.edges.map((direction) => direction.node);
    const { pageId, seo } = data.allStrapiVacanciesPage.edges[0].node;

    const [activeDirection, setActiveDirection] = useState<number | null>(Number(directionParam));
    const [activeTags, setActiveTags] = useState<Array<number>>(tagsParam);
    const [filteredVacancies, setFilteredVacancies] = useState(vacanciesList);
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);


    const filteredTags = useMemo(() => {
        return filteredVacancies.reduce<IVacancy['tags']>((acc, item) => {
            item.tags.forEach((tag) => {
                if(!acc.find((tagInAcc) => tagInAcc.id === tag.id) && (activeDirection || activeTags.length)) {
                    acc.push(tag);
                }
            });

            return acc;
        }, []);
    }, [filteredVacancies]);


    const onClickDirection = useCallback((e) => {
        const selectedDirectionId = Number(e.target.getAttribute('data-id'));

        if(!selectedDirectionId) {
            setActiveDirection(null);

            return;
        }

        if(activeDirection !== selectedDirectionId) {
            setActiveDirection(selectedDirectionId);

            return;
        }

        setActiveDirection(null);
    }, [activeDirection]);

    const onClickTag = useCallback((e) => {
        const selectedTagId = Number(e.target.getAttribute('data-id'));

        if(!activeTags.includes(selectedTagId)) {
            setActiveTags([...activeTags, selectedTagId]);

            return;
        }

        setActiveTags(activeTags.filter((item) => item !== selectedTagId));
    }, [activeTags]);

    useEffect(() => {
        const newFilteredVacancies = vacanciesList.filter((vacancy) => {
            if(activeDirection && activeDirection !== vacancy.direction?.id) {
                return false;
            }

            if(searchString.length && !vacancy.title.toLowerCase().includes(searchString.toLowerCase().trim())) {
                return false;
            }

            if(activeTags.length) {
                return vacancy.tags.filter(({ id }) => activeTags.includes(id)).length === activeTags.length;
            }

            return true;
        });

        setFilteredVacancies(newFilteredVacancies);
    }, [searchString, activeDirection, activeTags]);

    const filtersCount = useMemo(() => (activeDirection ? 1 : 0) + activeTags?.length || 0, [activeDirection, activeTags]);

    return (
        <div className={cn('vacancies__page')}>
            <Layout
                seo={{
                    ...seo,
                    shareImage: undefined
                }} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageId={pageId}
            >
                <div className={cn('vacancies-page__wrapper')}>
                    {
                        !isMobileFilterVisible ? (
                            <React.Fragment>
                                <DirectionsList directions={directions} count={filteredVacancies.length} activeDirection={activeDirection} onClickDirection={onClickDirection} />
                                <div className={cn('vacancies__wrapper')}>
                                    <div className={cn('vacancies__search-wrapper')}>
                                        <input
                                            ref={$container}
                                            className={cn('vacancies__search')}
                                            value={searchString}
                                            type="text"
                                            disabled={!filteredVacancies.length && !searchString}
                                            placeholder={isMobile ? 'Вакансии' : 'Поиск'}
                                            onChange={(e) => setSearchString(e.target.value)}
                                        />
                                        {(searchString) ? (
                                            <img className={cn('vacancies__search-icon')} src={CrossIcon} onClick={() => setSearchString('')} />
                                        ) : (
                                            <img className={cn('vacancies__search-icon')} src={SearchIcon} onClick={() => $container.current?.focus()} />
                                        )}
                                    </div>
                                    <div className={cn('vacancies__tags-wrapper')}>
                                        <TagsList tags={filteredTags} activeTags={activeTags} onClickTag={onClickTag} />
                                    </div>
                                    <VacanciesList searchString={searchString} data={filteredVacancies} activeTags={activeTags} onClickTag={onClickTag} />
                                </div>
                                <div className={cn('vacancies__filter-buttons')}>
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className={cn('vacancies__button', 'vacancies__filter-button', {
                                            'vacancies__button_visible': !isMobileFilterVisible
                                        })}
                                        label="Фильтровать"
                                        isBlock={true}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            setIsMobileFilterVisible(!isMobileFilterVisible);
                                        }}
                                    >
                                        Фильтровать
                                        {filtersCount ? (
                                            <span className={cn('vacancies__button-count')}>
                                                {filtersCount}
                                            </span>
                                        ) : null}
                                    </Button>
                                </div>
                            </React.Fragment>
                        ) : (
                            <div className={cn('vacancies__filter-wrapper', {
                                'vacancies__filter-wrapper_visible': isMobileFilterVisible
                            })}
                            >
                                <p className={cn('vacancies__filter-header')}>Фильтр</p>
                                <DirectionsList directions={directions} count={filteredVacancies.length} activeDirection={activeDirection} onClickDirection={onClickDirection} />
                                {filteredTags?.length ? (
                                    <React.Fragment>
                                        <p className={cn('vacancies__filter-header')}>Теги</p>
                                        <TagsList tags={filteredTags} activeTags={activeTags} onClickTag={onClickTag} />
                                    </React.Fragment>
                                ) : null}
                                <div className={cn('vacancies__filter-buttons')}>
                                    <Button
                                        type="button"
                                        className={cn('vacancies__button', {
                                            'vacancies__button_visible': isMobileFilterVisible
                                        })}
                                        disabled={!filteredVacancies.length}
                                        isBlock={true}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            setIsMobileFilterVisible(!isMobileFilterVisible);
                                        }}
                                    >
                                        {!filteredVacancies.length ? 'Нет вакансий' : `Смотреть ${filteredVacancies.length} ${pluralize(filteredVacancies.length, 'вакансию', 'вакансии', 'вакансий')}`}
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className={cn('vacancies__button', 'vacancies__reset-button', {
                                            'vacancies__button_visible': isMobileFilterVisible
                                        })}
                                        isBlock={true}
                                        onClick={() => {
                                            window.scrollTo(0, 0);

                                            if(filtersCount === 0) {
                                                setIsMobileFilterVisible(!isMobileFilterVisible);

                                                return;
                                            }
                                            setActiveDirection(null);
                                            setActiveTags([]);
                                        }}
                                    >
                                        {filtersCount ? 'Сбросить' : 'Закрыть'}

                                        {filtersCount ? (
                                            <span className={cn('vacancies__button-count')}>
                                                {filtersCount}
                                            </span>
                                        ) : null}
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Layout>
        </div>
    );
};

export default Vacancies;
