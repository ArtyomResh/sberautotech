import React from 'react';
import Fade from 'react-reveal/Fade';

import Heading from '../heading';
import { useClassnames } from '../../hooks/use-classnames';
import Cross from '../../images/cross.inline.svg';

import styles from './index.css';

interface IProps {
    type: 'success' | 'error',
    isVisible: boolean,
    onCloseClick: () => void
}

const Alert = (props: React.PropsWithChildren<IProps>) => {
    const cn = useClassnames(styles);
    const { children, type, isVisible, onCloseClick } = props;

    return (
        <Fade duration={200} top={true} when={isVisible}>
            <div className={cn('alert', `alert_type-${type}`, { 'alert_visible': isVisible })}>
                <div className={cn('alert__text')} dangerouslySetInnerHTML={{ __html: `${children}` }} />

                <button className={cn('alert__button')} type="button" title="Кнопка закрытия алёрта" onClick={onCloseClick}>
                    <Cross className={cn('alert__icon-cross')} />
                </button>
            </div>
        </Fade>
    );
};

export default Alert;
