import React, { createContext, ReactElement, useState, useContext } from 'react';

interface IAppContext {
    isPopupVisible: boolean,
    setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>> | null,
    vacancyTitle: string,
    setVacancyTitle: React.Dispatch<React.SetStateAction<string>> | null,
    huntflowId: string | null,
    setHuntflowId: React.Dispatch<React.SetStateAction<string>> | null
}

const appContext = createContext<IAppContext>({
    isPopupVisible   : false,
    setIsPopupVisible: null,
    vacancyTitle     : '',
    setVacancyTitle  : null
});
const { Provider } = appContext;

const AppProvider = ({ children }: { children: ReactElement }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [vacancyTitle, setVacancyTitle] = useState('');
    const [huntflowId, setHuntflowId] = useState('');

    return (
        <Provider value={{
            isPopupVisible,
            setIsPopupVisible,
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
