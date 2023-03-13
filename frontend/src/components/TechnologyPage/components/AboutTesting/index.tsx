import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';
import { useIsClient } from '../../../../utils/hooks/useIsClient';
import { useSourceByScreenType } from '../../../../utils/hooks/useSourceByScreen';
import GridWrapper from '../../../grid-wrapper';
import Heading from '../../../heading';
import Text from '../../../text';

import polygonMp4Src from './assets/desktopNormal/polygon.mp4';
import polygonPreviewSrc from './assets/desktopNormal/polygon_preview.jpeg';
import simulatorMp4Src from './assets/desktopNormal/simulator.mp4';
import simulatorPreviewSrc from './assets/desktopNormal/simulator_preview.jpeg';
import townMp4Src from './assets/desktopNormal/town.mp4';
import townPreviewSrc from './assets/desktopNormal/town_preview.jpeg';
import polygonMobMp4Src from './assets/mobile/polygon_mob.mp4';
import polygonMobPreviewSrc from './assets/mobile/polygon_mob_preview.jpeg';
import simulatorMobMp4Src from './assets/mobile/simulator_mob.mp4';
import simulatorMobPreviewSrc from './assets/mobile/simulator_mob_preview.jpeg';
import townMobMp4Src from './assets/mobile/town_mob.mp4';
import townMobPreviewSrc from './assets/mobile/town_mob_preview.jpeg';
import VideoCard from './components/VideoCard';
import style from './index.css';


const simulatorSources = {
    desktopNormal: {
        video : { src: simulatorMp4Src, type: 'mp4' },
        poster: simulatorPreviewSrc
    },
    mobile: {
        video : { src: simulatorMobMp4Src, type: 'mp4' },
        poster: simulatorMobPreviewSrc
    }
};

const polygonSources = {
    desktopNormal: {
        video : { src: polygonMp4Src, type: 'mp4' },
        poster: polygonPreviewSrc
    },
    mobile: {
        video : { src: polygonMobMp4Src, type: 'mp4' },
        poster: polygonMobPreviewSrc
    }
};

const townSources = {
    desktopNormal: {
        video : { src: townMp4Src, type: 'mp4' },
        poster: townPreviewSrc
    },
    mobile: {
        video : { src: townMobMp4Src, type: 'mp4' },
        poster: townMobPreviewSrc
    }
};

const AboutTesting = () => {
    const cn = useClassnames(style);

    const cssBlock = 'about-testing';

    const isClient = useIsClient();

    const simulatorSrcSet = useSourceByScreenType(simulatorSources, simulatorSources.desktopNormal);
    const polygonSrcSet = useSourceByScreenType(polygonSources, polygonSources.desktopNormal);
    const townSrcSet = useSourceByScreenType(townSources, townSources.desktopNormal);

    const tests = [
        {
            title      : 'В&#160;симуляторе',
            description: 'Тестирование в&#160;симуляторе точно воссоздает любую дорожную ситуацию. Так беспилотный автомобиль учится реагировать в&#160;различных обстоятельствах, включая очень редкие',
            video      : simulatorSrcSet.video,
            poster     : simulatorSrcSet.poster,
            preview    : simulatorPreviewSrc
        },
        {
            title      : 'На&#160;полигоне',
            description: 'Тестирование на&#160;полигоне позволяет безопасно испытать технологию в&#160;условиях максимально приближенных к&#160;реальным, которые небезопасно отрабатывать в&#160;городе: экстренное торможение, резкие маневры, полностью автономное управление без водителя за&#160;рулём',
            video      : polygonSrcSet.video,
            poster     : polygonSrcSet.poster,
            preview    : polygonPreviewSrc
        },
        {
            title      : 'В&#160;городе',
            description: 'Перед испытаниями в&#160;городе большинство ключевых сценариев и&#160;дорожных ситуаций уже отработаны на&#160;полигоне и&#160;автомобиль готов к&#160;испытаниям в&#160;условиях интенсивного живого трафика',
            video      : townSrcSet.video,
            poster     : townSrcSet.poster,
            preview    : townPreviewSrc
        }
    ];


    return (
        <GridWrapper className={cn(`${cssBlock}__wrapper`)}>

            <Heading
                className={cn(`${cssBlock}__title`)}
                level={3}
                dangerouslySetInnerHTML={{ __html: formatText('{Испытания}&#160;&#8212; ключ к&#160;безопасности') }}
            />

            <Text
                className={cn(`${cssBlock}__description`)}
                size={2}
                dangerouslySetInnerHTML={{ __html: 'Беспилотная технология проходит несколько уровней тестирования. Автомобиль отправляется в&#160;город только тогда, когда мы&#160;полностью уверены в&#160;его безопасности и&#160;эффективности. Все компоненты также проходят обязательные проверки: климатические и&#160;вибрационные испытания, испытания на&#160;электромагнитную совместимость' }}
            />

            <ul className={cn(`${cssBlock}__tests`)} key={`isClient-${isClient}`}>
                {
                    tests.map(({ title, description, video, poster, preview }) => (
                        <li key={title}>
                            <VideoCard
                                key={title}
                                className={cn(`${cssBlock}__test`)}
                                title={title}
                                description={description}
                                video={video}
                                poster={poster}
                                preview={preview}
                            />
                        </li>

                    ))
                }
            </ul>
        </GridWrapper>
    );
};

export default AboutTesting;
