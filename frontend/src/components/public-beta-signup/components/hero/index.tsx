import React from 'react';

import IconArrowRight from '../../../../../static/hero/icon-arrow-right.inline.svg';
import IconArrowDown from '../../../../../static/hero/icon-arrow-down.inline.svg';
import Logo from '../../../../../static/logo.inline.svg';
import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import Heading from '../../../heading';
import Text from '../../../text';
import GridWrapper from '../grid-wrapper';

import LinkButton from '../link-button';

import styles from './index.css';

interface IProps {
    onLinkClick?: () => void
}

const OpenTesting = ({ onLinkClick }: IProps) => {
    const cn = useClassnames(styles);
    const handleLinkClick = () => {
        onLinkClick?.();
    };

    return (
        <section className={cn('hero')}>
            <header className={cn('hero__header')}>
                <Logo className={cn('hero__header-logo')} />
            </header>

            <GridWrapper as="div">
                <Heading
                    level={1}
                    className={cn('hero__title')}
                    dangerouslySetInnerHTML={{ __html: formatText('{Беспилотные автомобили} ждут первых пассажиров') }}
                />

                <Heading level={2} className={cn('hero__announce')} as="p">
                    Уже в ноябре!
                </Heading>

                <LinkButton
                    className={cn('hero__button')}
                    href="/public-beta-signup#modal"
                    onClick={handleLinkClick}
                    isGatsbyLink={true}
                >
                    Принять участие
                </LinkButton>

            </GridWrapper>

            <div className={cn('hero__map')} />

            <GridWrapper as="div" className={cn('hero__location')}>
                <Text className={cn('hero__location-details-title')} size={4} as="h3">
                    Локация
                </Text>
                <Heading level={2} as="p" className={cn('hero__location-details')}>
                    Крылатское
                    <IconArrowRight className={cn('hero__location-details-icon_arrow-right')} />
                </Heading>

                <Text className={cn('hero__location-details-title')} size={4} as="h3">
                    Протяженность маршрута
                </Text>
                <Heading level={2} as="p" className={cn('hero__location-details')}>
                    30&#160;км
                </Heading>

                <Text className={cn('hero__location-details-title')} size={4} as="h3">
                    Машин на&#160;линии
                </Text>
                <Heading level={2} as="p" className={cn('hero__location-details')}>
                    10
                </Heading>

                <IconArrowDown className={cn('hero__location-icon_arrow-down')} />
            </GridWrapper>
        </section>
    );
};

export default OpenTesting;
