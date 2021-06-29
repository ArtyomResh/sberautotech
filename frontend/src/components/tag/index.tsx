import React from 'react';
import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    text: string,
    isActive: boolean | undefined,
    onClickTag: any,
    strapiId: number
}

const Tag = ({ text, strapiId, isActive, onClickTag }: IProps) => {
    const cn = useClassnames(style);
    console.log(text, strapiId)
    return (
        <li className={
            cn('tag',
                {
                    'tag_active': isActive
                }
            )
        }
            onClick={onClickTag}
            data-id={strapiId}
        >{text}</li>
    );
};

export default Tag;
