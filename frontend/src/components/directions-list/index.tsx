import React, { useCallback } from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import BackIcon from '../../images/back.svg';

import style from './index.css';

interface IDirectionProps {
    text: string,
    isActive: boolean | undefined
}

interface IProps {
    directions: Array<{
        header: string,
        strapiId: number
    }>,
    count: number,
    activeDirections: Array<number>,
    onClickDirection: any
}

const DirectionsList = ({ directions, count, activeDirections, onClickDirection }: IProps) => {
    const cn = useClassnames(style);

    const backToPreviousPage = useCallback(() => {
        window.history.back()
    }, []);

    console.log(activeDirections, directions)

    return (
        <div className={cn('directions__wrapper')}>
            <div className={cn('directions__back')}>
                <img className={cn('directions__back-icon')} src={BackIcon} onClick={backToPreviousPage} />
            </div>
            <div>
                <div className={cn('directions__header')}>
                    <p>Вакансии</p>
                </div>
                <ul className={cn('directions__list')}>
                    <li
                        className={
                            cn('directions__list-item', {
                                'directions__list-item_active': !activeDirections.length
                            })
                        }
                        onClick={onClickDirection}
                    >
                        Все
                    </li>
                    {directions.map((direction => (
                        <li
                            className={
                                cn('directions__list-item', {
                                    'directions__list-item_active': activeDirections?.includes(direction.strapiId)
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
                <p>{count}</p>
            </div>
        </div>

    );
};

export default DirectionsList;
