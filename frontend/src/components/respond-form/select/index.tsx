import React from 'react';
import ReactSelect, { Props } from 'react-select';
import { customStyles } from './config';


const Select = ({ placeholder, name, ref, value, options }: Props) => {
    return (
        <ReactSelect
            placeholder={placeholder}
            inputRef={ref}
            value={value}
            name={name}
            options={options}
            styles={customStyles}
            classNamePrefix="ui-select"
            isSearchable={false}
        />
    );
};

export default Select;
