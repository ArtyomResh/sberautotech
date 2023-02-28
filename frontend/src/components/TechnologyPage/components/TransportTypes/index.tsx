import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import sidDesktopNormalImg from './assets/desktop-normal/sid.png';
import flipDesktopNormaImg from './assets/desktop-normal/flip.png';
import sidDesktopSmallImg from './assets/desktop-small/sid.png';
import flipDesktopSmallImg from './assets/desktop-small/flip.png';
import sidBelowDesktopImg from './assets/below-desktop/sid.png';
import flipBelowDesktopImg from './assets/below-desktop/flip.png';

import GridWrapper from '../../../grid-wrapper';
import Heading from '../../../heading';
import Text from '../../../text';

import Card from './components/Card';

import style from './index.css';

const transport = [
    {
        image: {
            desktopNormal: sidDesktopNormalImg,
            desktopSmall : sidDesktopSmallImg,
            tablet       : sidBelowDesktopImg,
            mobile       : sidBelowDesktopImg,
            alt          : 'Изображение легкового беспилотного автомобиля СберАвтотех'
        },
        title      : 'Легковые автомобили',
        description: 'Серийный автомобиль может стать беспилотным&#160;&#8212; оборудование устанавливается либо на&#160;производстве, либо на&#160;специализированной станции',
        href       : '/'
    },
    {
        image: {
            desktopNormal: flipDesktopNormaImg,
            desktopSmall : flipDesktopSmallImg,
            tablet       : flipBelowDesktopImg,
            mobile       : flipBelowDesktopImg,
            alt          : 'Изображение пассажирского беспилотного автомобиля СберАвтотех'
        },
        title      : 'ФЛИП',
        description: 'Создан исключительно для автономного вождения, в&#160;нем нет руля, панели управления и&#160;даже водительского кресла',
        href       : '/'
    }
];

const TransportTypes = () => {
    const cn = useClassnames(style);

    const cssBlock = 'transport-types';

    return (
        <GridWrapper className={cn(`${cssBlock}__wrapper`)}>
            <Heading
                className={cn(`${cssBlock}__title`)}
                level={3}
                dangerouslySetInnerHTML={{ __html: formatText('{Беспилотный транспорт}&#160;&#8212; для любых задач') }}
            />

            <Text
                className={cn(`${cssBlock}__description`)}
                size={2}
                dangerouslySetInnerHTML={{ __html: 'Технология SberAutoTech совместима с&#160;различными видами транспорта&#160;&#8212; от&#160;пассажирских автомобилей до&#160;грузовиков.' }}
            />

            {transport.map(({ image, title, description, href }) => (
                <Card
                    key={title}
                    className={cn(`${cssBlock}__card`)}
                    title={title}
                    description={description}
                    image={image}
                    href={href}
                />
            ))}
        </GridWrapper>

    );
};

export default TransportTypes;
