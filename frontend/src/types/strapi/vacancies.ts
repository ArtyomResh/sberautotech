
export interface IArea {
    text: string,
    value: string
}

export interface ICity {
    text: string,
    value: string
}

export interface IDirection {
    header: string,
    id: number
}

export interface IJobType {
    duration: string,
    text: string
}

export interface ITag {
    text: string,
    value: string,
    id: number
}

export interface IVacancy {
    id: string,
    about: string,
    area: IArea,
    city: ICity,
    conditions: string,
    customDescription: string,
    direction: IDirection,
    jobType: IJobType,
    publicationDate: string,
    tags: Array<ITag>,
    title: string,
    whatToDo: string,
    whatWaitingFor: string,
    customDescriptionHeader: string,
    conditionsHeader: string,
    plussesHeader: string,
    plusses: string,
    whatToDoHeader: string,
    whatWaitingForHeader: string,
    huntflowId: string
}
