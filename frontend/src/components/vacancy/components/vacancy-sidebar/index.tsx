import { IVacancy } from '../../../../types/strapi/vacancies';
import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import ArrowLeft from '../../../../images/arrow-left.inline.svg';


import ButtonWrapper from '../button-wrapper';

import './index.css';

interface IProps extends Pick<IVacancy, 'city' | 'jobType' | 'title' | 'huntflowId'> {
    backToPreviousPage: () => void
}

const VacancySidebar = ({ city, jobType, title, huntflowId, backToPreviousPage }: IProps) => {
    const cn = useClassnames();

    return (
        <div className={cn('vacancy-sidebar')}>
            <div>
                <div className={cn('vacancy-sidebar__header')}>
                    <ArrowLeft
                        className={cn('vacancy-sidebar__icon-arrow-left')}
                        onClick={backToPreviousPage}
                    />

                    <h1>Вакансия</h1>
                </div>

                <div className={cn('vacancy-sidebar__main')}>
                    <ul className={cn('vacancy-sidebar__list')}>
                        <li>{city.text}</li>
                        <li>{jobType.duration}</li>
                        <li>{jobType.text}</li>
                        <li>Офис</li>
                    </ul>

                    <ButtonWrapper
                        className={cn('vacancy-sidebar__button-respond')}
                        title={title}
                        huntflowId={huntflowId}
                    >
                        Откликнуться
                    </ButtonWrapper>
                </div>
            </div>
        </div>
    );
};

export default VacancySidebar;
