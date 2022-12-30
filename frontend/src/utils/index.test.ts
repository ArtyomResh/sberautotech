
// TODO: https://jira.csssr.io/browse/SBER-189 пофиксить типы в jest

import { pluralize } from '.';

describe('pluralize ', () => {
    describe('при получении корректных аргументов должен возвращать строку в правильном склонении', () => {
        it("при аргументах (1, 'вакансию', 'вакансии', 'вакансий') должен вернуть строку 'вакансию'", () => {
            const numberOfOne = 1;

            expect(pluralize(numberOfOne, 'вакансию', 'вакансии', 'вакансий')).toBe('вакансию');
        });

        it("при аргументах (2, 'вакансию', 'вакансии', 'вакансий') должен вернуть строку 'вакансии'", () => {
            const numberOfFew = 2;

            expect(pluralize(numberOfFew, 'вакансию', 'вакансии', 'вакансий')).toBe('вакансии');
        });

        it("при аргументах (5, 'вакансию', 'вакансии', 'вакансий') должен вернуть строку 'вакансий'", () => {
            const numberOfFew = 5;

            expect(pluralize(numberOfFew, 'вакансию', 'вакансии', 'вакансий')).toBe('вакансий');
        });

        it("при аргументах (21, 'вакансию', 'вакансии', 'вакансий') должен вернуть строку 'вакансию'", () => {
            const numberOfMany = 21;

            expect(pluralize(numberOfMany, 'вакансию', 'вакансии', 'вакансий')).toBe('вакансию');
        });
    });

    describe('при получении некорректных аргументов должен возвращать undefined', () => {
        it("при аргументах ('1', 'вакансию', 'вакансии', 'вакансий') должен вернуть undefined", () => {
            expect(
                // @ts-expect-error Проверка edge-кейсов для функции pluralize
                pluralize('1', 'вакансию', 'вакансии', 'вакансий')
            ).toBeUndefined();
        });

        it("при аргументах (1, NaN, 'вакансии', 'вакансий') должен вернуть undefined", () => {
            expect(
                // @ts-expect-error Проверка edge-кейсов для функции pluralize
                pluralize(1, NaN, 'вакансии', 'вакансий')
            ).toBeUndefined();
        });

        it("при аргументах (1, 'вакансию', NaN, 'вакансий') должен вернуть undefined", () => {
            expect(
                // @ts-expect-error Проверка edge-кейсов для функции pluralize
                pluralize(1, 'вакансию', NaN, 'вакансий')
            ).toBeUndefined();
        });

        it("при аргументах (1, 'вакансию', 'вакансии', NaN) должен вернуть undefined", () => {
            expect(
                // @ts-expect-error Проверка edge-кейсов для функции pluralize
                pluralize(1, 'вакансию', 'вакансии', NaN)
            ).toBeUndefined();
        });

        it('при аргументах (1, true, NaN, undefined) должен вернуть undefined', () => {
            expect(
                // @ts-expect-error Проверка edge-кейсов для функции pluralize
                pluralize(1, true, NaN, undefined)
            ).toBeUndefined();
        });

        it("при аргументах (1, 'вакансию', 'вакансии') должен вернуть undefined", () => {
            expect(
                // @ts-expect-error Проверка edge-кейсов для функции pluralize
                pluralize(1, 'вакансию', 'вакансии')
            ).toBeUndefined();
        });

        it("при аргументах (1, 'вакансию') должен вернуть undefined", () => {
            expect(
                // @ts-expect-error Проверка edge-кейсов для функции pluralize
                pluralize(1, 'вакансию')
            ).toBeUndefined();
        });

        it('при аргументах (1) должен вернуть undefined', () => {
            expect(
                // @ts-expect-error Проверка edge-кейсов для функции pluralize
                pluralize(1)
            ).toBeUndefined();
        });
    });
});