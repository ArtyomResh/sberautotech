import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Props } from 'react-select';

import Select from './index';
// import { IOuterProps } from './types';

export const FormSelect: React.FC<Props & IOuterProps> = (props) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={props.name}
            defaultValue={props.defaultValue}
            render={({ value, ...renderProps }) => <Select {...renderProps} {...props} defaultValue={value} />}
        />
    );
};
