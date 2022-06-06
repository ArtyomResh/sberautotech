import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';
import useDocumentScrollThrottled from '../components/nav/use-document-scroll-throttled';

import LogoWhite from '../images/logo-white.inline.svg';
import Arrow from '../images/pmef/arrow.inline.svg';
import Flag from '../images/pmef/flag.inline.svg';
import Lent from '../images/pmef/lent.inline.svg';
import NoAlk from '../images/pmef/no-alk.inline.svg';
import NoPet from '../images/pmef/no-pet.inline.svg';
import NoSmok from '../images/pmef/no-smok.inline.svg';
import OutPhoto from '../images/pmef/out-photo.inline.svg';
import PlayButton from '../images/pmef/play-button.inline.svg';

import Button from '../components/button';
import Layout from '../components/layout';

import style from './pmef-landing-page.css';

const PmefLandingPage = () => {
    const cn = useClassnames(style);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldAddShadow, setShouldAddShadow] = useState(false);
    const [play, setPlay] = useState<boolean>(false);
    const videoLink = '/krest_compressed.mp4';
    const imgLink = '/background.jpg';

    const TIMEOUT_DELAY = 0;
    const MINIMUM_SCROLL = 5;

    const icons = [
        { icon: <Flag />, label: 'Бесплатно' },
        { icon: <Lent />, label: 'Пристегнуть ремни' },
        { icon: <OutPhoto />, label: 'Фото только снаружи' },
        { icon: <NoAlk />, label: 'Без еды и напитков' },
        { icon: <NoPet />, label: 'Без питомцев' },
        { icon: <NoSmok />, label: 'Не курить' }
    ];

    const labelCorousel = ['Автономное вождение', 'Электромобиль ФЛИП', 'Интеграция с V2X и V2V', 'Управление флотом', 'Пассажирские сервисы', 'Пользовательские приложения'];

    useDocumentScrollThrottled(({ currentScrollTop }) => {
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        setTimeout(() => {
            setShouldAddShadow(isMinimumScrolled);
        }, TIMEOUT_DELAY);
    });

    const toggleVideo = useCallback(() => {
        if(videoRef.current) {
            if(videoRef.current.paused) {
                void videoRef.current.play().then(() => setPlay(true));

                return;
            }

            videoRef.current.pause();
            setPlay(false);
        }
    }, []);

    return (
        <Layout type="pmef-landing-page" >
            <div className={cn('pmef-landing-page')}>
                <div className={cn('pmef-landing-page__first-section')}>
                    <img className={cn('pmef-landing-page__background-image')} src={imgLink} />
                    <nav className={cn('pmef-landing-page__header', {
                        'pmef-landing-page__header_shadow': shouldAddShadow
                    })}
                    >
                        <LogoWhite className={cn('pmef-landing-page__logo')} />
                        <div className={cn('pmef-landing-page__header-button-block')}>
                            <Button className={cn('pmef-landing-page__button', 'pmef-landing-page__test-button')} label="Записаться на тестирование" />
                            <Button className={cn('pmef-landing-page__button', 'pmef-landing-page__response-button')} label="Оставить отзыв" />
                        </div>
                    </nav>
                    <div className="pmef-landing-page__content-wrapper">
                        <div className="pmef-landing-page__middle-block">
                            <p className="pmef-landing-page__big-title pmef-landing-page__1">Приглашаем на <span>открытое тестирование беспилотников</span> SberAutoTech в Санкт-Петербурге</p>
                            <p className="pmef-landing-page__small-title pmef-landing-page__2">Прокатим по дорогам города и покажем, как работает технология автономного вождения</p>
                            <p className="pmef-landing-page__big-title pmef-landing-page__date">15–18 июня</p>
                            <p className="pmef-landing-page__big-title">12:00–24:00</p>
                        </div>
                        <div className={cn('pmef-landing-page__mob-button-block')}>
                            <Button className={cn('pmef-landing-page__button', 'pmef-landing-page__test-button')} label="Записаться на тестирование" />
                            <Button className={cn('pmef-landing-page__button', 'pmef-landing-page__response-button')} label="Оставить отзыв" />
                        </div>
                        <img className={cn('pmef-landing-page__background-image-mob')} src={imgLink} />
                        <div className={cn('pmef-landing-page__bottom-block')}>
                            <div className={cn('pmef-landing-page__text-block', 'pmef-landing-page__text-block_grid-c')}>
                                <p className={cn('pmef-landing-page__small-title')}>Адрес</p>
                                <p className={cn('pmef-landing-page__big-title')}>Крестовский остров, Р21</p>
                            </div>
                            <div className={cn('pmef-landing-page__text-block', 'pmef-landing-page__text-block_grid-a')}>
                                <p className={cn('pmef-landing-page__small-title')}>Протяженность</p>
                                <p className={cn('pmef-landing-page__big-title')}>4,5 км</p>
                            </div>
                            <div className={cn('pmef-landing-page__text-block', 'pmef-landing-page__text-block_grid-b')}>
                                <p className={cn('pmef-landing-page__small-title')}>Время в пути</p>
                                <p className={cn('pmef-landing-page__big-title')}>12 мин</p>
                            </div>
                            <Arrow className={cn('pmef-landing-page__arrow-icon')} />
                        </div>
                    </div>
                </div>
                <div className={cn('pmef-landing-page__second-section')}>
                    <p className={cn('pmef-landing-page__big-title', 'pmef-landing-page__3')}>Кстати, <span>про заезд</span></p>
                    <div className={cn('pmef-landing-page__icons-block')}>
                        {
                            icons?.map(({ icon, label }, i) => {
                                return (
                                    <div className={cn('pmef-landing-page__icon-block')} key={i}>
                                        {icon}
                                        <label className={cn('pmef-landing-page__icon-label')}>
                                            {label}
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <p className="pmef-landing-page__big-title pmef-landing-page__4"><span>Sber Automotive Technologies —</span><br /> компания, занимающаяся разработкой беспилотных технологий в экосистеме Сбера</p>
                    <Link className={cn('pmef-landing-page__link')} to="https://sberautotech.ru/" children="sberautotech.ru" />
                    <div className={cn('pmef-landing-page__title-block')}>
                        <p className={cn('pmef-landing-page__mid-title')}>Ключевые направления</p>
                        <ul className={cn('pmef-landing-page__label-corousel_mob')}>
                            {labelCorousel?.map((label, i) => (
                                <li className={cn('pmef-landing-page__label', `pmef-landing-page__label_${i}`)} key={i}>{label}</li>
                            ))}
                        </ul>
                        <p className={cn('pmef-landing-page__small-title', 'pmef-landing-page__5')}>Технологии SberAutoTech универсальны и легко адаптируются к разным видам транспорта и сценариям использования: пассажирские поездки, беспилотные грузовые перевозки, доставка</p>
                    </div>
                    <ul className={cn('pmef-landing-page__label-corousel')}>
                        {labelCorousel?.map((label, i) => (
                            <li className={cn('pmef-landing-page__label', `pmef-landing-page__label_${i}`)} key={i}>{label}</li>
                        ))}
                    </ul>
                </div>
                <div className={cn('pmef-landing-page__third-section')} onClick={toggleVideo}>
                    <div className={cn('pmef-landing-page__video-wrapper')}>
                        <PlayButton className={cn('pmef-landing-page__play-button', { 'pmef-landing-page__play-button_hidden': play })} />
                        <video
                            className={cn('pmef-landing-page__video')}
                            src={videoLink}
                            loop={true}
                            ref={videoRef}
                        >
                        </video>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PmefLandingPage;
