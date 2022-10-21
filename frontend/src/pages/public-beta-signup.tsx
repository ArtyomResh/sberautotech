import Layout from '../components/layout';
import React from 'react';
import style from './public-beta-signup.css';
import { useClassnames } from '../hooks/use-classnames';
import { formatText } from '../utils';
import Heading from '../components/heading';
import Text from '../components/text';
import Card from '../components/card';
import VideoPlayer from '../components/video-player';

const features = [
    'Мы&#160;серьезно относимся к&#160;безопасности наших пассажиров',
    'Все автомобили прошли необходимые тесты, а&#160;для надежности в&#160;салоне будет находиться инженер-испытатель',
    'Вы&#160;можете записаться на&#160;тестирование только если вам уже исполнилось 18&#160;лет, а&#160;ваш +1&#160;может быть любого возраста'
];

const rules = [
    { imageName: 'two-passengers', text: 'Два пассажирских<br />места', alt: 'Изображение знака с двумя людьми пристёгнутыми ремнём безопасности' },
    { imageName: 'no-pets', text: 'Без питомцев', alt: 'Изображение знака с перечёркнутой лапки животного' },
    { imageName: 'no-photo-inside', text: 'Фото только<br />снаружи', alt: 'Изображение знака с внешним видом автомобиля' },
    { imageName: 'no-drinks', text: 'Без еды<br />и&#160;напитков', alt: 'Изображение знака с перечёркнутым стаканом' },
    { imageName: 'buckle-up', text: 'Пристегнуть<br />ремни', alt: 'Изображение знака с человеком пристёгнутым ремнём безопасности' },
    { imageName: 'no-smoking', text: 'Не&#160;курить', alt: 'Изображение знака с перечёркнутой сигаретой' }
];

const PublicBetaSignup = () => {
    const cn = useClassnames(style);

    return (
        <Layout theme={{ mode: 'dark', logoColor: '#040A0A' }}>
            <div className={cn('public-beta-signup__wrapper')}>
                <h1>Публичное тестирование</h1>
            </div>

            <section className={cn('public-beta-signup__section-wrapper')}>
                <Heading
                    className={cn('public-beta-signup__features-title')}
                    level={2}
                    dangerouslySetInnerHTML={{ __html: formatText('С&#160;нами {безопасно<br />и&#160;комфортно!}') }}
                />

                <Text className={cn('public-beta-signup__features-subtitle')} size={4}>
                    Сейчас расскажем самое главное<br />и&#160;договоримся о&#160;правилах
                </Text>

                <ul className={cn('public-beta-signup__features-list')}>
                    {features.map((feature, index) => (
                        <Card key={index} className={cn('public-beta-signup__features-list-item')} as="li">
                            {formatText(feature)}
                        </Card>
                    ))}
                </ul>
            </section>

            <section className={cn('public-beta-signup__section-wrapper')}>
                <Heading
                    className={cn('public-beta-signup__rules-title')}
                    level={2}
                    dangerouslySetInnerHTML={{ __html: formatText('А&#160;вот простые {правила для пассажиров}') }}
                />

                <ul className={cn('public-beta-signup__rules-list')}>
                    {rules.map((rule, index) => (
                        <li key={index} className={cn('public-beta-signup__rules-list-item')}>
                            <figure className={cn('public-beta-signup__rule')}>
                                <img
                                    className={cn('public-beta-signup__rule-image')}
                                    srcSet={`/rules/${rule.imageName}/${rule.imageName}@1x.png 1x, /rules/${rule.imageName}/${rule.imageName}@2x.png 2x`}
                                    src={`/rules/${rule.imageName}/${rule.imageName}@3x.png`}
                                    alt={rule.alt}
                                />
                                <Text
                                    className={cn('public-beta-signup__rule-caption')}
                                    size={4}
                                    as="figcaption"
                                    dangerouslySetInnerHTML={{ __html: formatText(rule.text) }}
                                />

                            </figure>
                        </li>

                    ))}
                </ul>

            </section>

            <section>
                <div className={cn('public-beta-signup__section-wrapper')}>
                    <Heading
                        className={cn('public-beta-signup__video-title')}
                        level={2}
                        dangerouslySetInnerHTML={{ __html: formatText('Посмотрите, как выглядит {поездка на&#160;беспилотнике}') }}
                    />
                </div>

                <VideoPlayer
                    className={cn('public-beta-signup__video-player')}
                    videoFileName="pmef_test"
                    poster="/spb_back.jpg"
                    preload="none"
                    loop={true}
                />
            </section>
        </Layout>
    );
};

export default PublicBetaSignup;