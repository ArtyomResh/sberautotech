import { ValidationValueMessage } from 'react-hook-form';
import { translate } from '../i18n';

export const validateEmail: ValidationValueMessage<RegExp> = {
    message: translate('validation:email'),
    // eslint-disable-next-line no-useless-escape
    value  : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
};
