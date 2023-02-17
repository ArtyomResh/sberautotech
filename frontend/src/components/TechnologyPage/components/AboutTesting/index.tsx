import React from 'react';
import { isMobileOnly } from 'react-device-detect';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import GridWrapper from '../../../grid-wrapper';
import Heading from '../../../heading';
import Text from '../../../text';

import VideoCard from './components/VideoCard';
import polygonJpegSrc from './static/polygon.jpeg';
import polygonMp4Src from './static/polygon.mp4';
import polygonWebmSrc from './static/polygon.webm';
import showreelJpegSrc from './static/showreel.jpeg';
import showreelMp4Src from './static/showreel.mp4';
import showreelWebmSrc from './static/showreel.webm';
import style from './index.css';

const video = isMobileOnly ? { webm: showreelWebmSrc, mp4: showreelMp4Src } : { webm: polygonWebmSrc, mp4: polygonMp4Src };
const poster = isMobileOnly ? showreelJpegSrc : polygonJpegSrc;
const tests = [
    {
        title      : 'В&#160;симуляторе',
        description: 'Тестирование в&#160;симуляторе точно воссоздает любую дорожную ситуацию. Так беспилотный автомобиль учится реагировать в&#160;различных обстоятельствах, включая очень редкие',
        video,
        poster
    },
    {
        title      : 'На&#160;полигоне',
        description: 'Тестирование на&#160;полигоне позволяет безопасно испытать технологию в&#160;условиях максимально приближенных к&#160;реальным, которые небезопасно отрабатывать в&#160;городе: экстренное торможение, резкие маневры, полностью автономное управление без водителя за&#160;рулём',
        video,
        poster
    },
    {
        title      : 'В&#160;городе',
        description: 'Перед испытаниями в&#160;городе большинство ключевых сценариев и&#160;дорожных ситуаций уже отработаны на&#160;полигоне и&#160;автомобиль готов к&#160;испытаниям в&#160;условиях интенсивного живого трафика',
        video,
        poster
    }
];

const AboutTesting = () => {
    const cn = useClassnames(style);

    const cssBlock = 'about-testing';

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
                dangerouslySetInnerHTML={{ __html: 'Беспилотная технология проходит несколько уровней тестирования. Автомобиль отправляется в&#160;город только тогда, когда мы&#160;полностью уверены в&#160;его безопасности и&#160;эффективности. Все компоненты также проходят обязательные проверки: климатические и&#160;вибрационные испытания, испытания на&#160;электромагнитную совместимость.' }}
            />

            <ul className={cn(`${cssBlock}__tests`)}>
                {
                    tests.map(({ title, description, video, poster }) => (
                        <li key={title}>
                            <VideoCard
                                key={title}
                                className={cn(`${cssBlock}__test`)}
                                title={title}
                                description={description}
                                video={video}
                                poster={poster}
                            />
                        </li>

                    ))
                }
            </ul>
        </GridWrapper>
    );
};

export default AboutTesting;
