import { isMobile, isTablet, isDesktop } from 'react-device-detect';

import { SCREEN_EDGES } from '../../constants';

const isMobileOnly = isMobile && !isTablet;


export interface ISourceSizes<T> {
    desktopNormal?: T,
    desktopSmall?: T,
    tablet?: T,
    mobile?: T
}

// TODO: Написать тесты https://jira.csssr.io/browse/SBER-324
export function useSourceByScreenType<T>(sizes: ISourceSizes<T>, defaultValue: T): T {
    const { desktopNormal, desktopSmall, tablet, mobile } = sizes;

    const screenWidth = typeof window !== 'undefined' && window.screen.width;

    let result;

    if(isMobileOnly) {
        result = mobile || tablet || desktopSmall || desktopNormal;
    } else if(isTablet) {
        result = tablet || desktopSmall || desktopNormal || mobile;
    } else if(isDesktop) {
        const isSmallDesktop = screenWidth < SCREEN_EDGES.desktopNormal;
        if(isSmallDesktop) {
            result = desktopSmall || desktopNormal || tablet || mobile;
        } else {
            result = desktopNormal || desktopSmall || tablet || mobile;
        }
    }

    return result || defaultValue;
}
