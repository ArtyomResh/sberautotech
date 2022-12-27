export type TStrapiEntity<TEntity> = TEntity & {
    locale: string,
    strapiId: number
};

export interface IStrapiNode<TDataType> {
    node: TDataType
}

export interface IStrapiCollection<TDataType> {
    edges: Array<IStrapiNode<TDataType>>
}

export interface IStrapiSingleType<TDataType> {
    edges: [IStrapiNode<TDataType>]
}

