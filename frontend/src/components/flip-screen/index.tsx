import React, { useMemo } from 'react';
import { isMobile } from 'react-device-detect';

import useFormattedText from '../../hooks/use-formatted-text';
import { useClassnames } from '../../hooks/use-classnames';
import { toUnescapedHTML } from '../../utils';

import style from './index.css';

interface IProps {
    data: {
        primary_header: string,
        secondary_header: string,
        primary_text: string,
        primary_text_float: string
        secondary_text: string,
        secondary_text_float: string
    }
    id: string
    icon?: string
    isMobile?: boolean
}

const FlipScreen = ({data, id, icon} : IProps) => {
    const cn = useClassnames(style);
    const primaryHeader = useFormattedText(data.primary_header);
    const secondaryHeader = useFormattedText(data.secondary_header);
    const primaryText = useFormattedText(data.primary_text);
    const secondaryText = useFormattedText(data.secondary_text);

    const getPrimaryText = useMemo(() => {
        return primaryText ? (
            <span
                className={cn(
                    'flip__screen-text', 
                    'flip__screen-text_primary', 
                    `flip__screen-text_${data.primary_text_float}`
                )}
            >
                {toUnescapedHTML(primaryText)}
            </span>
        ) : null
    }, [data.primary_text_float])

    return (
        <div id={id} className={cn('flip__screen-wrapper', 'scroll-bound')}>
            <div className="content">
                <video
                    className={cn('flip__screen-background')}
                    muted={true}
                    playsInline={true}
                    autoPlay={isMobile}
                    loop={isMobile}
                />
                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_primary')}>
                    {primaryHeader && (
                        <span className={cn('flip__screen-header', 'flip__screen-header_primary')}>
                            {toUnescapedHTML(primaryHeader)}
                        </span>
                    )}
                    {!isMobile && getPrimaryText}
                </div>
                <div className={cn('flip__text-wrapper', 'flip__text-wrapper_secondary')}>
                    {isMobile && getPrimaryText}
                    {secondaryHeader && (
                        <span 
                            className={cn(
                                'flip__screen-header', 
                                'flip__screen-header_secondary'
                            )}
                        >
                            {toUnescapedHTML(secondaryHeader)}
                        </span>
                    )}
                    {secondaryText && (
                        <span
                            className={cn(
                                'flip__screen-text',
                                'flip__screen-text_secondary', 
                                `flip__screen-text_${data.secondary_text_float}`
                            )}
                        >
                            {toUnescapedHTML(secondaryText)}
                        </span>
                    )}
                    {icon && <span><img className={cn('flip__screen-logo')} src={icon} /></span>}
                </div>
            </div>
        </div>
    )
}

export default FlipScreen;