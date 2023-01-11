import { createElement } from 'react';

export const toBase64 = (file: Blob) => new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export const toUnescapedHTML = (text: string) => {
    return createElement('div', { dangerouslySetInnerHTML: { __html: text } });
};

export const gtagClicked = (event_category: string) => window?.gtag?.('event', 'click', { event_category, event_label: window?.location.pathname });

export const formatText = (text: string) => text
    .replace(/&#160;/g, ' ')
    .replace(/\{/g, '<span class="selection-pattern">')
    .replace(/\}/g, '</span>')
    .replace('[', '<b>')
    .replace(']', '</b>');

/* eslint-disable @typescript-eslint/no-magic-numbers */
export const pluralize = (n: number, one: string, few: string, many: string) => {
    if(typeof n !== 'number' || typeof one !== 'string' || typeof few !== 'string' || typeof many !== 'string') {
        return;
    }

    const nP100 = n % 100;
    const nP10 = n % 10;

    if(nP10 === 1 && nP100 !== 11) {
        return one;
    }

    if(nP10 >= 2 && nP10 <= 4 && (nP100 < 10 || nP100 >= 20)) {
        return few;
    }

    return many;
};
/* eslint-enable @typescript-eslint/no-magic-numbers */
