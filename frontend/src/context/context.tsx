import React, { createContext, ReactElement, useState, useContext } from 'react';

interface IAppContext {
    isContactFormVisible: boolean,
    setIsContactFormVisible: React.Dispatch<React.SetStateAction<boolean>> | null,
    isRespondFormVisible: boolean,
    setIsRespondFormVisible: React.Dispatch<React.SetStateAction<boolean>> | null,
    vacancyTitle: string,
    setVacancyTitle: React.Dispatch<React.SetStateAction<string>> | null,
    huntflowId: string | null,
    setHuntflowId: React.Dispatch<React.SetStateAction<string>> | null
}

const appContext = createContext<IAppContext>({
    isContactFormVisible   : false,
    isRespondFormVisible   : false,
    setIsRespondFormVisible: null,
    setIsContactFormVisible: null,
    vacancyTitle           : '',
    setVacancyTitle        : null,
    huntflowId             : null,
    setHuntflowId          : null
});
const { Provider } = appContext;

const AppProvider = ({ children }: { children: ReactElement }) => {
    const [isContactFormVisible, setIsContactFormVisible] = useState(false);
    const [isRespondFormVisible, setIsRespondFormVisible] = useState(false);
    const [vacancyTitle, setVacancyTitle] = useState('');
    const [huntflowId, setHuntflowId] = useState('');

    return (
        <Provider value={{
            isContactFormVisible,
            setIsContactFormVisible,
            isRespondFormVisible,
            setIsRespondFormVisible,
            vacancyTitle,
            setVacancyTitle,
            huntflowId,
            setHuntflowId
        }}
        >
            {children}
        </Provider>);
};

const useAppContext = () => useContext(appContext);

export { appContext, useAppContext, AppProvider };
