import React from 'react';

import Heading from '../../../heading';
import { useClassnames } from '../../../../hooks/use-classnames';
import Cross from '../../../../images/cross.inline.svg';

import styles from './index.css';

interface IProps {
    type: 'success' | 'error',
    onCloseClick: () => void
}

const Alert = (props: React.PropsWithChildren<IProps>) => {
    const cn = useClassnames(styles);
    const { children, type, onCloseClick } = props;

    return (
        <div className={cn('alert', `alert_type-${type}`)}>
            <Heading level={2} as="div" className={cn('alert__text')}>
                {children}

                <button className={cn('alert__button')} type="button" title="Кнопка закрытия алёрта" onClick={onCloseClick}>
                    <Cross className={cn('alert__icon-cross')} />
                </button>

            </Heading>
        </div>
    );
};

export default Alert;
