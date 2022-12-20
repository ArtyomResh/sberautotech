import React, { useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import { IListAccordeonItem } from '../list-accordeon';
import { gtagClicked } from '../../utils';

import AccordeonHide from '../../images/accordeon-hide.inline.svg';
import AccordeonShow from '../../images/accordeon-show.inline.svg';

import LinkButton from '../link-button';

import style from './index.css';

interface IProps {
    data: IListAccordeonItem,
    className?: string
}

const AccordeonItem: React.FC<IProps> = ({ data, className }) => {
    const cn = useClassnames(style);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        gtagClicked(`accordeon_button_click_${data.id}`);
    };

    return (
        <div className={cn('accordeon', { [`${className}-item-wrapper`]: className })}>
            <button className={cn('accordeon__header-wrapper', { [`${className}-item-header-wrapper`]: className })} onClick={handleClick}>
                <div className={cn('accordeon__toggle', { [`${className}-item-toggle`]: className })}>
                    {isOpen ? <AccordeonHide className={cn('accordeon__toggle_hide')} /> : <AccordeonShow className={cn('accordeon__toggle_show')} />}
                </div>
                <div className={cn('accordeon__header', { [`${className}-item-header`]: className })}>
                    {data.header}
                </div>
            </button>
            {isOpen ? (
                <div className={cn('accordeon__body', { [`${className}-item-body`]: className })}>
                    <div className={cn('accordeon__description', { [`${className}-item-description`]: className })}>
                        {data.image && (
                            <img
                                src={data.image.localFile.url}
                                className={cn('accordeon__image', { [`${className}-item-image`]: className })}
                            />
                        )}
                        {data.description}
                    </div>
                    <div className={cn('accordeon__sub-description-wrapper')}>
                        {data.link && (
                            <div className={cn('accordeon__link-wrapper')}>
                                <LinkButton
                                    href={data.link.to}
                                    isGatsbyLink={true}
                                    className={cn('accordeon__link')}
                                    onClick={handleLinkClick}
                                    isBlock={true}
                                >
                                    {data.link.text}
                                </LinkButton>
                            </div>
                        )}
                        <div className={cn('accordeon__sub-description')}>
                            {data.subDescriptionFirst ? data.subDescriptionFirst : ''}
                        </div>
                        <div className={cn('accordeon__sub-description')}>
                            {data.subDescriptionSecond ? data.subDescriptionSecond : ''}
                        </div>
                    </div>
                </div>
            ) : null}

        </div>
    );
};

export default AccordeonItem;