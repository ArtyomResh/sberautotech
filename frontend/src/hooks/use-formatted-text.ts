import { useMemo } from 'react';

const useFormattedText = (text: string | undefined) => useMemo(() => {
    if(!text) {
        return null;
    }

    return text.replace('{', '<span>').replace('}', '</span>').replace('[', '<b>').replace(']', '</b>');
}, [text]);

export default useFormattedText;