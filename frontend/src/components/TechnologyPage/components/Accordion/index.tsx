import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';

import Heading from '../../../../components/heading';
import Text from '../../../../components/text';
import PlusIcon from '../../../../images/technology/accordion/plus.inline.svg';
import MinusIcon from '../../../../images/technology/accordion/minus.inline.svg';
import { useClassnames } from '../../../../hooks/use-classnames';


import style from './index.css';

interface IProps {
    title: string,
    description: string,
    withColumns?: boolean,
    withBorderTop: boolean
}

const Accordion = ({ title, description, withColumns, withBorderTop }: IProps) => {
    const cn = useClassnames(style);
    const [isOpened, setIsOpened] = useState(false);
    const cssBlock = 'accordion';

    const handleOnButtonClick = () => {
        setIsOpened(!isOpened);
    };

    return (
        <section className={cn(cssBlock, { [`${cssBlock}_with_border-top`]: withBorderTop })}>
            <div className={cn(`${cssBlock}__header`)} >
                <Heading level={4}>
                    {title}
                </Heading>

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
