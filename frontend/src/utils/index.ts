import { createElement } from 'react';

export const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export const toUnescapedHTML = (text: string) => {
    return createElement('div', { dangerouslySetInnerHTML: { __html: text } });
};

export const gtagClicked = (event_category: string) => window
    ?.gtag?.('event', 'click', { event_category, event_label: window?.location.pathname });

export const enumToValues = (en) => {
    const values = Object.values(en);
    const keys = Object.keys(en);

    return keys.map((key, index) => ({ value: key, label: values[index] }));
};

export const formatText = (text: string) => text
    .replace(/&#160;/g, ' ')
    .replace(/\{/g, '<span class="selection-pattern">')
    .replace(/\}/g, '</span>')
    .replace('[', '<b>')
    .replace(']', '</b>');
