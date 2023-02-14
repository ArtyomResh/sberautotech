import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import GridWrapper from '../../../grid-wrapper';

import Accordion from '../Accordion';

import style from './index.css';
import Swiper from './components/Swiper';

const sensors = [
    { title: 'Набор сенсоров', description: 'Радары, лидары и камеры непрерывно считывают ситуацию на дороге. Благодаря сочетанию трех видов считывающих устройств у беспилотного автомобиля нет слепых зон — он видит все, что происходит вокруг него' },
    { title: 'Радары', description: 'Помогают автомобилю сориентироваться в пространстве: определяют расстояние до ближайших объектов, оценивают их скорость и направление движения. С помощью радаров беспилотный автомобиль видит окружающий мир в 3D' },
    { title: 'Лидары', description: 'Беспрерывно сканируют пространство миллионами лазерных лучей — так получается карта с невероятной детализацией. Радары «видят» объемное пространство, а лидары делают его детализированным, идентифицируют автомобили, пешеходов и вообще все, что происходит вокруг.' },
    { title: 'Камеры', description: 'Считывают важную визуальную информацию, например, отличают цвета светофора, распознают знаки и разметку. Так картинка, которую получает автомобиль, становится завершенной и ему становится легко ориентироваться в постоянно меняющейся дорожной обстановке' }
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
