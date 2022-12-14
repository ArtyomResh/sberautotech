import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import Heading from '../../../heading';
import Text from '../../../text';
import GridWrapper from '../grid-wrapper';

import styles from './index.css';

const titles = [
    'От&#160;парка &#171;Сказка&#187; {до&#160;метро}',
    'Обзорный {круговой маршрут}'
];

const OpenTesting = () => {
    const cn = useClassnames(styles);

    return (
        <GridWrapper as="section" className={cn('path-description')}>
            <ul className={cn('path-description__titles')}>
                {titles.map((title, index) => (
                    <Heading
                        key={index}
                        level={2}
                        as="li"
                        className={cn('path-description__title')}
                        dangerouslySetInnerHTML={{
                            __html: `${formatText(title)}`
                        }}
                    />
                ))}
            </ul>

            <Text size={2} as="p">
                Удивительное приключение в&#160;вашем любимом парке! Совершить обзорную поездку на&#160;беспилотном автомобиле или доехать до&#160;метро после долгого и&#160;веселого дня.
            </Text>

            <Text size={4} as="p">
                Ваше участие помогает нам сделать удобный и&#160;современный сервис реальностью.
                <br />
                <br />

                Тестирование бесплатно!
            </Text>
        </GridWrapper>
    );
};

export default OpenTesting;
