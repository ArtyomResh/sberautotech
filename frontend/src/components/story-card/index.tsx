import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import useFormattedText from '../../hooks/use-formatted-text';
import { toUnescapedHTML } from '../../utils';

import style from './index.css';

export interface ICard {
    image: {
        localFile: {
            url: string
        }
    },
    text: string
}

const StoryCard = ({ card }: { card: ICard }) => {
    const cn = useClassnames(style);
    const text = useFormattedText(card.text);

    return (
        <div className={cn('story__wrapper')}>
            <img src={card.image.localFile.url} className={cn('story__image')} alt="" />
            {text && <span className={cn('story__text')}>{toUnescapedHTML(text)}</span>}
        </div>
    );
};

export default StoryCard;
