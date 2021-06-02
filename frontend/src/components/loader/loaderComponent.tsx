import React, { FC } from 'react';

import LoaderIcon from './loader';
import { useClassnames } from '../../hooks//use-classnames';

import style from './loader.css';

export interface IProps {
    className?: string,
    'data-qa'?: string,
    stopColor?: string
}

const Loader: FC<IProps> = (props) => {
    const cn = useClassnames(style, props.className, true);

    return (
        <div className={cn('loader')}>
            <LoaderIcon stopColor={props.stopColor} svg={{ className: cn('loader__icon'), width: 80, height: 80 }} />
        </div>
    );
};

export default Loader;