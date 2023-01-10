import { ValidationValueMessage } from 'react-hook-form';

export const validateEmail: ValidationValueMessage<RegExp> = {
    value  : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: 'Неверный формат почты'
};
