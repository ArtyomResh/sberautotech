import React from 'react';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { useClassnames } from '../../../../../../hooks/use-classnames';

import Text from '../../../../../text';
import Heading from '../../../../../heading';

import './index.css';

interface ISlide {
    title: string,
    description: string
}

interface IProps {
    className?: string,
    slides: Array<ISlide>
}

const Swiper = ({ className, slides }: IProps) => {
    const cn = useClassnames();
    const cssBlock = 'custom-swiper';

    return (
        <div className={cn(className, `${cssBlock}__swiper-wrapper`)}>
            <div className={cn(`${cssBlock}__swiper-pagination`)} />

            <SwiperReact
                className={cn(`${cssBlock}__swiper`)}
                modules={[Pagination, EffectFade]}
                pagination={{
                    clickable   : true,
                    el          : `.${cn(`${cssBlock}__swiper-pagination`)}`,
                    renderBullet: function(index, className) {
                        return `<span class="${className}"></span>`;
                    }
                }}
                loop={true}
                effect="fade"
            >
                {slides.map(({ title, description }, index) => (
                    <SwiperSlide key={title}>
                        <div className={cn(`${cssBlock}__swiper-slide`)}>
                            <Heading className={cn(`${cssBlock}__swiper-slide-title`)} level={index === 0 ? 2 : 4}>
                                {title}
                            </Heading>


                            <Text
                                className={cn(`${cssBlock}__swiper-slide-description`)}
                                dangerouslySetInnerHTML={{ __html: description }}
                                size={4}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </SwiperReact>
        </div>
    );
};

export default Swiper;
