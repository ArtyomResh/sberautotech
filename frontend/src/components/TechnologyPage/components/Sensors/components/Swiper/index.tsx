import React, { useRef } from 'react';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper';
import type { Swiper as SwiperT } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { useClassnames } from '../../../../../../hooks/use-classnames';

import Text from '../../../../../text';
import Heading from '../../../../../heading';

import './index.css';

interface ISlide {
    id: string,
    title: string,
    description: string,
}

interface IProps {
    className?: string,
    slides: Array<ISlide>
    onSlideChange?: (slideId: string) => void
}

const Swiper = ({ className, slides, onSlideChange }: IProps) => {
    const swiperRef = useRef<SwiperT>()
    const cn = useClassnames();
    const cssBlock = 'custom-swiper';

    const handleSlideChange = () => {
        const activeSlideIndex = swiperRef?.current?.realIndex

        if (typeof activeSlideIndex === 'number' && activeSlideIndex >= 0) {
            const activeSlideId = slides[activeSlideIndex].id

            onSlideChange?.(activeSlideId); 
        }
    }

    const handleSwiperInstance = (swiper: SwiperT) => {
        swiperRef.current = swiper
    }

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
                onSwiper={handleSwiperInstance}
                onSlideChange={handleSlideChange}
                loop={true}
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
