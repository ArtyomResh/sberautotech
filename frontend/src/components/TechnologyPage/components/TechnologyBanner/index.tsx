import React from 'react';
import HeadingBanner from './components/HeadingBanner';
import bannerImg from '../../../../../static/technology/banner.jpg';
import bannerImgT from '../../../../../static/technology/banner-tablet.jpeg';

export const TechnologyBanner: React.FC = () => {
    return (
        <HeadingBanner
            title="Технология, которая изменит мир"
            description="Мы&nbsp;создаем технологию, которая изменит мир. Доставка грузов станет быстрее и&nbsp;эффективнее, такси&nbsp;&mdash; безопаснее, а&nbsp;облик городов изменится вместе с&nbsp;транспортом"
            image={{
                // передать правильные изображения для всех размеров https://jira.csssr.io/browse/SBER-262
                desktop: bannerImg,
                tablet : bannerImgT
            }}
        />
    );
};
