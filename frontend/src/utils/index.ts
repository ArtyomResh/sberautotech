import { createElement } from 'react';

export const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export const toUnescapedHTML = (text: string) => {
    return createElement('ReactFragment', { dangerouslySetInnerHTML: { __html: text } });
};