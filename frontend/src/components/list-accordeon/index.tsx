import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import { ILocalFile } from '../../types';
import AccordeonItem from '../accordeon-item';

import './index.css';

interface IProps {
    data: IListAccordeon,
    className?: string
}

interface IListAccordeon {
    header: string,
    list_items: Array<IListAccordeonItem>
}

export interface IListAccordeonItem {
    id?: string,
    target?: string,
    description?: string,
    header: string,
    subDescriptionFirst?: string,
    subDescriptionSecond?: string,
    image?: ILocalFile,
    link?: {
        to: string,
        text: string,
        style: 'border' | 'fill'
    }
}

const ListAccordeon: React.FC<IProps> = ({ data, className }) => {
    const cn = useClassnames();

    return (
        <div className={cn('list-accordeon__wrapper', { [`${className}-wrapper`]: className })}>
            {data.header && (
                <div className={cn('list-accordeon__header', { [`${className}-header`]: className })}>
                    {data.header}
                </div>
            )}

            <ul className={cn('list-accordeon__list', { [`${className}`]: className })}>
                {data.list_items.map((item: IListAccordeonItem, i: number) => (
                    <li key={i} className={cn('list-accordeon__list-item', { [`${className}-item`]: className })}>

                        <div
                            className={cn(
                                'list-accordeon__target-wrapper',
                                {
                                    [`${className}-target-wrapper`]: className

                                }
                            )}
                        >
                            {item.target}
                        </div>

                        <AccordeonItem data={item} className={className} />
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default ListAccordeon;
