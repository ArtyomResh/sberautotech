import React from 'react';
import HeadingBanner from './components/HeadingBanner';
import bannerImg from '../../../../../static/technology/banner.jpg';

export const TechnologyBanner: React.FC = () => {
    return (
        <HeadingBanner
            title="Будущее наступает сейчас"
            description="Мы&nbsp;создаем технологию, которая изменит мир. Доставка грузов станет быстрее и&nbsp;эффективнее, такси&nbsp;&mdash; безопаснее, а&nbsp;облик городов изменится вместе с&nbsp;транспортом"
            image={bannerImg}
        />
    );
};
