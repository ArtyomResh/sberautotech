import Layout from '../components/layout';
import React from 'react';
import style from './public-beta-signup.css';
import { useClassnames } from '../hooks/use-classnames';
import { formatText } from '../utils';
import Heading from '../components/heading';
import Text from '../components/text';
import Card from '../components/card';

const features = [
    'Мы&#160;серьезно относимся к&#160;безопасности наших пассажиров',
    'Все автомобили прошли необходимые тесты, а&#160;для надежности в&#160;салоне будет находиться инженер-испытатель',
    'Вы&#160;можете записаться на&#160;тестирование только если вам уже исполнилось 18&#160;лет, а&#160;ваш +1&#160;может быть любого возраста'
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
        </Layout>
    );
};

export default PublicBetaSignup;
