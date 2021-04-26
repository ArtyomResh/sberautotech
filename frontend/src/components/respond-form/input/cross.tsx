import React from 'react';

export interface IProps {
    className?: string
}

const Cross = ({ className }: IProps) => {

    return (
        <svg className={className} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="9.02351" y1="8.65349" x2="23.1656" y2="22.7956" stroke="#C0CCD5" strokeWidth="2" />
            <line x1="23.1661" y1="8.65352" x2="9.02395" y2="22.7957" stroke="#C0CCD5" strokeWidth="2" />
        </svg>
    );
};

export default Cross;
