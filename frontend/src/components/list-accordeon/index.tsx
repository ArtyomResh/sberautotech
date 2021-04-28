import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import AccordeonItem from '../accordeon-item';

import style from './index.css';

interface IProps {
    data: IListAccoreon
}

interface IListAccoreon {
    header: string
    list_items: Array<IListAccoreonItem>
}

export interface IListAccoreonItem {
    target?: string
    description?: string
    header: string
    subDescriptionFirst?: string
    subDescriptionSecond?: string
    link: {
        to: string,
        text: string,
        style: 'border' | 'fill'
    }

}

const ListAccoreon: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('list-accordeon__wrapper')}>
            <div className={cn('list-accordeon__header')}>
                {data.header}
            </div>
            <ul className={cn('list-accordeon__list')}>
                {data.list_items.map((item: IListAccoreonItem, i: number) => (
                    <li key={i} className={cn('list-accordeon__list-item')}>
                        <div className={cn('list-accordeon__target-wrapper')}>
                            {item.target}
                        </div>
                        <AccordeonItem data={item} />
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default ListAccoreon;