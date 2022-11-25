import { useMemo } from 'react';
import { formatText } from '../utils';

const useFormattedText = (text: string | undefined) => useMemo(() => {
    if(!text) {
        return null;
    }

    return formatText(text);
}, [text]);

export default useFormattedText;