import { graphql, useStaticQuery } from 'gatsby';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import Layout from '../components/layout';
import VacanciesList from '../components/vacancies-list';
import TagsList from '../components/tags-list';
import DirectionsList from '../components/directions-list';
import Button from '../components/button';

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
    allStrapiVacancies(filter: {isSecret: {nin: true}}) {
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

const Vacancies = ({ location }) => {
    const cn = useClassnames(style);
    const data = useStaticQuery(query);
    const params = new URLSearchParams(location.search);
    const directionParam = params.get('direction');
    const tagsParam = params.get('tags')?.split(',').map((item) => Number(item)) || [];

    const $container = useRef<HTMLInputElement>(null);

    const [searchString, setSearchString] = useState('');

    const vacanciesList = data.allStrapiVacancies.edges.map((edge) => edge.node);
    const directions = data.allStrapiDirections.edges.map((direction) => direction.node);

    const [activeDirection, setActiveDirection] = useState<number | null>(Number(directionParam));
    const [activeTags, setActiveTags] = useState<Array<number>>(tagsParam);
    const [filteredVacancies, setFilteredVacancies] = useState<Array<any>>(vacanciesList);
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);

    const filteredTags = useMemo(() => {
        return filteredVacancies.reduce((acc, item) => {
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
            <Layout seo={data.allStrapiVacanciesPage.edges[0].node.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={4}>
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
                                        styleType="primary"
                                        type="button"
                                        className={cn('vacancies__button', 'vacancies__filter-button', {
                                            'vacancies__filter-button_hidden': isMobileFilterVisible
                                        })}
                                        label="Фильтровать"
                                        count={(activeDirection ? 1 : 0) + activeTags?.length || 0}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            setIsMobileFilterVisible(!isMobileFilterVisible);
                                        }}
                                    />
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
                                        styleType="primary"
                                        type="button"
                                        className={cn('vacancies__button', 'vacancies__show-button', {
                                            'vacancies__show-button_visible': isMobileFilterVisible
                                        })}
                                        disabled={!filteredVacancies.length}
                                        label={!filteredVacancies.length ? 'Нет вакансий' : `Смотреть ${filteredVacancies.length} ваканси${(() => {
                                            const stringLength = filteredVacancies.length.toString();
                                            const lastNumber = Number(stringLength[stringLength.length - 1]);

                                            if(lastNumber === 0 || lastNumber > 4) {
                                                return 'й';
                                            }

                                            if(lastNumber === 1) {
                                                return 'ю';
                                            }

                                            if(lastNumber > 1 && lastNumber < 5) {
                                                return 'и';
                                            }
                                        })()
                                        }`}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            setIsMobileFilterVisible(!isMobileFilterVisible);
                                        }}
                                    />
                                    <Button
                                        styleType="primary"
                                        type="button"
                                        className={cn('vacancies__button', 'vacancies__reset-button', {
                                            'vacancies__reset-button_visible': isMobileFilterVisible
                                        })}
                                        label={filtersCount ? 'Сбросить' : 'Закрыть'}
                                        count={filtersCount}
                                        onClick={() => {
                                            window.scrollTo(0, 0);

                                            if(filtersCount === 0) {
                                                setIsMobileFilterVisible(!isMobileFilterVisible);

                                                return;
                                            }
                                            setActiveDirection(null);
                                            setActiveTags([]);
                                        }}
                                    />
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
