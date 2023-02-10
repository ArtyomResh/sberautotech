import React from 'react';

export interface IPictureVariants {
    desktop: string,
    smallDesktop?: string,
    tablet?: string,
    mobile?: string
}

type TProps = IPictureVariants & {alt?: string, className?: string};


export const Picture: React.FC<TProps> = ({ desktop, smallDesktop, tablet, mobile, alt, className }) => {
    return (
        <picture className={className}>
            <source srcSet={mobile || tablet || smallDesktop || desktop} media="(max-width: 743px)" />
            <source srcSet={tablet || smallDesktop || desktop} media="(max-width: 1279px)" />
            <source srcSet={smallDesktop || desktop} media="(max-width: 1919px)" />
            <img src={desktop} alt={alt}></img>
        </picture>
    );
};
