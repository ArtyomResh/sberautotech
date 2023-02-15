import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import GridWrapper from '../../../grid-wrapper';

import Accordion from '../Accordion';

import style from './index.css';
import Swiper from './components/Swiper';

const sensors = [
    { title: 'Набор сенсоров', description: 'Радары, лидары и&#160;камеры непрерывно считывают ситуацию на&#160;дороге. Благодаря сочетанию трех видов считывающих устройств у&#160;беспилотного автомобиля нет слепых зон&#160;&#8212; он&#160;видит все, что происходит вокруг него' },
    { title: 'Радары', description: 'Помогают автомобилю сориентироваться в&#160;пространстве: определяют расстояние до&#160;ближайших объектов, оценивают их&#160;скорость и&#160;направление движения. С&#160;помощью радаров беспилотный автомобиль видит окружающий мир в&#160;3D' },
    { title: 'Лидары', description: 'Беспрерывно сканируют пространство миллионами лазерных лучей&#160;&#8212; так получается карта с&#160;невероятной детализацией. Радары &#171;видят&#187; объемное пространство, а&#160;лидары делают его детализированным, идентифицируют автомобили, пешеходов и&#160;вообще все, что происходит вокруг.' },
    { title: 'Камеры', description: 'Считывают важную визуальную информацию, например, отличают цвета светофора, распознают знаки и&#160;разметку. Так картинка, которую получает автомобиль, становится завершенной и&#160;ему становится легко ориентироваться в&#160;постоянно меняющейся дорожной обстановке' }
];

const Sensors = () => {
    const cn = useClassnames(style);

    const cssBlock = 'sensors';

    return (
        <GridWrapper className={cn(`${cssBlock}__wrapper`)}>
            <ul className={cn(cssBlock)}>
                {sensors.map(({ title, description }, index) => (
                    <Accordion key={title} title={title} color="white" description={description} headingSize={index === 0 ? 'l' : 's'} withBorderTop={index > 0} />
                ))}
            </ul>

            <Swiper className={cn(`${cssBlock}__swiper`)} slides={sensors} />

        </GridWrapper>
    );
};

export default Sensors;
