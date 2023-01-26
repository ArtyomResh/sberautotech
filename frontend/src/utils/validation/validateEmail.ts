import { ValidationValueMessage } from 'react-hook-form';
import { translate } from '../i18n';

export const validateEmail: ValidationValueMessage<RegExp> = {
    message: translate('validation:email'),
    value  : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
};
