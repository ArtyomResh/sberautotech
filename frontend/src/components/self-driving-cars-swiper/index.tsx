import React, {useEffect} from 'react';
import Swiper from 'swiper';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';
import 'swiper/swiper-bundle.css';

interface IProps {
    data: any
}

const swiper = new Swiper('.swiper', {
    loop: true
});

const SwiperComponent: React.FC<IProps> = ({data}) => {
    const cn = useClassnames(style)

    useEffect(() => {
        // const swiper = new Swiper('.swiper-container', {
        //     slidesPerView: 1,
        //     spaceBetween: 30,
        //     loop: true,
        // });

        // return () => {
        //     swiper.destroy()
        // }
    },[])

    console.log(data)

    return (
        <div className={cn('swiper')}>
                {data.map((slide: any) => (
                    <div className={cn('swiper__slide')}>
                        <img src={slide.image.publicURL} className={cn('swiper__slide-img')} />
                        <h3 className={cn('swiper__slide-heading')}>{slide.header}</h3>
                        <p className={cn('swiper__slide-text')}>{slide.text}</p>
                    </div>
                ))}
        </div>
    )
}

export default SwiperComponent