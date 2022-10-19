import React from 'react';
import { useClassnames } from '../../hooks/use-classnames';
import Text from '../text';

import styles from './index.css';


type TCardProps = React.HTMLAttributes<HTMLDivElement> & {

    /** Element type */
    as?: keyof JSX.IntrinsicElements
};

const Card = (props: TCardProps) => {
    const { className, children, as } = props;
    const cx = useClassnames(styles);

    const classNames = cx(className, 'card');

    return <Text className={classNames} size={2} as={as}>{children}</Text>;
};

export default Card;
