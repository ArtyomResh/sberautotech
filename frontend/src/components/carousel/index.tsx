import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import Swiper from 'swiper';

import { useClassnames } from '../../hooks/use-classnames';
import useFormattedText from '../../hooks/use-formatted-text';
import { toUnescapedHTML } from '../../utils';

import CursorRight from '../../images/cursor-right.inline.svg';
import CursorLeft from '../../images/cursor-left.inline.svg';

import style from './index.css';

interface IProps {
    data: ISlider
}

export interface ILocalFile {
    localFile: {
        url: string
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

enum ECursorDirection {
    none = 'none',
    left = 'left',
    right = 'right'
}

const Carousel: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const containerRef = useRef<HTMLDivElement>(null);
    const [cursorDirection, setCursorDirection] = useState({ prev: '', actual: ECursorDirection.none });
    const [cursorCoordinates, setCursorCoordinates] = useState({ сoordinateX: 0, сoordinateY: 0 });
    const [isAnimation, setIsAnimation] = useState<boolean>(false);
    const [swiper, setSwiper] = useState<Swiper | null>(null);

    const header = useFormattedText(data.header);

    const hoverListener = () => {
        setCursorDirection({ prev: cursorDirection.actual, actual: ECursorDirection.none });
    };

    const onClick = useCallback(() => {
        if(cursorDirection.actual === ECursorDirection.right) {
            swiper?.slideNext();
        } else if(cursorDirection.actual === ECursorDirection.left) {
            swiper?.slidePrev();
        }
    }, [cursorDirection.actual, swiper]);

    const observeCursor = useCallback((e) => {
        const containerWidth = e.target?.closest('.carousel-container')?.clientWidth;

        if(!containerWidth) {
            return;
        }

        const сoordinateX = e.clientX;
        const сoordinateY = e.clientY;
        const { top, bottom } = e.target?.closest('.carousel-container')?.getBoundingClientRect();

        if(сoordinateY < top || сoordinateY > bottom) {
            setCursorDirection({ prev: cursorDirection.actual, actual: ECursorDirection.none });

            return;
        }

        setCursorCoordinates({ сoordinateX, сoordinateY });

        const newCursorDirection = containerWidth / 2 >= cursorCoordinates.сoordinateX ? ECursorDirection.left : ECursorDirection.right;

        if(newCursorDirection !== cursorDirection.actual) {
            setCursorDirection({ prev: cursorDirection.actual, actual: newCursorDirection });
        }
    }, [cursorDirection.actual, cursorCoordinates]);

    useEffect(() => {
        if((cursorDirection.actual === 'left' || cursorDirection.actual === 'right') && cursorDirection.prev === 'none') {
            setIsAnimation(true);
        }

        return () => {
            setIsAnimation(false);
        };
    }, [cursorDirection]);

    useEffect(() => {
        if(containerRef.current) {
            const swiper = new Swiper(containerRef.current, {
                loop          : true,
                centeredSlides: true,
                slidesPerView : 1,
                spaceBetween  : 0
            });

            setSwiper(swiper);

            return () => {
                swiper.destroy(true, true);
            };
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', hoverListener);

        return () => {
            window.removeEventListener('scroll', hoverListener);
        };
    }, []);

    const elCursor = useMemo(() => {
        return (
            <div
                className={cn('carousel__cursor', `carousel__cursor_${cursorDirection.actual}`, { 'carousel__cursor_no-animation': isAnimation })}
                style={{ top: cursorCoordinates.сoordinateY, left: cursorCoordinates.сoordinateX }}
            >
                {cursorDirection.actual === 'right' ? <CursorRight /> : <CursorLeft />}
            </div>);
    }, [cursorDirection.actual, cursorCoordinates]);

    return (
        <div
            className={cn('swiper', 'carousel-container', 'carousel')}
            ref={containerRef}
            onMouseMove={observeCursor}
            onMouseLeave={() => {
                setCursorDirection({ prev: cursorDirection.actual, actual: ECursorDirection.none });
            }}
            onClick={onClick}
        >
            <div className={cn('swiper-wrapper')} key="swiper-wrapper">
                {data.slider_items.map((slide, i) => (
                    <div key={i} className={cn('swiper-slide', 'carousel__slide')}>
                        <div className={cn('carousel__slide-container')}>
                            <div className={cn('carousel__img-container')}>
                                <img className={cn('carousel__img')} src={slide.localFile.url} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {elCursor}
            {header && (
                <p
                    className={cn('carousel__header',
                        {
                            [`carousel__header_${data.header_position?.replace('_', '-')}`]: data.header_position
                        }
                    )}
                >
                    {toUnescapedHTML(header)}
                </p>
            )}
        </div>
    );
};

export default Carousel;
