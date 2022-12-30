import { ILocalFile, ISeo } from '..';

export interface IVacancyPage {
    pageId: string,
    count: string,
    countText: string,
    headerBottom: string,
    seo: ISeo,
    textBottom: string,
    video: ILocalFile,
    isHidden: boolean
}
