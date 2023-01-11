import { validateName } from '../validateName';

describe('validateName', () => {
    describe('should accept', () => {
        it('cyrillic symbols', () => {
            expect('Иван').toMatch(validateName.value);
        });
        it('cyrillic symbols with spaces', () => {
            expect('Иван Иванович').toMatch(validateName.value);
        });
        it('latin symbols', () => {
            expect('John').toMatch(validateName.value);
        });
        it('latin symbols with spaces', () => {
            expect('John Dhoe').toMatch(validateName.value);
        });
    });

    describe('should decline', () => {
        it('cyrillic string with numbers', () => {
            expect('Иван 1').not.toMatch(validateName.value);
        });
        it('latin symbols with numbers', () => {
            expect('Jhon 2').not.toMatch(validateName.value);
        });
    });
});
