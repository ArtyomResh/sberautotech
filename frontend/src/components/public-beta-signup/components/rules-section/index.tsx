import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import Heading from '../../../heading';
import Text from '../../../text';
import GridWrapper from '../grid-wrapper';

import style from './index.css';

const rules = [
    { imageName: 'two-passengers', text: 'Два пассажирских<br />места', alt: 'Изображение знака с двумя людьми пристёгнутыми ремнём безопасности' },
    { imageName: 'no-pets', text: 'Без питомцев', alt: 'Изображение знака с перечёркнутой лапки животного' },
    { imageName: 'no-photo-inside', text: 'Фото только<br />снаружи', alt: 'Изображение знака с внешним видом автомобиля' },
    { imageName: 'no-drinks', text: 'Без еды<br />и&#160;напитков', alt: 'Изображение знака с перечёркнутым стаканом' },
    { imageName: 'buckle-up', text: 'Пристегнуть<br />ремни', alt: 'Изображение знака с человеком пристёгнутым ремнём безопасности' },
    { imageName: 'no-smoking', text: 'Не&#160;курить', alt: 'Изображение знака с перечёркнутой сигаретой' }
];

const RulesSection = () => {
    const cn = useClassnames(style);

    return (
        <GridWrapper as="section" className={cn('rules-section')}>
            <Heading
                className={cn('rules-section__title')}
                level={2}
                dangerouslySetInnerHTML={{ __html: formatText('А&#160;вот простые {правила для пассажиров}') }}
            />

            <ul className={cn('rules-section__list')}>
                {rules.map((rule, index) => (
                    <li key={index} className={cn('rules-section__list-item')}>
                        <figure className={cn('rules-section__rule')}>
                            <img
                                className={cn('rules-section__rule-image')}
                                srcSet={`/rules/${rule.imageName}/${rule.imageName}@1x.png 1x, /rules/${rule.imageName}/${rule.imageName}@2x.png 2x`}
                                src={`/rules/${rule.imageName}/${rule.imageName}@3x.png`}
                                alt={rule.alt}
                            />
                            <Text
                                className={cn('rules-section__rule-caption')}
                                size={4}
                                as="figcaption"
                                dangerouslySetInnerHTML={{ __html: formatText(rule.text) }}
                            />

                        </figure>
                    </li>

                ))}
            </ul>

        </GridWrapper>
    );
};

export default RulesSection;