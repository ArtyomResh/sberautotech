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
    const [cursorPosition, setCursorPosition] = useState({ prevPos: '', actualPos: ECursorPosition.none });
    const [spinner, setSpinner] = useState(true);
    const [cursorCoordinates, setCursorCoordinates] = useState({ currentPositionX: 0, currentPositionY: 0 });
    const [swiper, setSwiper] = useState<any>(null);

    // const header = useFormattedText(data.header);
    const text = useFormattedText(data.text);

    const hoverListener = () => {
        setCursorPosition({ prevPos: cursorPosition.actualPos, actualPos: ECursorPosition.none });
    };

    const onClick = useCallback(() => {
        if(cursorPosition.actualPos === ECursorPosition.right) {
            swiper?.slidePrev();
        } else if(cursorPosition.actualPos === ECursorPosition.left) {
            swiper?.slideNext();
        }
    }, [cursorPosition.actualPos, swiper]);

    const observeCursor = useCallback((e) => {
        const containerWidth = e.target?.closest('.carousel-container')?.clientWidth;

        if(!containerWidth) {
            return;
        }

        const currentPositionX = e.clientX;
        const currentPositionY = e.clientY;
        const { top, bottom } = e.target?.closest('.carousel-container')?.getBoundingClientRect();

        if(currentPositionY < top || currentPositionY > bottom) {
            setCursorPosition({ prevPos: cursorPosition.actualPos, actualPos: ECursorPosition.none });

            return;
        }

        setCursorCoordinates({ currentPositionX, currentPositionY });

        const newCursorPosition = containerWidth / 2 >= cursorCoordinates.currentPositionX ? ECursorPosition.left : ECursorPosition.right;

        if(newCursorPosition !== cursorPosition.actualPos) {
            setCursorPosition({ prevPos: cursorPosition.actualPos, actualPos: newCursorPosition });
        }
    }, [cursorPosition.actualPos, cursorCoordinates]);

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

    useEffect(() => {
        const cursor = document.querySelector('.carousel__cursor');
        const rotator = () => {
            let i = 0;
            const howManyTimes = 180;
            console.log(spinner, '<<<<<<<<<<<<');
            (function f() {
                cursor.style.transform = `rotate(${i}deg)`;
                console.log(i);
                i++;

                if(i < howManyTimes) {
                    setTimeout(f, 0.05);
                    setSpinner(false);
                }
            })();
            i = 0;
            console.log(spinner, i, '>>>>>>>>>>>>>>>');
        };

        if(cursorPosition.prevPos === 'left' && cursorPosition.actualPos === 'right' && spinner) {
            rotator();
        } else if(cursorPosition.prevPos === 'right' && cursorPosition.actualPos === 'left' && spinner) {
            rotator();
        }
    }, [cursorPosition]);

    const elCursor = useMemo(() => {
        return <div className={cn('carousel__cursor', `carousel__cursor_${cursorPosition.actualPos}`)} style={{ top: cursorCoordinates.currentPositionY, left: cursorCoordinates.currentPositionX }}></div>;
    }, [cursorPosition.actualPos, cursorCoordinates]);

    // console.log(cursorPosition);

    return (
        <div
            className={cn('carousel-container', 'carousel')}
            ref={$container}
            onMouseMove={observeCursor}
            onMouseLeave={() => {
                setCursorPosition({ prevPos: cursorPosition.actualPos, actualPos: ECursorPosition.none });
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