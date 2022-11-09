import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect, { Props } from 'react-select';
import { defaultStyles } from './config';

const Select = React.forwardRef(({ placeholder, name, value, isDisabled, options, onChange, noOptionsMessage, styles = defaultStyles, components }: Props, ref) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <ReactSelect
                    isDisabled={isDisabled}
                    {...field}
                    placeholder={placeholder}
                    inputRef={ref}
                    value={value}
                    options={options}
                    styles={styles}
                    classNamePrefix="ui-select"
                    isSearchable={false}
                    onChange={onChange}
                    noOptionsMessage={noOptionsMessage}
                    components={components}
                />
            )}
        />
    );
});

export default Select;
