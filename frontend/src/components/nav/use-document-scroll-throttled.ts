import { useContext, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { appContext } from '../../context/context';

const THROTTLE = 200;

const useDocumentScrollThrottled = (callback: (obj: { previousScrollTop: number, currentScrollTop: number }) => void) => {
    const [, setScrollPosition] = useState(0);
    const { isPopupVisible, isRespondFormVisible } = useContext(appContext);

    let previousScrollTop = 0;

    function handleDocumentScroll() {
        const { scrollTop: currentScrollTop } = document.documentElement || document.body;

        setScrollPosition((previousPosition) => {
            previousScrollTop = previousPosition;

            return currentScrollTop;
        });

        callback({ previousScrollTop, currentScrollTop });
    }

    const handleDocumentScrollThrottled = throttle(handleDocumentScroll, THROTTLE);

    useEffect(() => {
        if(isPopupVisible || isRespondFormVisible) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            window.onscroll = () => {
                window.scrollTo(scrollLeft, scrollTop);
            };
        } else {
            window.onscroll = () => {};
        }
        window.addEventListener('scroll', handleDocumentScrollThrottled);

        return () => {
            window.removeEventListener('scroll', handleDocumentScrollThrottled);
        };
    }, [isPopupVisible, isRespondFormVisible]);
};

export default useDocumentScrollThrottled;