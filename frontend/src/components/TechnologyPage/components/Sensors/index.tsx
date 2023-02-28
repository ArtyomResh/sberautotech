import React, { useState } from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import GridWrapper from '../../../grid-wrapper';
import { Picture } from '../../../Picture';
import Accordion from '../Accordion';

import camerasImgDesktopNormalSrc from './assets/desktopNormal/cameras.png';
import lidarsImgDesktopNormalSrc from './assets/desktopNormal/lidars.png';
import radarsImgDesktopNormalSrc from './assets/desktopNormal/radars.png';
import sensorsImgDesktopNormalSrc from './assets/desktopNormal/sensors.png';
import sidImgDesktopNormalSrc from './assets/desktopNormal/sid.png';
import camerasImgDesktopSmallSrc from './assets/desktopSmall/cameras.png';
import lidarsImgDesktopSmallSrc from './assets/desktopSmall/lidars.png';
import radarsImgDesktopSmallSrc from './assets/desktopSmall/radars.png';
import sensorsImgDesktopSmallSrc from './assets/desktopSmall/sensors.png';
import sidImgDesktopSmallSrc from './assets/desktopSmall/sid.png';
import camerasImgMobileSrc from './assets/mobile/cameras.png';
import lidarsImgMobileSrc from './assets/mobile/lidars.png';
import radarsImgMobileSrc from './assets/mobile/radars.png';
import sensorsImgMobileSrc from './assets/mobile/sensors.png';
import sidImgMobileSrc from './assets/mobile/sid.png';
import camerasImgTabletSrc from './assets/tablet/cameras.png';
import lidarsImgTabletSrc from './assets/tablet/lidars.png';
import radarsImgTabletSrc from './assets/tablet/radars.png';
import sensorsImgTabletSrc from './assets/tablet/sensors.png';
import sidImgTabletSrc from './assets/tablet/sid.png';
import Swiper from './components/Swiper';
import './index.css';

const sensors = [
    {
        id         : 'sensors',
        title      : 'Набор сенсоров',
        description: 'Радары, лидары и&#160;камеры непрерывно считывают ситуацию на&#160;дороге. Благодаря сочетанию трех видов считывающих устройств у&#160;беспилотного автомобиля нет слепых зон&#160;&#8212; он&#160;видит все, что происходит вокруг него'
    },
    {
        id         : 'radars',
        title      : 'Радары',
        description: 'Помогают автомобилю сориентироваться в&#160;пространстве: определяют расстояние до&#160;ближайших объектов, оценивают их&#160;скорость и&#160;направление движения. С&#160;помощью радаров беспилотный автомобиль видит окружающий мир в&#160;3D'
    },
    {
        id         : 'lidars',
        title      : 'Лидары',
        description: 'Беспрерывно сканируют пространство миллионами лазерных лучей&#160;&#8212; так получается карта с&#160;невероятной детализацией. Радары &#171;видят&#187; объемное пространство, а&#160;лидары делают его детализированным, идентифицируют автомобили, пешеходов и&#160;вообще все, что происходит вокруг.'
    },
    {
        id         : 'cameras',
        title      : 'Камеры',
        description: 'Считывают важную визуальную информацию, например, отличают цвета светофора, распознают знаки и&#160;разметку. Так картинка, которую получает автомобиль, становится завершенной и&#160;ему становится легко ориентироваться в&#160;постоянно меняющейся дорожной обстановке'
    }
];

const images = [
    {
        id    : 'sid',
        srcSet: {
            desktopNormal: sidImgDesktopNormalSrc,
            desktopSmall : sidImgDesktopSmallSrc,
            tablet       : sidImgTabletSrc,
            mobile       : sidImgMobileSrc
        },
        alt: 'Изображение легкового беспилотного автомобиля СберАвтотех'
    },
    {
        id    : 'sensors',
        srcSet: {
            desktopNormal: sensorsImgDesktopNormalSrc,
            desktopSmall : sensorsImgDesktopSmallSrc,
            tablet       : sensorsImgTabletSrc,
            mobile       : sensorsImgMobileSrc
        },
        alt: 'Изображение всех имеющихся сенсоров на легковом беспилотного автомобиле СберАвтотех'
    },
    {
        id    : 'radars',
        srcSet: {
            desktopNormal: radarsImgDesktopNormalSrc,
            desktopSmall : radarsImgDesktopSmallSrc,
            tablet       : radarsImgTabletSrc,
            mobile       : radarsImgMobileSrc
        },
        alt: 'Изображение радаров на легковом беспилотного автомобиле СберАвтотех'
    },
    {
        id    : 'lidars',
        srcSet: {
            desktopNormal: lidarsImgDesktopNormalSrc,
            desktopSmall : lidarsImgDesktopSmallSrc,
            tablet       : lidarsImgTabletSrc,
            mobile       : lidarsImgMobileSrc
        },
        alt: 'Изображение ЛИДАРов на легковом беспилотного автомобиле СберАвтотех'
    },
    {
        id    : 'cameras',
        srcSet: {
            desktopNormal: camerasImgDesktopNormalSrc,
            desktopSmall : camerasImgDesktopSmallSrc,
            tablet       : camerasImgTabletSrc,
            mobile       : camerasImgMobileSrc
        },
        alt: 'Изображение видеокамер на легковом беспилотного автомобиле СберАвтотех'
    }
];

const Sensors = () => {
    const cn = useClassnames();
    const [openedAccordion, setOpenedAccordion] = useState(sensors[0].id);

    const cssBlock = 'sensors';

    const handleAccordionClick = (accordionId: string) => {
        if(accordionId === openedAccordion) {
            setOpenedAccordion('');
        } else {
            setOpenedAccordion(accordionId);
        }
    };

    return (
        <GridWrapper className={cn(`${cssBlock}__wrapper`)}>
            <ul className={cn(cssBlock)}>
                {sensors.map(({ id, title, description }, index) => (
                    <Accordion
                        id={id}
                        key={id}
                        title={title}
                        color="white"
                        description={description}
                        headingSize={index === 0 ? 'm' : 's'}
                        isOpened={openedAccordion === id}
                        onClick={handleAccordionClick}
                        withBorderTop={index > 0}
                    />
                ))}
            </ul>

            <Swiper className={cn(`${cssBlock}__swiper`)} slides={sensors} onSlideChange={setOpenedAccordion} />

            <div className={cn(`${cssBlock}__image-wrapper`)}>
                {images.map(({ id, srcSet, alt }) => (
                    <Picture
                        key={id}
                        className={cn(
                            `${cssBlock}__image`,
                            {
                                [`${cssBlock}__image-cameras`]     : id === 'cameras',
                                [`${cssBlock}__image_visible`]     : id === 'sid' && openedAccordion !== 'cameras' || openedAccordion === id,
                                [`${cssBlock}__image_zoomed`]      : openedAccordion === 'lidars' || openedAccordion === 'radars',
                                [`${cssBlock}__image_extra-zoomed`]: openedAccordion === 'lidars'
                            }
                        )}
                        image={srcSet}
                        alt={alt}
                    />
                ))}
            </div>

        </GridWrapper>
    );
};

export default Sensors;
