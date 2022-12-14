import React from 'react';

// import { YM_ID } from '../../../../constants';
import IconArrowRight from '../../../../../static/hero/icon-arrow-right.inline.svg';
import IconArrowDown from '../../../../../static/hero/icon-arrow-down.inline.svg';
import Logo from '../../../../../static/logo.inline.svg';
import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import Heading from '../../../heading';
import Text from '../../../text';
import GridWrapper from '../grid-wrapper';

// import LinkButton from '../../../link-button'';

import styles from './index.css';
// import { BETA_TEST_SIGNUP_FORM_URL } from '../../constants';

// interface IProps {
//     onLinkClick?: () => void
// }

const OpenTesting = (/* { onLinkClick }: IProps */) => {
    const cn = useClassnames(styles);
    // const handleLinkClick = () => {
    //     onLinkClick?.();

    //     // @ts-expect-error: ym подставляется только при NODE_ENV === 'production'
    //     typeof ym !== 'undefined' && ym(YM_ID, 'reachGoal', 'click--button--prinyat_uchastie');
    // };

    return (
        <section className={cn('hero')}>
            <header className={cn('hero__header')}>
                <Logo className={cn('hero__header-logo')} />
            </header>

            <GridWrapper as="div">
                <Heading
                    level={1}
                    className={cn('hero__title')}
                    dangerouslySetInnerHTML={{ __html: formatText('{Беспилотные автомобили} ждут первых пассажиров уже в&#160;декабре') }}
                />

                {/* <LinkButton
                    className={cn('hero__button')}
                    onClick={handleLinkClick}
                    href={BETA_TEST_SIGNUP_FORM_URL}
                    isGatsbyLink={true}
                >
                    Принять участие
                </LinkButton> */}
            </GridWrapper>

            <div className={cn('hero__map')} />

            <GridWrapper as="div" className={cn('hero__location')}>
                <Text className={cn('hero__location-details-title')} size={4} as="h3">
                    Где
                </Text>
                <Heading level={2} as="p" className={cn('hero__location-details')}>
                    Парк &#171;Сказка&#187;
                    <IconArrowRight className={cn('hero__location-details-icon_arrow-right')} />
                </Heading>

                <Text className={cn('hero__location-details-title')} size={4} as="h3">
                    Когда
                </Text>
                <Heading level={2} as="p" className={cn('hero__location-details')}>
                    24&#8211;25 декабря
                </Heading>

                <Text className={cn('hero__location-details-title')} size={4} as="h3">
                    Во&#160;сколько
                </Text>
                <Heading level={2} as="p" className={cn('hero__location-details')}>
                    с&#160;10&#160;до&#160;16
                </Heading>

                <IconArrowDown className={cn('hero__location-icon_arrow-down')} />
            </GridWrapper>
        </section>
    );
};

export default OpenTesting;
