import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    // @FIXME:
    data: any
}

const MainBlock: React.FC<IProps> = ({data}) => {
    const cn = useClassnames(style)
    console.log(data)

    return (
        <div className={cn('main-block')}>
            <div className={cn('main-block__top')}>
                <img src={data.topBackground.publicURL} className={cn('main-block__image')} />
            </div>
            <div className={cn('main-block__bottom')}>
                <img src={data.bottomBackground.publicURL} className={cn('main-block__image')} />
            </div>
        </div>
    )
}

export default MainBlock;