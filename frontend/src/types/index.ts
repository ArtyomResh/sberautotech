export interface IUrl {
    url: string
}

export interface ILocalFile {
    localFile: IUrl
}

export interface ISeo {
    shareImage: ILocalFile,
    metaTitle: string,
    metaDescription: string
}
