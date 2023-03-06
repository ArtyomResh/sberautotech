import React from 'react';

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
            <source srcSet={mobile || tablet || desktopSmall || desktopNormal} media="(max-width: 743px)" />
            <source srcSet={tablet || desktopSmall || desktopNormal} media="(max-width: 1279px)" />
            <source srcSet={desktopSmall || desktopNormal} media="(max-width: 1919px)" />
            <img src={desktopNormal} alt={alt} width="100%" height="100%" />
        </picture>
    );
};
