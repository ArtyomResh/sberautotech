import { translate } from '../i18n';

export const validateRequired = (isRequired: boolean) => isRequired && translate('validation:required');
