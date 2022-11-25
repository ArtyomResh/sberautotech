import { useEffect, useState } from 'react';

export const useIsClient = () => {
    const [isClient, setIsClientisClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClientisClient(true);
    }, []);

    return isClient;
};
