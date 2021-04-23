import React, { createContext, ReactElement, useState } from 'react';

const appContext = createContext<{activeTab: number, setActiveTab: null | React.Dispatch<React.SetStateAction<number>>}>(
    {
        activeTab   : 0,
        setActiveTab: null
    }
);
const { Provider } = appContext;

const AppProvider = ({ children }: { children: ReactElement }) => {
    const [activeTab, setActiveTab] = useState(0);

    console.log('APP PROVIDER');

    return <Provider value={{ activeTab, setActiveTab }}>{children}</Provider>;
};

export { appContext, AppProvider };
