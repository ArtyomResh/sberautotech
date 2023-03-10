import React, { useState } from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';
import { useSourceByScreenType } from '../../../../utils/hooks/useSourceByScreen';
import GridWrapper from '../../../grid-wrapper';
import Heading from '../../../heading';
import Text from '../../../text';
import Accordion from '../Accordion';

import perceptionVideoDesktopSmallSrc from './assets/desktopSmall/perception.mp4';
import perceptionImgDesktopSmallSrc from './assets/desktopSmall/perception.png';
import planningVideoDesktopSmallSrc from './assets/desktopSmall/planning.mp4';
import planningImgDesktopSmallSrc from './assets/desktopSmall/planning.png';
import predictionVideoDesktopSmallSrc from './assets/desktopSmall/prediction.mp4';
import predictionImgDesktopSmallSrc from './assets/desktopSmall/prediction.png';
import perceptionVideoMobileSrc from './assets/mobile/perception.mp4';
import planningVideoMobileSrc from './assets/mobile/planning.mp4';
import predictionVideoMobileSrc from './assets/mobile/prediction.mp4';
import style from './index.css';


const driveAlgorithms = [
    {
        id         : 'perception',
        title      : 'Восприятие и&#160;локализация',
        description: 'Все, что &#171;видит&#187; автомобиль с&#160;помощью лидаров, радаров и&#160;камер, обрабатывается в&#160;режиме реального времени. Анализ данных и&#160;нейросети помогают автомобилю правильно распознать объекты, попавшие в&#160;поле зрения сенсоров, а&#160;HD-карты определяют положение беспилотного автомобиля на&#160;дороге с&#160;точностью до&#160;нескольких сантиметров'
    },
    {
        id         : 'prediction',
        title      : 'Прогнозирование',
        description: 'С&#160;помощью алгоритмов и&#160;машинного обучения беспилотник предсказывает поведение водителей и&#160;пешеходов в&#160;самых разнообразных ситуациях, распознает логику, скорость и&#160;направление движения объектов и&#160;только после этого принимает решение. Это особенно важно на&#160;перекрестках, вблизи переходов, при перестроении в&#160;соседнюю полосу'
    },
    {
        id         : 'path-planning',
        title      : 'Планирование пути и&#160;управление',
        description: 'На&#160;основе собранных данных автомобиль принимает решение о&#160;том, какая траектория движения будет максимально безопасной и&#160;эффективной, на&#160;каком участке необходимо затормозить или набрать скорость, чтобы осуществить манёвр. А&#160;еще беспилотная технология прекрасно адаптируется к&#160;экстренным ситуациям, снижая риск ДТП'
    }
];

const DriveAlgorithms = () => {
    const predictionVideo = useSourceByScreenType<string>({
        desktopSmall: predictionVideoDesktopSmallSrc,
        mobile      : predictionVideoMobileSrc
    }, predictionVideoDesktopSmallSrc);

    const perceptionVideo = useSourceByScreenType<string>({
        desktopSmall: perceptionVideoDesktopSmallSrc,
        mobile      : perceptionVideoMobileSrc
    }, perceptionVideoDesktopSmallSrc);

    const planningVideo = useSourceByScreenType<string>({
        desktopSmall: planningVideoDesktopSmallSrc,
        mobile      : planningVideoMobileSrc
    }, planningVideoDesktopSmallSrc);

    const videos = [
        {
            id    : 'perception',
            src   : perceptionVideo,
            poster: perceptionImgDesktopSmallSrc
        },
        {
            id    : 'prediction',
            src   : predictionVideo,
            poster: predictionImgDesktopSmallSrc
        },
        {
            id    : 'path-planning',
            src   : planningVideo,
            poster: planningImgDesktopSmallSrc
        }
    ];

    const cn = useClassnames(style);
    const [openedAccordion, setOpenedAccordion] = useState(driveAlgorithms[0].id);

    const cssBlock = 'drive-algorithms';

    const handleAccordionClick = (accordionId: string) => {
        if(accordionId === openedAccordion) {
            setOpenedAccordion('');
        } else {
            setOpenedAccordion(accordionId);
        }
    };

    return (
        <GridWrapper>

            <Heading
                className={cn(`${cssBlock}__title`)}
                level={3}
                dangerouslySetInnerHTML={{ __html: formatText('Просто {«видеть»} — недостаточно') }}
            />

            <Text
                className={cn(`${cssBlock}__description`)}
                size={2}
                dangerouslySetInnerHTML={{ __html: 'Мы&#160;сами разработали софт, который обрабатывает поступающую с&#160;сенсоров информацию, понимает контекст и&#160;выбирает оптимальный алгоритм действий для безопасности всех участников дорожного движения. В&#160;результате скорость реакции беспилотного автомобиля выше, чем у&#160;опытного водителя' }}
            />

            <ul className={cn(`${cssBlock}__list`)}>
                {driveAlgorithms.map(({ id, title, description }, index) => (
                    <Accordion
                        id={id}
                        key={id}
                        title={title}
                        description={description}
                        headingSize="s"
                        withBorderTop={index > 0}
                        isOpened={openedAccordion === id}
                        onClick={handleAccordionClick}
                    />
                ))}
            </ul>

            <div className={cn(`${cssBlock}__image-wrapper`)}>
                {videos.map((video, index) => (
                    <video
                        className={cn(`${cssBlock}__image`, { [`${cssBlock}__image_visible`]: video.id === 'perception' || openedAccordion === video.id })}
                        muted={true}
                        loop={true}
                        autoPlay={true}
                        playsInline={true}
                        preload="metadata"
                        poster={video.poster}
                        key={index}
                    >
                        <source src={video.src} type="video/mp4" />
                    </video>
                ))}

            </div>
        </GridWrapper>
    );
};

export default DriveAlgorithms;
