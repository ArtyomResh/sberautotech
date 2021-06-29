import React, { createContext, ReactElement, useState, useContext } from 'react';

const appContext = createContext<{isPopupVisible: boolean, setIsPopupVisible: null | React.Dispatch<React.SetStateAction<boolean>>}>({
    isPopupVisible   : false,
    setIsPopupVisible: null
});
const { Provider } = appContext;

const AppProvider = ({ children }: { children: ReactElement }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    return <Provider value={{ isPopupVisible, setIsPopupVisible }} >{children}</Provider>;
};

const useAppContext = () => useContext(appContext);

export { appContext, useAppContext, AppProvider };
