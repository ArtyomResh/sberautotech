import { useClassnames } from '../../hooks/use-classnames';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect, { Props } from 'react-select';
import { defaultStyles } from './config';
import style from './index.css';

type TSelectProps = Props & {
    name: string,
    required?: boolean
};
const Select: React.FC<TSelectProps> = React.forwardRef<unknown, TSelectProps>(({ placeholder, name, isDisabled, options, onChange, noOptionsMessage, styles = defaultStyles, components, required }, ref) => {
    const { control } = useFormContext();
    const cn = useClassnames(style);

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required && 'Обязательное поле' }}
            render={({ field, fieldState }) => {
                const handleChange: Props['onChange'] = (...args) => {
                    field.onChange(...args);
                    onChange?.(...args);
                };

                const error = fieldState.error?.message;

                return (
                    <div className={cn('select')}>
                        <ReactSelect
                            isDisabled={isDisabled}
                            {...field}
                            placeholder={placeholder}
                            inputRef={ref}
                            options={options}
                            styles={{
                                ...styles,
                                control: (provided) => ({
                                    ...styles.control(provided),
                                    ...(error ? { 'border': '1px solid red', 'boxShadow': '0 0 0 1px #ff364d;' } : {})
                                })
                            }}
                            classNamePrefix="ui-select"
                            isSearchable={false}
                            onChange={handleChange}
                            noOptionsMessage={noOptionsMessage}
                            components={components}
                        />
                        <label htmlFor={name} className={cn('select__error-label')} >{error}</label>
                    </div>
                );
            }}
        />
    );
});

export default Select;
