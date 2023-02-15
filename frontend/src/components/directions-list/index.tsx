import React, { useCallback } from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import BackIcon from '../../images/back.inline.svg';

import style from './index.css';

interface IProps {
    directions: Array<{
        header: string,
        strapiId: number
    }>,
    count: number,
    activeDirection: number | null,
    onClickDirection: (e: MouseEvent) => void
}

const DirectionsList = ({ directions, count, activeDirection, onClickDirection }: IProps) => {
    const cn = useClassnames(style);

    const backToPreviousPage = useCallback(() => {
        window.history.back();
    }, []);

    return (
        <div className={cn('directions__wrapper')}>
            <div className={cn('directions__back')}>
                <BackIcon className={cn('directions__back-icon')} onClick={backToPreviousPage} />
            </div>
            <div>
                <div className={cn('directions__header')}>
                    <p>Вакансии</p>
                </div>
                <ul className={cn('directions__list')}>
                    <li
                        className={
                            cn('directions__list-item', {
                                'directions__list-item_active': !activeDirection
                            })
                        }
                        onClick={onClickDirection}
                    >
                        Все
                    </li>
                    {directions.map(((direction, i) => (
                        <li
                            key={i}
                            className={
                                cn('directions__list-item', {
                                    'directions__list-item_active': activeDirection === direction.strapiId
                                })
                            }
                            data-id={direction.strapiId}
                            onClick={onClickDirection}
                        >
                            {direction.header}
                        </li>
                    )
                    ))}
                </ul>
                <span className={cn('directions__count')}>{count}</span>
            </div>
        </div>

    );
};

export default DirectionsList;
