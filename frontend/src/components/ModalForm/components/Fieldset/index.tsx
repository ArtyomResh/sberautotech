import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import './index.css';

interface IProps {
    legend: string,
    children: React.ReactNode
}

const Fieldset = ({ legend, children }: IProps) => {
    const cn = useClassnames();

    return (
        <fieldset className={cn('modal-form__fieldset')}>
            <legend className={cn('modal-form__fieldset-legend')}>
                {legend}
            </legend>

            <div className={cn('modal-form__fieldset-content')}>
                {children}
            </div>
        </fieldset>
    );
};

export default Fieldset;
