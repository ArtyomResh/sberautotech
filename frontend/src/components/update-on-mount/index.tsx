import { useIsClient } from '../../utils/hooks/useIsClient';
import React from 'react';

// Компонент-хак для решения проблем с регидрацией реакта на клиенте
// https://github.com/gatsbyjs/gatsby/discussions/17914?sort=top
export const UpdateOnMount: React.FC = ({ children }) => {
    const isClient = useIsClient();

    return <React.Fragment key={String(isClient)}>{children}</React.Fragment>;
};
