import React from 'react';

import { SCREEN_EDGES } from '../../constants';

export interface IPictureVariants {
    desktopNormal: string,
    desktopSmall?: string,
    tablet?: string,
    mobile?: string
}

interface IProps {
    image: IPictureVariants,
    alt: string,
    className?: string
}

export const Picture: React.FC<IProps> = ({ image, alt, className }) => {
    const { desktopNormal, desktopSmall, tablet, mobile } = image;

    return (
        <picture className={(className)}>
            <source srcSet={mobile || tablet || desktopSmall || desktopNormal} media={`(max-width: ${SCREEN_EDGES.tablet - 1})`} />
            <source srcSet={tablet || desktopSmall || desktopNormal} media={`(max-width: ${SCREEN_EDGES.desktopSmall - 1})`} />
            <source srcSet={desktopSmall || desktopNormal} media={`(max-width: ${SCREEN_EDGES.desktopNormal - 1})`} />
            <img src={desktopNormal} alt={alt} width="100%" height="100%" />
        </picture>
    );
};
