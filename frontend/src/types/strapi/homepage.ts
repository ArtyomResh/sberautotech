import { ISeo } from '../../components/seo';
import { IAdaptiveImageSource, IAdaptiveVideoSource } from './common';

export interface IHomePageScreenBlock {
    text?: string,
    link?: string,
    pageId?: string,
    backgroundVideo?: IAdaptiveVideoSource,
    backgroundImage?: IAdaptiveImageSource
}

export interface IHomepage {
    seo: ISeo,
    screens: Array<IHomePageScreenBlock>
}
