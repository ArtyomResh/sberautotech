import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';

import Heading from '../../../../components/heading';
import Text from '../../../../components/text';
import PlusIcon from '../../../../images/technology/accordion/plus.inline.svg';
import MinusIcon from '../../../../images/technology/accordion/minus.inline.svg';
import { useClassnames } from '../../../../hooks/use-classnames';


import './index.css';

interface IProps {
    title: string,
    description: string,
    headingSize: 's' | 'm' | 'l',
    color?: 'white' | 'black',
    withColumns?: boolean,
    withBorderTop: boolean
}

const Accordion = ({ title, description, headingSize = 'm', color = 'black', withColumns, withBorderTop }: IProps) => {
    const cn = useClassnames();
    const [isOpened, setIsOpened] = useState(false);
    const cssBlock = 'accordion';

    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const headingLevelNumberBySize = {
        's': 4 as const,
        'm': 3 as const,
        'l': 2 as const
    };
    /* eslint-enable @typescript-eslint/no-magic-numbers */

    const handleOnButtonClick = () => {
        setIsOpened(!isOpened);
    };

    return (
        <section
            className={cn(cssBlock, {
                [`${cssBlock}_with_border-top`]: withBorderTop,
                [`${cssBlock}_has_color-white`]: color === 'white',
                [`${cssBlock}_has_color-black`]: color === 'black',
                [`${cssBlock}_is_small`]       : headingSize === 's',
                [`${cssBlock}_is_medium`]      : headingSize === 'm',
                [`${cssBlock}_is_large`]       : headingSize === 'l'
            })}
        >
            <div className={cn(`${cssBlock}__header`)} >
                <Heading
                    className={cn(`${cssBlock}__heading`)}
                    level={headingLevelNumberBySize[headingSize]}
                    dangerouslySetInnerHTML={{ __html: title }}
                />

                <button
                    className={cn(`${cssBlock}__button`)}
                    type="button"
                    onClick={handleOnButtonClick}
                    aria-label={isOpened ? 'Свернуть аккордеон' : 'Развернуть аккордеон'}
                >
                    {
                        isOpened
                            ? <MinusIcon className={cn(`${cssBlock}__icon`)} />
                            : <PlusIcon className={cn(`${cssBlock}__icon`)} />
                    }
                </button>
            </div>

            <Fade duration={400} when={isOpened} collapse={true}>
                <Text
                    className={cn(
                        `${cssBlock}__description`,
                        { [`${cssBlock}__description_with-columns`]: withColumns }
                    )}
                    dangerouslySetInnerHTML={{ __html: description }}
                    size={4}
                />
            </Fade>

        </section>
    );
};

export default Accordion;
