import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import transportDesktopNormalImgSrc from './assets/desktopNormal/transport.jpg';
import transportDesktopSmallImgSrc from './assets/desktopSmall/transport.jpg';
import transportMobileImgSrc from './assets/mobile/transport.jpg';
import transportTabletImgSrc from './assets/tablet/transport.jpg';
import HeadingBanner from './components/HeadingBanner';
import './index.css';

const TechnologyBanner: React.FC = () => {
    const cn = useClassnames();

    const cssBlock = 'technology-banner';

    return (
        <HeadingBanner
            className={cn(cssBlock)}
            descriptionClassName={cn(`${cssBlock}__description`)}
            title="Безопасное беспилотное будущее"
            description="Технология автономного вождения будет повсюду уже через несколько лет. Доставка грузов станет быстрее и&#160;эффективнее, такси&#160;&#8212; безопаснее, а&#160;инфраструктура городов изменится вместе с&#160;транспортом"
            image={{
                desktopNormal: transportDesktopNormalImgSrc,
                desktopSmall : transportDesktopSmallImgSrc,
                tablet       : transportTabletImgSrc,
                mobile       : transportMobileImgSrc
            }}
        />
    );
};

export default TechnologyBanner;
