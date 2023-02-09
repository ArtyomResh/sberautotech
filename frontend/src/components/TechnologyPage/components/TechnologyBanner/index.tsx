import React from 'react';
import HeadingBanner from './components/HeadingBanner';
import bannerImg from '../../../../../static/technology/banner.jpg';

export const TechnologyBanner: React.FC = () => {
    return (
        <HeadingBanner
            title="Будущее наступает сейчас"
            description="Мы создаем технологию, которая изменит мир. Доставка грузов станет быстрее и эффективнее, такси - безопаснее, а облик городов изменится вместе с транспортом"
            image={bannerImg}
        />
    );
};
