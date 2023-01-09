import { validateEmail } from '../validateEmail';

describe('validateEmail', () => {
    it('should accept standart email string', () => {
        expect('test@test.ru').toMatch(validateEmail.value);
    });
    it('should decline email without first level domain segment', () => {
        expect('test@test').not.toMatch(validateEmail.value);
    });
    it('should decline email without user name segment', () => {
        expect('@test.ru').not.toMatch(validateEmail.value);
    });
});
