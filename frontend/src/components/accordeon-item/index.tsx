import { Link } from 'gatsby';
import React, { useRef, useState } from 'react';

import { UseHover } from '../../hooks/use-hover';
import { useClassnames } from '../../hooks/use-classnames';
import { IListAccoreonItem } from '../list-accordeon';

import AccordeonHide from '../../images/accordeon-hide.inline.svg';
import AccordeonHideHover from '../../images/accordeon-hide-hover.inline.svg';
import AccordeonShow from '../../images/accordeon-show.inline.svg';
import AccordeonShowHover from '../../images/accordeon-show-hover.inline.svg';

import style from './index.css';

interface IProps {
    data: IListAccoreonItem
}

const AccoreonItem: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();
    const hover = UseHover(ref);

    const toggleHandler = () => {
        if(isOpen) {
            if(hover) {
                return <AccordeonHideHover />;
            }

            return <AccordeonHide />;
        }

        return hover ? <AccordeonShowHover /> : <AccordeonShow />;
    };

    return (
        <div className={cn('accordeon__wrapper')}>
            <div className={cn('accordeon__header-wrapper')}>
                <div ref={ref} className={cn('accordeon__toggle')} onClick={() => setIsOpen(!isOpen)}>
                    {toggleHandler()}
                </div>
                <div className={cn('accordeon__header')}>
                    {data.header}
                </div>
            </div>
            {isOpen ? (
                <div className={cn('accordeon__body')}>
                    <div className={cn('accordeon__description')}>
                        {data.description}
                    </div>
                    <div className={cn('accordeon__sub-description-wrapper')}>
                        <div className={cn('accordeon__link-wrapper')}>
                            <Link to={data.link.to} className={cn('accordeon__link', `accordeon__link_${data.link?.style || 'border'}`)}>
                                {data.link.text}
                            </Link>
                        </div>
                        <div className={cn('accordeon__sub-description')}>
                            {data.subDescriptionFirst}
                        </div>
                        <div className={cn('accordeon__sub-description')}>
                            {data.subDescriptionSecond}
                        </div>
                    </div>
                </div>
            ) : null}

        </div>
    );
};

export default AccoreonItem;