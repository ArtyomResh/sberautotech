import { ValidationValueMessage } from 'react-hook-form';
import { translate } from '../i18n';

export const validatePhoneNumber: ValidationValueMessage<RegExp> = {
    message: translate('validation:phone'),
    value  : /^(\+7 \d{3} (\d){3}–(\d{2})–(\d{2}))$/
};
