import React, { useState } from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import GridWrapper from '../../../grid-wrapper';
import Heading from '../../../heading';
import { Picture } from '../../../Picture';
import Text from '../../../text';

import Accordion from '../Accordion';

import perceptionImgDesktopNormalSrc from './assets/desktopNormal/perception.png'
import predictionImgDesktopNormalSrc from './assets/desktopNormal/prediction.png'
import pathPlanningImgDesktopNormalSrc from './assets/desktopNormal/path-planning.png'

import perceptionImgDesktopSmallSrc from './assets/desktopNormal/perception.png'
import predictionImgDesktopSmallSrc from './assets/desktopNormal/prediction.png'
import pathPlanningImgDesktopSmallSrc from './assets/desktopNormal/path-planning.png'

import perceptionImgTabletSrc from './assets/tablet/perception.png'
import predictionImgTabletSrc from './assets/tablet/prediction.png'
import pathPlanningImgTabletSrc from './assets/tablet/path-planning.png'

import perceptionImgMobileSrc from './assets/mobile/perception.png'
import predictionImgMobileSrc from './assets/mobile/prediction.png'
import pathPlanningImgMobileSrc from './assets/mobile/path-planning.png'

import style from './index.css';


const driveAlgorithms = [
    { 
        id: 'perception',
        title: 'Восприятие и&#160;локализация',
        description: 'Все, что &#171;видит&#187; автомобиль с&#160;помощью лидаров, радаров и&#160;камер, обрабатывается в&#160;режиме реального времени. Анализ данных и&#160;нейросети помогают автомобилю правильно распознать объекты, попавшие в&#160;поле зрения сенсоров, а&#160;HD-карты определяют положение беспилотного автомобиля на&#160;дороге с&#160;точностью до&#160;нескольких сантиметров' 
    },
    { 
        id: 'prediction',
        title: 'Прогнозирование', 
        description: 'С&#160;помощью алгоритмов и&#160;машинного обучения беспилотник предсказывает поведение водителей и&#160;пешеходов в&#160;самых разнообразных ситуациях, распознает логику, скорость и&#160;направление движения объектов и&#160;только после этого принимает решение. Это особенно важно на&#160;перекрестках, вблизи переходов, при перестроении в&#160;соседнюю полосу' 
    },
    { 
        id: 'path-planning',
        title: 'Планирование пути и&#160;управление', 
        description: 'На&#160;основе собранных данных автомобиль принимает решение о&#160;том, какая траектория движения будет максимально безопасной и&#160;эффективной, на&#160;каком участке необходимо затормозить или набрать скорость, чтобы осуществить манёвр. А&#160;еще беспилотная технология прекрасно адаптируется к&#160;экстренным ситуациям, снижая риск ДТП' 
    }
];

const images = [
    {
        id: 'perception',
        srcSet: {
            desktopNormal: perceptionImgDesktopNormalSrc,
            desktopSmall: perceptionImgDesktopSmallSrc,
            tablet: perceptionImgTabletSrc,
            mobile: perceptionImgMobileSrc,
        },
        alt: 'Изображение с легковым беспилотным автомобиля СберАвтотех, на котором схематически показано как он видит объекты на дороге',
    },
    {
        id: 'prediction',
        srcSet: {        
            desktopNormal: predictionImgDesktopNormalSrc,
            desktopSmall: predictionImgDesktopSmallSrc,
            tablet: predictionImgTabletSrc,
            mobile: predictionImgMobileSrc
        },
        alt: 'Изображение с легковым беспилотным автомобиля СберАвтотех, на котором схематически показано что он может строить предположения относительно будущих положений окружающего его транспорта и пешеходов',
    },
    {   
        id: 'path-planning',
        srcSet: {    
            desktopNormal: pathPlanningImgDesktopNormalSrc,
            desktopSmall: pathPlanningImgDesktopSmallSrc,
            tablet: pathPlanningImgTabletSrc,
            mobile: pathPlanningImgMobileSrc, 
        },
        alt: 'Изображение с легковым беспилотным автомобиля СберАвтотех, на котором схематически показано как он определяет какой манёвр и путь передвижения ему избрать',
    },
]

const DriveAlgorithms = () => {
    const cn = useClassnames(style);
    const [openedAccordion, setOpenedAccordion] = useState(driveAlgorithms[0].id)

    const cssBlock = 'drive-algorithms'

    const handleAccordionClick = (accordionId: string) => {
        if (accordionId === openedAccordion) {
            setOpenedAccordion('')
        } else {
            setOpenedAccordion(accordionId)
        }
    }
    
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
                {images.map(({ id, srcSet, alt}) => (
                    <Picture 
                        className={cn(`${cssBlock}__image`, { [`${cssBlock}__image_visible`]: id === 'perception' || openedAccordion === id })}
                        image={srcSet}
                        alt={alt}
                    />
                ))}
            </div>
        </GridWrapper>
    );
};

export default DriveAlgorithms;
