import { ILocalFile } from '..';

export interface IVideoSource {
    preview?: ILocalFile,
    sources: Array<ILocalFile>
}

export interface IAdaptiveVideoSource {
    desktopNormal: IVideoSource,
    desktopSmall?: IVideoSource,
    tablet?: IVideoSource,
    mobile?: IVideoSource
}


export interface IAdaptiveImageSource {
    desktopNormal: ILocalFile,
    desktopSmall?: ILocalFile,
    tablet?: ILocalFile,
    mobile?: ILocalFile
}
