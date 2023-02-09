import React, { createContext, ReactElement, useState, useContext } from 'react';
import { INavProps } from '../components/nav';

interface IAppContext {
    isContactFormVisible: boolean,
    setIsContactFormVisible: React.Dispatch<React.SetStateAction<boolean>> | (() => void),
    isRespondFormVisible: boolean,
    setIsRespondFormVisible: React.Dispatch<React.SetStateAction<boolean>> | (() => void),
    isNavVisible: boolean,
    setIsNavVisible: React.Dispatch<React.SetStateAction<boolean>> | (() => void),
    vacancyTitle: string,
    setVacancyTitle: React.Dispatch<React.SetStateAction<string>> | (() => void),
    huntflowId: string | null,
    setHuntflowId: React.Dispatch<React.SetStateAction<string>> | (() => void),
    mainPageActivePageId: INavProps['pageId'] | null,
    setMainPageActivePageId: React.Dispatch<React.SetStateAction<INavProps['pageId'] | null>> | (() => void)
}
/* eslint-disable @typescript-eslint/no-empty-function */
const appContext = createContext<IAppContext>({
    isContactFormVisible   : false,
    isRespondFormVisible   : false,
    isNavVisible           : false,
    setIsRespondFormVisible: () => {},
    setIsContactFormVisible: () => {},
    setIsNavVisible        : () => {},
    vacancyTitle           : '',
    setVacancyTitle        : () => {},
    huntflowId             : null,
    setHuntflowId          : () => {},
    mainPageActivePageId   : null,
    setMainPageActivePageId: () => {}
});
/* eslint-ensable @typescript-eslint/no-empty-function */
const { Provider } = appContext;

const AppProvider = ({ children }: { children: ReactElement }) => {
    const [isContactFormVisible, setIsContactFormVisible] = useState(false);
    const [isRespondFormVisible, setIsRespondFormVisible] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [vacancyTitle, setVacancyTitle] = useState('');
    const [huntflowId, setHuntflowId] = useState('');
    const [activePageId, setActivePageId] = useState<INavProps['pageId'] | null>(null);

    return (
        <Provider value={{
            isContactFormVisible,
            setIsContactFormVisible,
            isRespondFormVisible,
            setIsRespondFormVisible,
            isNavVisible,
            setIsNavVisible,
            vacancyTitle,
            setVacancyTitle,
            huntflowId,
            setHuntflowId,
            mainPageActivePageId   : activePageId,
            setMainPageActivePageId: setActivePageId
        }}
        >
            {children}
        </Provider>);
};

const useAppContext = () => useContext(appContext);

export { appContext, useAppContext, AppProvider };
