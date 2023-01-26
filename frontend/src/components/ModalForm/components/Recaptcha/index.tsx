import React from 'react';
import ReactRecaptcha from 'react-recaptcha';

import { useClassnames } from '../../../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    sitekey?: string,
    render?: 'onload' | 'explicit',
    hl: string,
    verifyCallback: (arg: string) => void
}

const Recaptcha = ({ sitekey = '6LcxFCQbAAAAAPk5ZtW8P4LTJFuMUTHMh65Oap4n', render = 'explicit', hl, verifyCallback }: IProps) => {
    const cn = useClassnames(style);

    return (
        <ReactRecaptcha
            className={cn('modal-form__recaptcha')}
            sitekey={sitekey}
            render={render}
            hl={hl}
            verifyCallback={verifyCallback}
        />
    );
};

export default Recaptcha;