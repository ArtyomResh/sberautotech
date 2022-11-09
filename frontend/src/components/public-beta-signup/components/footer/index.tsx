import React from 'react';

import Heading from '../../../heading';
import LinkButton from '../link-button';
import Text from '../../../text';
import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import GridWrapper from '../grid-wrapper';

import styles from './index.css';

const PublicBetaSignup = () => {
    const cn = useClassnames(styles);

    return (
        <GridWrapper as="footer" className={cn('footer')}>
            <Heading
                className={cn('footer__title')}
                level={2}
                dangerouslySetInnerHTML={{ __html: formatText('СберАвтоТех: {беспилотные технологии}') }}
            />

            <LinkButton className={cn('footer__link-button')} href="https://sberautotech.ru/" target="_blank" rel="noopener noreferrer">
                sberautotech.ru
            </LinkButton>

            <Text size={2} as="p">
                Мы&#160;создаем беспилотники для самых разных сфер жизни, уже через несколько лет эта технология будет везде. Личные беспилотные авто появятся на&#160;дорогах крупных городов, беспилотное такси станет привычным транспортом, беспилотные фуры повезут грузы по&#160;выделенным трассам, а&#160;быстрая доставка будет осуществляться без людей.
            </Text>

            <Text size={2} as="p">
                Искусственный интеллект объединит всю экосистему беспилотного транспорта, чтобы изменить городскую инфраструктуру в&#160;лучшую сторону. Маршруты будут строиться так, чтобы снижать нагрузку на&#160;сложные участки дорог, пробки уменьшатся, а&#160;безопасность станет выше.
            </Text>

            <Text size={4} as="p">
                Принимая участие в&#160;открытом тестировании, вы&#160;помогаете нам сделать удобный и&#160;современный сервис реальностью
            </Text>
        </GridWrapper>
    );
};

export default PublicBetaSignup;
