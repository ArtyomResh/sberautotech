import React, { useCallback, useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
// import GetCursorPosition from 'cursor-position';

import { useClassnames } from '../../hooks/use-classnames';
import useFormattedText from '../../hooks/use-formatted-text';

import style from './index.css';

interface IProps {
    data: ISlider
}

export interface ILocalFile {
    localFile: {
        publicURL: string
    }
}

interface ISlider {
    id?: number,
    header?: string,
    header_position?: string,
    text?: string,
    text_position?: string,
    slider_items: Array<ILocalFile>
}

enum ECursorPosition {
    left = 'left',
    right = 'right'
}

const Carousel: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const $container = useRef<HTMLDivElement>(null);
    const [cursorPosition, setCursorPosition] = useState(ECursorPosition.left);
    const [cursorCoordinates, setCursorCoordinates] = useState({ currentPositionX: 0, currentPositionY: 0, scroll: 0 });
    // const [scroll, setScroll] = useState(0);
    const [swiper, setSwiper] = useState<any>(null);

    const header = useFormattedText(data.header);
    const text = useFormattedText(data.text);

    const onClick = useCallback(() => {
        if(cursorPosition === ECursorPosition.right) {
            swiper?.slidePrev();
        } else if(cursorPosition === ECursorPosition.left) {
            swiper?.slideNext();
        }
    }, [cursorPosition, swiper]);

    const observeCursor = useCallback((e) => {
        const containerWidth = e.target.clientWidth;
        // const currentPositionX = e.clientX;
        // const currentPositionY = e.clientY;

        // console.log(e.pageYOffset);


        // console.log('scroll', scroll, 'cursor', currentPositionY);


        // currentPositionY = Number(currentPositionY);
        // currentPositionY = Number(currentPositionY) + (Number(currentPositionY) - scroll);
        // const cursorEl = document.querySelector('.carousel__cursor');
        // console.log(e);


        // console.log(cursorEl.style.top = `${currentPositionY}px`);
        // console.log(cursorEl.style.left = `${currentPositionX}px`);

        // cursorEl.style.top = currentPositionX;


        setCursorCoordinates({ currentPositionX: e.clientX, currentPositionY: e.clientY });

        // console.log(cursorCoordinates);


        const newCursorPosition = containerWidth / 2 >= cursorCoordinates.currentPositionX ? ECursorPosition.right : ECursorPosition.left;

        if(newCursorPosition !== cursorPosition) {
            setCursorPosition(newCursorPosition);
        }
    }, [cursorPosition]);

    useEffect(() => {
        if($container.current) {
            const swiper = new Swiper($container.current, {
                loop          : true,
                centeredSlides: true,
                slidesPerView : 1,
                spaceBetween  : 0
            });

            setSwiper(swiper);

            return () => {
                swiper.destroy();
            };
        }
    }, []);

    useEffect(() => {
        // document.addEventListener('mousemove', (e) => {
        //     // setScroll(window.pageYOffset);
        //     console.log(e.clientX, e.clientY);


        //     setCursorCoordinates({ ...cursorCoordinates, currentPositionX: e.clientX, currentPositionY: e.clientY });
        // });

        document.addEventListener('scroll', () => {
            // console.log(window.pageYOffset);
            // setScroll(window.pageYOffset);
            setCursorCoordinates(cursorCoordinates.scroll: window.pageYOffset);
            console.log(cursorCoordinates.scroll);
        });


        // console.log(scroll, cursorCoordinates);


        // console.log(container);

        // body.addEventListener('mousemove', () => {

        // });
        // setScroll(window.pageYOffset);

        // document.body.addEventListener('scroll', (e) => {
        //     console.log(e.clientY);
        // });

        // console.log('scroll', scroll, 'cursor', cursorCoordinates.currentPositionY);
    }, [cursorCoordinates.scroll]);

    return (
        <div
            className={cn('carousel-container', 'carousel', `carousel_${cursorPosition}`)}
            ref={$container}
            onMouseMove={observeCursor}
            onClick={onClick}
        >
            <div className={cn('carousel__cursor')} style={{ top: cursorCoordinates.currentPositionY, left: cursorCoordinates.currentPositionX }}></div>
            {text && (
                <p
                    className={cn('carousel__text',
                        {
                            [`carousel__text_${data.text_position?.replace('_', '-')}`]: data.text_position
                        }
                    )}
                    dangerouslySetInnerHTML={{ __html: text }}
                />
            )}
            <div className={cn('swiper-wrapper')}>
                {data.slider_items.map((slide, i) => (
                    <div key={i} className={cn('swiper-slide', 'carousel__slide')}>
                        <div className={cn('carousel__slide-container')}>
                            <div className={cn('carousel__img-container')}>
                                <img className={cn('carousel__img')} src={slide.localFile.publicURL} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;