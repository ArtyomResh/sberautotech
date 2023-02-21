import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import transportDesktopNormalImgSrc from './assets/desktopNormal/transport.jpg';
import transportDesktopSmallImgSrc from './assets/desktopSmall/transport.jpg';
import transportMobileImgSrc from './assets/mobile/transport.jpg';
import transportTabletImgSrc from './assets/tablet/transport.jpg';
import HeadingBanner from './components/HeadingBanner';
import './index.css';

export const TechnologyBanner: React.FC = () => {
    const cn = useClassnames();

    const cssBlock = 'technology-banner';

    return (
        <HeadingBanner
            className={cn(cssBlock)}
            title="Технология, которая изменит мир"
            description="Мы&nbsp;создаем технологию, которая изменит мир. Доставка грузов станет быстрее и&nbsp;эффективнее, такси&nbsp;&mdash; безопаснее, а&nbsp;облик городов изменится вместе с&nbsp;транспортом"
            image={{
                // передать правильные изображения для всех размеров https://jira.csssr.io/browse/SBER-262
                desktopNormal: transportDesktopNormalImgSrc,
                desktopSmall : transportDesktopSmallImgSrc,
                tablet       : transportTabletImgSrc,
                mobile       : transportMobileImgSrc
            }}
        />
    );
};
