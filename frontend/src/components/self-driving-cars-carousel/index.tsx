import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import Swiper from 'swiper';

import { useClassnames } from '../../hooks/use-classnames';
import useFormattedText from '../../hooks/use-formatted-text';

import CursorRight from '../../images/cursor-right.inline.svg';
import CursorLeft from '../../images/cursor-left.inline.svg';

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

enum ECursorDirection {
    none = 'none',
    left = 'left',
    right = 'right'
}

const Carousel: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const $container = useRef<HTMLDivElement>(null);
    const [cursorDirection, setCursorDirection] = useState({ prevDir: '', actualDir: ECursorDirection.none });
    const [cursorCoordinates, setCursorCoordinates] = useState({ currentCoordinateX: 0, currentCoordinateY: 0 });
    const [swiper, setSwiper] = useState<any>(null);

    const text = useFormattedText(data.text);

    const hoverListener = () => {
        setCursorDirection({ prevDir: cursorDirection.actualDir, actualDir: ECursorDirection.none });
    };

    const onClick = useCallback(() => {
        if(cursorDirection.actualDir === ECursorDirection.right) {
            swiper?.slidePrev();
        } else if(cursorDirection.actualDir === ECursorDirection.left) {
            swiper?.slideNext();
        }
    }, [cursorDirection.actualDir, swiper]);

    const observeCursor = useCallback((e) => {
        const containerWidth = e.target?.closest('.carousel-container')?.clientWidth;

        if(!containerWidth) {
            return;
        }

        const currentCoordinateX = e.clientX;
        const currentCoordinateY = e.clientY;
        const { top, bottom } = e.target?.closest('.carousel-container')?.getBoundingClientRect();

        if(currentCoordinateY < top || currentCoordinateY > bottom) {
            setCursorDirection({ prevDir: cursorDirection.actualDir, actualDir: ECursorDirection.none });

            return;
        }

        setCursorCoordinates({ currentCoordinateX, currentCoordinateY });

        const newCursorPosition = containerWidth / 2 >= cursorCoordinates.currentCoordinateX ? ECursorDirection.left : ECursorDirection.right;

        if(newCursorPosition !== cursorDirection.actualDir) {
            setCursorDirection({ prevDir: cursorDirection.actualDir, actualDir: newCursorPosition });
        }
    }, [cursorDirection.actualDir, cursorCoordinates]);

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

    const elCursor = useMemo(() => {
        return (
            <div className={cn('carousel__cursor', `carousel__cursor_${cursorDirection.actualDir}`)} style={{ top: cursorCoordinates.currentCoordinateY, left: cursorCoordinates.currentCoordinateX }}>
                {cursorDirection.actualDir === 'right' ? <CursorRight /> : <CursorLeft />}
            </div>);
    }, [cursorDirection.actualDir, cursorCoordinates]);

    return (
        <div
            className={cn('carousel-container', 'carousel')}
            ref={$container}
            onMouseMove={observeCursor}
            onMouseLeave={() => {
                setCursorDirection({ prevDir: cursorDirection.actualDir, actualDir: ECursorDirection.none });
            }}
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