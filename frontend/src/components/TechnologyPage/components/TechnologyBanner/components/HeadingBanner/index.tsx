import React from 'react';
import { useClassnames } from '../../../../../../hooks/use-classnames';
import GridWrapper from '../../../../../grid-wrapper';
import Heading from '../../../../../heading';
import Text from '../../../../../text';

import styles from './index.css';

export interface IHeroProps {
    title: string,
    description: string,
    image: string
}


const HeadingBanner: React.FC<IHeroProps> = ({ title, description, image }) => {
    const cssBlock = 'heading-banner';

    const cn = useClassnames(styles);

    return (
        <GridWrapper className={cn(cssBlock)}>
            <img src={image} alt={title} className={cn(`${cssBlock}__image`)} />
            <Heading
                level={2}
                className={cn(`${cssBlock}__title`)}
            >
                {title}
            </Heading>
            <Text className={cn(`${cssBlock}__description`)} size={1}>{description}</Text>
        </GridWrapper>
    );
};

export default HeadingBanner;


