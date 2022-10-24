import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import Heading from '../../../heading';
import Text from '../../../text';
import GridWrapper from '../grid-wrapper';

import Card from './components/card';
import style from './index.css';

const features = [
    'Мы&#160;серьезно относимся к&#160;безопасности наших пассажиров',
    'Все автомобили прошли необходимые тесты, а&#160;для надежности в&#160;салоне будет находиться инженер-испытатель',
    'Вы&#160;можете записаться на&#160;тестирование только если вам уже исполнилось 18&#160;лет, а&#160;ваш +1&#160;может быть любого возраста'
];

const FeaturesSection = () => {
    const cn = useClassnames(style);

    return (
        <GridWrapper as="section">
            <Heading
                className={cn('features-section__title')}
                level={2}
                dangerouslySetInnerHTML={{ __html: formatText('С&#160;нами {безопасно<br />и&#160;комфортно!}') }}
            />

            <Text className={cn('features-section__subtitle')} size={4}>
                Сейчас расскажем самое главное<br />и&#160;договоримся о&#160;правилах
            </Text>

            <ul className={cn('features-section__list')}>
                {features.map((feature, index) => (
                    <Card key={index} className={cn('features-section__list-item')} as="li">
                        {formatText(feature)}
                    </Card>
                ))}
            </ul>
        </GridWrapper>
    );
};

export default FeaturesSection;