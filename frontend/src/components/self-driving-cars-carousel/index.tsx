import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
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
    none = 'none',
    left = 'left',
    right = 'right'
}

const Carousel: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const $container = useRef<HTMLDivElement>(null);
    const [cursorPosition, setCursorPosition] = useState({ prev: '', actual: ECursorPosition.none });
    const [cursorCoordinates, setCursorCoordinates] = useState({ currentPositionX: 0, currentPositionY: 0 });
    const [swiper, setSwiper] = useState<any>(null);

    const header = useFormattedText(data.header);
    const text = useFormattedText(data.text);

    const hoverListener = () => {
        setCursorPosition({ prev: cursorPosition.actual, actual: ECursorPosition.none });
    };

    const onClick = useCallback(() => {
        if(cursorPosition.actual === ECursorPosition.right) {
            swiper?.slidePrev();
        } else if(cursorPosition.actual === ECursorPosition.left) {
            swiper?.slideNext();
        }
    }, [cursorPosition.actual, swiper]);

    const observeCursor = useCallback((e) => {
        const containerWidth = e.target?.closest('.carousel-container')?.clientWidth;

        if(!containerWidth) {
            return;
        }

        const currentPositionX = e.clientX;
        const currentPositionY = e.clientY;
        const { top, bottom } = e.target?.closest('.carousel-container')?.getBoundingClientRect();

        if(currentPositionY < top || currentPositionY > bottom) {
            setCursorPosition({ prev: cursorPosition.actual, actual: ECursorPosition.none });

            return;
        }

        setCursorCoordinates({ currentPositionX, currentPositionY });

        const newCursorPosition = containerWidth / 2 >= cursorCoordinates.currentPositionX ? ECursorPosition.left : ECursorPosition.right;

        if(newCursorPosition !== cursorPosition.actual) {
            setCursorPosition({ prev: cursorPosition.actual, actual: newCursorPosition });
        }
    }, [cursorPosition.actual, cursorCoordinates]);

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
        window.addEventListener('scroll', hoverListener);

        return () => {
            window.removeEventListener('scroll', hoverListener);
        };
    }, []);

    // useEffect(() => {
    //     const cursor = document.querySelector('.carousel__cursor');
    //     const rotator = (direction) => {
    //         let deg;

    //         if(direction === 'left') {

    //         }
    //     };

    //     if(cursorPosition.actual === 'left') {
    //         rotator(cursorPosition);
    //     } else if(cursorPosition.actual === 'right') {
    //         // rotator(cursorPosition);
    //     }
    // }, [cursorPosition]);

    const elCursor = useMemo(() => {
        return <div className={cn('carousel__cursor', `carousel__cursor_${cursorPosition.actual}`)} style={{ top: cursorCoordinates.currentPositionY, left: cursorCoordinates.currentPositionX }}></div>;
    }, [cursorPosition.actual, cursorCoordinates]);

    console.log(cursorPosition);
    

    return (
        <div
            className={cn('carousel-container', 'carousel')}
            ref={$container}
            onMouseMove={observeCursor}
            onClick={onClick}
        >
            {elCursor}
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