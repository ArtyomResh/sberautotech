import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import AdvantagesFirstIcon from '../../images/advantages-1.inline.svg';
import AdvantagesSecondIcon from '../../images/advantages-2.inline.svg';
import AdvantagesThirdIcon from '../../images/advantages-3.inline.svg';
import AdvantagesFourthIcon from '../../images/advantages-4.inline.svg';
import AdvantagesFifthIcon from '../../images/advantages-5.inline.svg';
import AdvantagesSixthIcon from '../../images/advantages-6.inline.svg';

const advantagesIcons = [
    <AdvantagesFirstIcon key="advantages-1" />,
    <AdvantagesSecondIcon key="advantages-2" />,
    <AdvantagesThirdIcon key="advantages-3" />,
    <AdvantagesFourthIcon key="advantages-4" />,
    <AdvantagesFifthIcon key="advantages-5" />,
    <AdvantagesSixthIcon key="advantages-6" />
];

import './index.css';

interface IProps {
    data: IAdvantagesList
}

interface IAdvantagesList {
    header: string,
    list_items: Array<IAdvantagesListItem>
}

interface IAdvantagesListItem {
    header: string
}

const AdvantagesList: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames();

    return (
        <div className={cn('advantages__wrapper')}>
            <div className={cn('advantages__header')}>
                {data.header}
            </div>
            <div className={cn('advantages__body')}>
                <div className={cn('advantages__sub-header')}>
                    <p>Почему у нас комфортно работать</p>
                </div>
                <ul className={cn('advantages__list')}>
                    {data.list_items.map((item, i) => (
                        <li key={i} className={cn('advantages__list-item')}>
                            <div className={cn('advantages__icon')}>
                                {advantagesIcons[i]}
                            </div>
                            {item.header}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdvantagesList;
