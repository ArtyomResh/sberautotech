import React from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../../../../../hooks/use-classnames';

import Text from '../../../../../text';
import Heading from '../../../../../heading';
import { IPictureVariants, Picture } from '../../../../../Picture';

import ArrowLeft from './assets/arrow-left.inline.svg';
import style from './index.css';

interface IProps {
    className?: string,
    title: string,
    description: string,
    image?: IPictureVariants & { alt: string },
    href? : string
}

const Card = ({ className, title, description, image, href }: IProps) => {
    const cn = useClassnames(style);
    const cssBlock = 'transport-type-card';

    return (
        <div className={cn(className, `${cssBlock}__wrapper`)}>

            {href && (
                <React.Fragment>
                    <Link
                        to={href}
                        className={cn(`${cssBlock}__link`)}
                        aria-label={`Ссылка на страницу «${title}»`}
                    />

                    <ArrowLeft className={cn(`${cssBlock}__icon-arrow-left`)} />
                </React.Fragment>

            )}

            {(image?.desktopNormal || image?.desktopSmall || image?.tablet || image?.mobile) && (
                <Picture
                    className={cn(`${cssBlock}__picture`)}
                    image={image}
                    alt={image.alt}
                />
            )}

            <Heading
                className={cn(`${cssBlock}__title`)}
                level={4}
                dangerouslySetInnerHTML={{ __html: title }}
            />

            <Text
                className={cn(`${cssBlock}__description`)}
                size={4}
                dangerouslySetInnerHTML={{ __html: description }}
            />

        </div>
    );
};

export default Card;
