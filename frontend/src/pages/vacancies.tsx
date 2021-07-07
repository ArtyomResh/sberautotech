import { graphql, useStaticQuery } from 'gatsby';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Layout from '../components/layout';
import VacanciesList from '../components/vacancies-list';
import TagsList from '../components/tags-list';
import DirectionsList from '../components/directions-list';

import { useClassnames } from '../hooks/use-classnames';

import SearchIcon from '../images/search.svg';
import CrossIcon from '../images/cross.svg';

import style from './vacancies.css';
import Button from '../components/button';

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

    return (
        <Layout seo={data.allStrapiVacanciesPage.edges[0].node.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={3}>
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
                                        placeholder="Поиск"
                                        onChange={(e) => setSearchString(e.target.value)}
                                    />
                                    {(searchString) ? (
                                        <img className={cn('vacancies__search-icon')} src={CrossIcon} onClick={() => setSearchString('')} />
                                    ) : (
                                        <img className={cn('vacancies__search-icon')} src={SearchIcon} onClick={() => $container.current?.focus()} />
                                    )}
                                </div>
                                <div className={cn('vacancies__result-wrapper')}>
                                    {(searchString) ? (
                                        <p className={cn('vacancies__result')}>
                                            Найден{
                                                (() => {
                                                    if(filteredVacancies.length === 1) {
                                                        return 'a';
                                                    }

                                                    return 'о';
                                                })()
                                            } {filteredVacancies.length} ваканси{
                                                (() => {
                                                    if(filteredVacancies.length === 0 || filteredVacancies.length > 4) {
                                                        return 'й';
                                                    }

                                                    if(filteredVacancies.length === 1) {
                                                        return 'я';
                                                    }

                                                    if(filteredVacancies.length > 1 && filteredVacancies.length < 5) {
                                                        return 'и';
                                                    }
                                                })()
                                            }
                                        </p>
                                    ) : null}
                                </div>
                                <div className={cn('vacancies__tags-wrapper')}>
                                    <TagsList tags={filteredTags} activeTags={activeTags} onClickTag={onClickTag} />
                                </div>
                                <VacanciesList searchString={searchString} data={filteredVacancies} activeTags={activeTags} onClickTag={onClickTag} />
                            </div>
                            <Button
                                styleType="primary"
                                type="button"
                                className={cn('vacancies__button', 'vacancies__filter-button', {
                                    'vacancies__filter-button_hidden': isMobileFilterVisible
                                })}
                                label="Фильтровать"
                                count={(activeDirection ? 1 : 0) + activeTags?.length || 0}
                                onClick={() => setIsMobileFilterVisible(!isMobileFilterVisible)}
                            />
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
                            <Button
                                styleType="primary"
                                type="button"
                                className={cn('vacancies__button', 'vacancies__show-button', {
                                    'vacancies__show-button_visible': isMobileFilterVisible
                                })}
                                label={`Смотреть ${filteredVacancies.length} ваканси${(() => {
                                    if(filteredVacancies.length === 0 || filteredVacancies.length > 4) {
                                        return 'й';
                                    }

                                    if(filteredVacancies.length === 1) {
                                        return 'ю';
                                    }

                                    if(filteredVacancies.length > 1 && filteredVacancies.length < 5) {
                                        return 'и';
                                    }
                                })()
                                }`}
                                onClick={() => setIsMobileFilterVisible(!isMobileFilterVisible)}
                            />
                            <Button
                                styleType="primary"
                                type="button"
                                className={cn('vacancies__button', 'vacancies__reset-button', {
                                    'vacancies__reset-button_visible': isMobileFilterVisible
                                })}
                                label="Сбросить"
                                count={(activeDirection ? 1 : 0) + activeTags?.length || 0}
                                onClick={() => {
                                    setActiveDirection(null);
                                    setActiveTags([]);
                                    setIsMobileFilterVisible(!isMobileFilterVisible);
                                }}
                            />
                        </div>
                    )
                }
            </div>
        </Layout>
    );
};

export default Vacancies;
