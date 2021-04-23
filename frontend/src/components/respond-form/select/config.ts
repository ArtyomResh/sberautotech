// import { IColorConfig, ICustomStyles, IColorsThemesSet } from './types';
export const colors = {
    input: {
        disabled: 'var(--color-gray-2-hover)',
        focused : 'var(--color-input-background-focused)',
        hovered : 'var(--color-input-background-hover)',
        static  : 'var(--color-gray-4-input-background)'
    },

    text: {
        disabled: 'var(--color-black-3-disabled)',
        focused : 'var(--color-text-input)',
        hovered : 'var(--color-text-input)',
        static  : 'var(--color-white-1)'
    },

    icon: {
        disabled: 'var(--color-black-1)',
        focused : 'var(--color-black-1)',
        hovered : 'var(--color-black-1)',
        static  : 'var(--color-input-background-focused)'
    }
};

export const customStyles = {
    multiValueRemove: (provided) => ({
        ...provided,
        'padding'       : 0,
        'width'         : 20,
        'justifyContent': 'center'
    }),
    container: (provided, { isDisabled, isFocused }) => ({
        ...provided,
        'fontFamily'               : 'var(--font-family-primary)',
        'fontStyle'                : 'normal',
        'fontWeight'               : 'normal',
        'fontSize'                 : '14px',
        'boxShadow'                : 'none',
        '& .ui-select__placeholder': {
            // color: getColor({ isDisabled, isFocused, kind: 'text', theme: 'darkTheme' })
        },
        '&:hover .ui-select__placeholder': {
            // color: getColor({ isDisabled, isFocused, isHovered: true, kind: 'text', theme: 'darkTheme' })
        }
    }),
    control: (provided, { isFocused, isDisabled }) => ({
        ...provided,
        'padding'     : '18px 0',
        'cursor'      : isDisabled ? 'not-allowed' : 'pointer',
        'color'       : 'var(--color-text-input)',
        'borderRadius': '12px',
        'borderWidth' : '0px',
        'boxShadow'   : 'none',
        'outline'     : 'none',
        'fontSize'    : '14px',
        // 'background'  : getColor({ isDisabled, isFocused, kind: 'input', theme: 'darkTheme' }),
        '&:hover'     : {
            // 'background': getColor({ isDisabled, isFocused, isHovered: true, kind: 'input', theme: 'darkTheme' })
        },

        '& .ui-select__single-value': {
            // color: getColor({ isDisabled, isFocused, kind: 'text', theme: 'darkTheme' })
        },
        '&:hover .ui-select__single-value': {
            // color: getColor({ isDisabled, isFocused, isHovered: true, kind: 'text', theme: 'darkTheme' })
        },
        '& .ui-select__dropdwon-icon': {
            'marginRight': '12px',
            'width'      : '12px',
            'height'     : '12px'
        },
        '& .ui-select__dropdwon-icon, & .search-icon': {
            // fill: getColor({ isDisabled, isFocused, kind: 'icon', theme: 'darkTheme' })
        },
        '&:hover .ui-select__dropdwon-icon, &:hover .search-icon': {
            // fill: getColor({ isDisabled, isFocused, isHovered: true, kind: 'icon', theme: 'darkTheme' })
        }
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--color-black-1)'
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '16px 0 16px 0'
    }),
    menu: (provided) => ({
        ...provided,
        'position'                   : 'absolute',
        'top'                        : '48px',
        'border'                     : 'none',
        'borderRadius'               : '12px',
        'boxShadow'                  : 'none',
        'background'                 : 'var(--color-dropdown-background)',
        '& .ui-select__group-heading': {
            'color'        : 'var(--color-group-heading)',
            'textTransform': 'capitalize',
            'fontSize'     : '14px',
            'paddingLeft'  : '16px',
            'paddingRight' : '16px'
        },
        '& .ui-select__group': {
            'paddingBottom': 0
        }
    }),
    option: (provided, { isSelected }) => ({
        ...provided,
        'cursor'    : 'pointer',
        // 'color'     : isSelected ? colors.darkTheme.input.focused : colors.darkTheme.text.static,
        'background': 'var(--color-dropdown-background)',
        'fontSize'  : '16px',
        'padding'   : '12px 16px'
    })
};

