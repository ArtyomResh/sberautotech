import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import AdvatagesFisrtIcon from '../../images/advantages-1.svg';
import AdvatagesSecondIcon from '../../images/advantages-2.svg';
import AdvatagesThirdIcon from '../../images/advantages-3.svg';
import AdvatagesFourthIcon from '../../images/advantages-4.svg';
import AdvatagesFifthIcon from '../../images/advantages-5.svg';
import AdvatagesSixthIcon from '../../images/advantages-6.svg';

const advatagesIcons = [
    <AdvatagesFisrtIcon />,
    <AdvatagesSecondIcon />,
    <AdvatagesThirdIcon />,
    <AdvatagesFourthIcon />,
    <AdvatagesFifthIcon />,
    <AdvatagesSixthIcon />
];

import style from './index.css';

interface IProps {
    data: IAdvantagesList
}

interface IAdvantagesList {
    header: string;
    list_items: Array<IAdvantagesListItem>
}

interface IAdvantagesListItem {
    header: string;
}

const AdvantagesList: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);

    return (
        <div  className={cn('advantages__wrapper')}>
            <div className={cn('advantages__header')}>
                {data.header}
            </div>
            <div className={cn('advantages__body')}>
                <div className={cn('advantages__sub-header')}>
                    <p>Почему у нас комфортно работать</p>
                </div>
                <ul className={cn('advantages__list')}>
                    {data.list_items.map((item, i) => (
                        <div className={cn('advantages__list-item')}>
                            <div className={cn('advantages__icon')}>
                                {advatagesIcons[i]}
                            </div>
                            {item.header}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdvantagesList;