import { ValidationValueMessage } from 'react-hook-form';
import { translate } from '../i18n';

export const validateName: ValidationValueMessage<RegExp> = {
    message: translate('validation:name'),
    value  : /^[а-яА-Яa-zA-Z\s]*$/
};
