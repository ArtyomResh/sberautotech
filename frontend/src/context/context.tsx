import React, { createContext, ReactElement, useState, useContext } from 'react';
import { INav } from '../components/nav';

interface IAppContext {
    isContactFormVisible: boolean,
    setIsContactFormVisible: React.Dispatch<React.SetStateAction<boolean>> | null,
    isRespondFormVisible: boolean,
    setIsRespondFormVisible: React.Dispatch<React.SetStateAction<boolean>> | null,
    isNavVisible: boolean,
    setIsNavVisible: React.Dispatch<React.SetStateAction<boolean>> | null,
    vacancyTitle: string,
    setVacancyTitle: React.Dispatch<React.SetStateAction<string>> | null,
    huntflowId: string | null,
    setHuntflowId: React.Dispatch<React.SetStateAction<string>> | null,
    mainPageActivePageId: INav['pageId'] | null,
    setMainPageActivePageId: React.Dispatch<React.SetStateAction<INav['pageId'] | null>> | null
}

const appContext = createContext<IAppContext>({
    isContactFormVisible   : false,
    isRespondFormVisible   : false,
    isNavVisible           : false,
    setIsRespondFormVisible: null,
    setIsContactFormVisible: null,
    setIsNavVisible        : null,
    vacancyTitle           : '',
    setVacancyTitle        : null,
    huntflowId             : null,
    setHuntflowId          : null,
    mainPageActivePageId   : null,
    setMainPageActivePageId: null
});
const { Provider } = appContext;

const AppProvider = ({ children }: { children: ReactElement }) => {
    const [isContactFormVisible, setIsContactFormVisible] = useState(false);
    const [isRespondFormVisible, setIsRespondFormVisible] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [vacancyTitle, setVacancyTitle] = useState('');
    const [huntflowId, setHuntflowId] = useState('');
    const [activePageId, setActivePageId] = useState<INav['pageId'] | null>(null);

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
