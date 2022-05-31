import React, { useRef, useState, useMemo } from 'react';
import { Link } from 'gatsby';

// import { graphql, useStaticQuery } from 'gatsby';

import { useClassnames } from '../hooks/use-classnames';
import useWindowSize from '../hooks/use-window-resize';
import useDocumentScrollThrottled from '../components/nav/use-document-scroll-throttled';

import video from '../static/krest.mp4';
import img from '../images/pmef/back_v1.png';

import LogoWhite from '../images/logo-white.inline.svg';
import Arrow from '../images/pmef/arrow.inline.svg';
import Flag from '../images/pmef/flag.inline.svg';
import Lent from '../images/pmef/lent.inline.svg';
import NoAlk from '../images/pmef/no-alk.inline.svg';
import NoPet from '../images/pmef/no-pet.inline.svg';
import NoSmok from '../images/pmef/no-smok.inline.svg';
import OutPhoto from '../images/pmef/out-photo.inline.svg';

import Button from '../components/button';
import Layout from '../components/layout';

import style from './pmef-landing-page.css';

// const query = graphql`
//   query {
//     allStrapiPmefLandingPage {
//     edges {
//       node {
//         background {
//           localFile {
//             url
//           }
//         }
//         video {
//           localFile {
//             url
//           }
//         }
//       }
//     }
//     }
//   }
// `;

const PmefLandingPage = () => {
    const cn = useClassnames(style);
    // const [width, height] = useWindowSize();
    const [shouldAddShadow, setShouldAddShadow] = useState(false);
    // const data = useStaticQuery(query);
    // const { video, background } = data.allStrapiPmefLandingPage.edges[0].node;

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

    const elLabels = () => {
        const root = document.documentElement;

        const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elements-displayed');
        console.log(marqueeElementsDisplayed);
        
        const marqueeContent = document.querySelector('ul.marquee-content');

        console.log(marqueeElementsDisplayed, marqueeContent);


        root.style.setProperty('--marquee-elements', marqueeContent?.children.length);

        for(let i = 0; i < marqueeElementsDisplayed; i++) {
            marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
        }

        return (
            <ul className={cn('marquee-content')}>
                {labelCorousel?.map((label, i) => <li className={cn(`pmef-landing-page__label_${i}`)} key={i}>{label}</li>)}
            </ul>);
    };

    const elIcons = useMemo(() => icons?.map(({ icon, label }, i) => {
        return (
            <div className={cn('pmef-landing-page__icon-block')} key={i}>
                {icon}
                <label className={cn('pmef-landing-page__icon-label')}>
                    {label}
                </label>
            </div>
        );
    }), []);

    const elButtonBlock = useMemo(() => (
        <React.Fragment>
            <Button className={cn('pmef-landing-page__button', 'pmef-landing-page__test-button')} label="Записаться на тестирование" />
            <Button className={cn('pmef-landing-page__button', 'pmef-landing-page__response-button')} label="Оставить отзыв" />
        </React.Fragment>
    ), []);

    return (
        <Layout type="pmef-landing-page" >
            <div className={cn('pmef-landing-page')}>
                <div className={cn('pmef-landing-page__first-section')}>
                    <img className={cn('pmef-landing-page__background-image')} src={img} />
                    <nav className={cn('pmef-landing-page__header', {
                        'pmef-landing-page__header_shadow': shouldAddShadow
                    })}
                    >
                        <LogoWhite className={cn('pmef-landing-page__logo')} />
                        <div className={cn('pmef-landing-page__header-button-block')}>
                            {elButtonBlock}
                        </div>
                    </nav>
                    <div className={cn('pmef-landing-page__content-wrapper')}>
                        <div className={cn('pmef-landing-page__middle-block')}>
                            <p className={cn('pmef-landing-page__big-title', 'pmef-landing-page__1')}>Приглашаем на <p>открытое тестирование беспилотников</p> SberAutoTech в Санкт-Петербурге</p>
                            <p className={cn('pmef-landing-page__small-title', 'pmef-landing-page__2')}>Прокатим по дорогам города и покажем, как работает технология автономного вождения</p>
                            <p className={cn('pmef-landing-page__big-title', 'pmef-landing-page__date')}>15–18 июня</p>
                            <p className={cn('pmef-landing-page__big-title')}>12:00–24:00</p>
                        </div>
                        <div className={cn('pmef-landing-page__mob-button-block')}>
                            {elButtonBlock}
                        </div>
                        <img className={cn('pmef-landing-page__background-image-mob')} src={img} />
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
                    <p className={cn('pmef-landing-page__big-title', 'pmef-landing-page__3')}>Кстати, <p>про заезд</p></p>
                    <div className={cn('pmef-landing-page__icons-block')}>
                        {elIcons}
                    </div>
                    <p className={cn('pmef-landing-page__big-title', 'pmef-landing-page__4')}><p>Sber Automotive Technologies —</p> компания, занимающаяся разработкой беспилотных технологий в экосистеме Сбера</p>
                    <Link className={cn('pmef-landing-page__link')} to="https://sberautotech.ru/" children="sberautotech.ru" />
                    <div className={cn('pmef-landing-page__title-block')}>
                        <p className={cn('pmef-landing-page__mid-title')}>Ключевые направления</p>
                        <div className={cn('marquee')}>
                            {elLabels()}
                        </div>
                        <p className={cn('pmef-landing-page__small-title', 'pmef-landing-page__5')}>Технологии SberAutoTech универсальны и легко адаптируются к разным видам транспорта и сценариям использования: пассажирские поездки, беспилотные грузовые перевозки, доставка</p>
                    </div>
                    {/* <div className={cn('marquee')}>
                        {elLabels()}
                    </div> */}
                </div>
                <div className={cn('pmef-landing-page__third-section')}>
                    <video className={cn('pmef-landing-page__video')} controls={true}>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            </div>
        </Layout>
    );
};

export default PmefLandingPage;
