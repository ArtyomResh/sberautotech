import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect, { Props } from 'react-select';
import { customStyles } from './config';


const Select = React.forwardRef(({ placeholder, name, value, options, onChange }: Props, ref) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <ReactSelect
                    {...field}
                    placeholder={placeholder}
                    inputRef={ref}
                    value={value}
                    options={options}
                    styles={customStyles}
                    classNamePrefix="ui-select"
                    isSearchable={false}
                    onChange={onChange}
                />
            )}
        />
    );
});

export default Select;
