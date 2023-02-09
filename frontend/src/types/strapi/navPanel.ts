import { ILocalFile } from '..';

export interface INavPanel {
    links: Array<INavLink>,
    hierarchicalLinks: Array<INavHierachicalLink>,
    joinButtonText: string,
    switchLangUrl: string
}

export interface INavLink {
    text: string,
    to: string,
    navId: string,
    sublinks: Array<INavSubLink>
}

export interface INavHierachicalLink {
    text: string,
    to?: string,
    navId: string,
    sublinks: Array<INavSubLink>
}

export interface INavSubLink {
    text: string,
    to: string,
    navId: string,
    image?: ILocalFile
}
