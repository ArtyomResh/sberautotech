import { Link } from 'gatsby';
import React, { useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import { IListAccoreonItem } from '../list-accordeon';

import AccordeonHide from '../../images/accordeon-hide.inline.svg';
import AccordeonShow from '../../images/accordeon-show.inline.svg';

import style from './index.css';

interface IProps {
    data: IListAccoreonItem,
    className?: string
}

const AccoreonItem: React.FC<IProps> = ({ data, className }) => {
    const cn = useClassnames(style);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn('accordeon__wrapper', { [`${className}-item-wrapper`]: className })}>
            <div className={cn('accordeon__header-wrapper', { [`${className}-item-header-wrapper`]: className })}>
                <div className={cn('accordeon__toggle', { [`${className}-item-toggle`]: className })} onClick={() => setIsOpen(!isOpen)}>
                    { isOpen ? <AccordeonHide /> : <AccordeonShow /> }
                </div>
                <div className={cn('accordeon__header', { [`${className}-item-header`]: className })}>
                    {data.header}
                </div>
            </div>
            {isOpen ? (
                <div className={cn('accordeon__body', { [`${className}-item-body`]: className })}>
                    <div className={cn('accordeon__description', { [`${className}-item-description`]: className })}>
                        {data.image && (
                            <img
                                src={data.image.localFile.publicURL}
                                className={cn('accordeon__image', { [`${className}-item-image`]: className })}
                            />
                        )}
                        {data.description}
                    </div>
                    <div className={cn('accordeon__sub-description-wrapper')}>
                        {data.link && (
                            <div className={cn('accordeon__link-wrapper')}>
                                <Link to={data.link?.to} className={cn('accordeon__link', `accordeon__link_${data.link?.style || 'border'}`)}>
                                    {data.link?.text}
                                </Link>
                            </div>
                        )}
                        {data.subDescriptionFirst && (
                            <div className={cn('accordeon__sub-description')}>
                                {data.subDescriptionFirst}
                            </div>
                        )}
                        {data.subDescriptionSecond && (
                            <div className={cn('accordeon__sub-description')}>
                                {data.subDescriptionSecond}
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

        </div>
    );
};

export default AccoreonItem;