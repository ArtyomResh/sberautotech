import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import useDeviceDetect from '../../hooks/use-device-detect';
import useFormattedText from '../../hooks/use-formatted-text';
import { IAdaptiveImageSource, IAdaptiveVideoSource } from '../../types/strapi/common';
import { strapiAdaptiveImageToPictureVariants, toUnescapedHTML } from '../../utils';
import GridWrapper from '../grid-wrapper';
import { Picture } from '../Picture';

import './index.css';

export interface IBlock {
    backgroundVideo?: Pick<IAdaptiveVideoSource, 'mobile' | 'desktopNormal'>,
    backgroundImage?: IAdaptiveImageSource,
    text?: string
}

const MainPageBlock = ({ block, index, pageNumber }: { block: IBlock, index: number, pageNumber: number }) => {
    const cn = useClassnames();
    const text = useFormattedText(block.text);
    const visibilityClassName = pageNumber >= index ? 'block__wrapper_visible' : 'block__wrapper_hidden';
    const { isMobile } = useDeviceDetect();

    const videoSrc = isMobile ? block?.backgroundVideo?.mobile : block?.backgroundVideo?.desktopNormal;

    return (
        <div className={cn('block__wrapper', visibilityClassName)}>
            {videoSrc?.sources[0] ? (
                // TODO: перейти на использование VideoPlayer, который появится в задаче SBER-250
                <video
                    className={cn('block__background')}
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                    preload="metadata"
                    src={videoSrc.sources[0].localFile.url}
                    poster={videoSrc.preview?.localFile.url}
                />
            ) : (
                block.backgroundImage && <Picture
                    className={cn('block__background')}
                    alt=""
                    image={strapiAdaptiveImageToPictureVariants(block.backgroundImage)}
                />
            )}
            <GridWrapper className={cn('block__bottom', pageNumber >= index ? 'block__bottom_showing' : 'block__bottom_hiding')}>
                {text && <span className={cn('block__text')}>{toUnescapedHTML(text)}</span>}
            </GridWrapper>
        </div>
    );
};

export default MainPageBlock;
