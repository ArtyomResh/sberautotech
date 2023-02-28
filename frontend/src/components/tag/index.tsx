import React from 'react';
import { useClassnames } from '../../hooks/use-classnames';

import './index.css';

interface IProps {
    text: string,
    isActive: boolean | undefined,
    onClickTag: (e: React.MouseEvent<HTMLLIElement>) => void,
    strapiId: number
}

const Tag = ({ text, strapiId, isActive, onClickTag }: IProps) => {
    const cn = useClassnames();

    return (
        <li
            className={cn('tag',
                {
                    'tag_active': isActive
                }
            )}
            onClick={onClickTag}
            data-id={strapiId}
        >{text}
        </li>
    );
};

export default Tag;
