import { validatePhoneNumber } from '../validatePhoneNumber';

describe('validatePhoneNumber', () => {
    describe('should accept', () => {
        it('phone number in format +7 XXX XX–XX–XX', () => {
            expect('+7 999 123–12–33').toMatch(validatePhoneNumber.value);
        });
    });

    describe('should decline', () => {
        it('phone number included not-number symbols', () => {
            expect('+7 AAA 123–12–33').not.toMatch(validatePhoneNumber.value);
        });

        it('phone number started with 8', () => {
            expect('8 999 123–12–33').not.toMatch(validatePhoneNumber.value);
        });
        it('phone number with other format', () => {
            expect('+79991231233').not.toMatch(validatePhoneNumber.value);
        });
    });
});
