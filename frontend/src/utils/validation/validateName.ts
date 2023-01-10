import { ValidationValueMessage } from 'react-hook-form';

export const validateName: ValidationValueMessage<RegExp> = {
    message: 'Имя может состоять из букв и пробелов',
    value  : /^[а-яА-Яa-zA-Z\s]*$/
};
