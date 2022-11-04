import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import Heading from '../../../heading';
import Text from '../../../text';
import GridWrapper from '../grid-wrapper';

import styles from './index.css';

const titles = [
    'Доехать {до&#160;метро}',
    'Забрать {ребенка из&#160;школы}',
    'Отправиться {в&#160;парк}',
    'Поехать {на&#160;работу}'
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
                Мы&#160;выбрали самые популярные локации, чтобы вписать беспилотники в&#160;городскую среду и&#160;увидеть своими глазами, каким будет завтрашний день обычного жителя мегаполиса.
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
