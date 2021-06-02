import { useState, useEffect } from 'react';

const useDeviceDetect = () => {
    // TODO ADD THIRD STATE
    const [isMobile, setMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
        const mobile = Boolean(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(userAgent));

        setMobile(mobile);
    }, []);

    return { isMobile };
};

export default useDeviceDetect;