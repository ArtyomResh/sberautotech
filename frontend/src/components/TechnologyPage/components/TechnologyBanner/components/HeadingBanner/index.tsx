import React from 'react';

import { useClassnames } from '../../../../../../hooks/use-classnames';
import GridWrapper from '../../../../../grid-wrapper';
import { IPictureVariants, Picture } from '../../../../../Picture';
import Text from '../../../../../text';

import './index.css';

export interface IHeroProps {
    title: string,
    description: string,
    image: IPictureVariants,
    className?: string,
    descriptionClassName?: string
}


const HeadingBanner: React.FC<IHeroProps> = ({ title, description, image, className, descriptionClassName }) => {
    const cn = useClassnames();

    const cssBlock = 'heading-banner';

    return (
        <GridWrapper className={cn(cssBlock, className)}>
            <Picture image={image} alt={title} className={cn(`${cssBlock}__image`)} />

            <h1 className={cn(`${cssBlock}__title`)}>
                {title}
            </h1>

            <Text className={cn(`${cssBlock}__description`, descriptionClassName)} size={2}>{description}</Text>
        </GridWrapper>
    );
};

export default HeadingBanner;


