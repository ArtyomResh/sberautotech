import React, { createContext, ReactElement, useState, useContext } from 'react';

const appContext = createContext<{isPopupVisible: boolean, setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>, vacancyTitle: string, setVacancyTitle: React.Dispatch<React.SetStateAction<string>>}>({
    isPopupVisible   : false,
    setIsPopupVisible: null,
    vacancyTitle     : '',
    setVacancyTitle  : null
});
const { Provider } = appContext;

const AppProvider = ({ children }: { children: ReactElement }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [vacancyTitle, setVacancyTitle] = useState('');

    return <Provider value={{ isPopupVisible, setIsPopupVisible, vacancyTitle, setVacancyTitle }} >{children}</Provider>;
};

const useAppContext = () => useContext(appContext);

export { appContext, useAppContext, AppProvider };
