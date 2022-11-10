import { StylesConfig } from 'react-select';

interface ISelectOption {
    label: string,
    value: string
}

type TIsMulti = false;

const controlMediaQueryStyles = {
    'height'        : '80px',
    'font-size'     : '20px',
    'line-height'   : '26px',
    'font-weight'   : '400',
    'letter-spacing': '-0.05em'
};
const placeholderMediaQueryStyles = {
    'font-size'     : '20px',
    'line-height'   : '26px',
    'font-weight'   : '400',
    'letter-spacing': '-0.05em',

    '.ui-select__control--menu-is-open &': {
        'font-size'     : '14px',
        'line-height'   : '18px',
        'letter-spacing': '-0.03em'
    },

    '.ui-select__value-container--has-value &': {
        'font-size'     : '14px',
        'line-height'   : '18px',
        'letter-spacing': '-0.05em'
    }
};
const optionMediaQueryStyles = {
    'font-size'     : '20px',
    'line-height'   : '26px',
    'font-weight'   : '400',
    'letter-spacing': '-0.05em'
};
const valueContainerMediaQueryStyles = {
    'padding-top': '34px'
};

const selectStyles: StylesConfig<ISelectOption, TIsMulti> = {
    container: (provided) => ({
        ...provided,
        'width': '100%',

        '.ui-select__control--menu-is-open': {
            'border'                 : '1px solid #10181F',
            'borderBottomColor'      : 'transparent',
            'borderBottomLeftRadius' : '0',
            'borderBottomRightRadius': '0',
            'box-shadow'             : '0px 0px 0px 1px #10181F'
        }
    }),
    control: (provided) => ({
        ...provided,
        'position'      : 'relative',
        'padding'       : '0',
        'height'        : '90px',
        'border'        : '1px solid #43515c',
        'border-radius' : '16px',
        'font-size'     : '24px',
        'line-height'   : '30px',
        'font-weight'   : '400',
        'letter-spacing': '-0.05em',
        'outline'       : 'none',
        'background'    : 'transparent',
        'cursor'        : 'pointer',
        'transition'    : '100ms ease-in-out',

        '&:hover': {
            'border'    : '1px solid #10181F',
            'box-shadow': '0px 0px 0px 1px #10181F'
        },

        '& .ui-select__single-value': {
            'color': '#10181F'
        },

        '& .ui-select__dropdwon-icon': {
            'margin-right': '12px',
            'width'       : '12px',
            'height'      : '12px'
        },

        '& .ui-select__indicator svg': {
            'fill': '#43515C'
        },

        '@media (min-width: 1280px) and (max-width: 1919px)': controlMediaQueryStyles,

        '@media (min-width: 744px) and (max-width: 1279px)': controlMediaQueryStyles,

        '@media (max-width: 743px)': controlMediaQueryStyles
    }),
    placeholder: (provided) => ({
        ...provided,
        'position'      : 'absolute',
        'top'           : '16px',
        'left'          : '16px',
        'margin'        : '0',
        'padding-right' : '40px',
        'font-size'     : '24px',
        'line-height'   : '30px',
        'font-weight'   : '400',
        'letter-spacing': '-0.05em',
        'color'         : '#1F272E',
        'transform'     : 'none',
        'transition'    : '100ms ease-in-out',

        '.ui-select__control--menu-is-open &': {
            'font-size'  : '20px',
            'line-height': '26px'
        },

        '.ui-select__value-container--has-value &': {
            'font-size'  : '20px',
            'line-height': '26px'
        },

        '@media (min-width: 1280px) and (max-width: 1919px)': placeholderMediaQueryStyles,

        '@media (min-width: 744px) and (max-width: 1279px)': placeholderMediaQueryStyles,

        '@media (max-width: 743px)': placeholderMediaQueryStyles
    }),
    menuList: (provided) => ({
        ...provided,
        'padding'   : '0',
        'max-height': '150px',

        '& .ui-select__option--is-focused': {
            'background-color': '#FFF',
            'color'           : 'black'
        },

        '& .ui-select__option--is-selected': {
            'display': 'none'
        }
    }),
    menu: (provided) => ({ ...provided,
        'position'      : 'absolute',
        'top'           : 'calc(100% - 16px)',
        'border-radius' : '0 0 16px 16px',
        'box-shadow'    : 'none',
        'border'        : '2px solid #10181F',
        'border-top'    : 'none',
        'overflow'      : 'hidden',
        'background'    : '#e0e6eb',
        'margin-top'    : '0',
        'padding-top'   : '0',
        'padding-bottom': '16px',
        'width'         : 'calc(100% + 2px)',
        'left'          : '-1px' }),
    option: (provided) => ({
        ...provided,
        'cursor'        : 'pointer',
        'color'         : '#10181F',
        'font-size'     : '24px',
        'line-height'   : '30px',
        'font-weight'   : '400',
        'letter-spacing': '-0.05em',
        'padding'       : '4px 16px',

        '@media (min-width: 1280px) and (max-width: 1919px)': optionMediaQueryStyles,

        '@media (min-width: 744px) and (max-width: 1279px)': optionMediaQueryStyles,

        '@media (max-width: 743px)': optionMediaQueryStyles
    }),
    valueContainer: (provided) => ({
        ...provided,
        'position'      : 'static',
        'padding-top'   : '42px',
        'padding-bottom': '16px',
        'padding-left'  : '16px',
        'height'        : '100%',

        '@media (min-width: 1280px) and (max-width: 1919px)': valueContainerMediaQueryStyles,

        '@media (min-width: 744px) and (max-width: 1279px)': valueContainerMediaQueryStyles,

        '@media (max-width: 743px)': valueContainerMediaQueryStyles
    }),
    singleValue: (provided) => ({
        ...provided,
        'position'   : 'static',
        'top'        : '0',
        'margin'     : '0',
        'width'      : 'calc(100% - 1px)',
        'line-height': '34px',
        'transform'  : 'translateY(0)'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        'padding'    : '16px',
        'align-items': 'flex-start',

        '& .ui-select__indicator': {
            'padding': '0'
        }
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        'width:'    : 0,
        'visibility': 'hidden'
    })
};

export default selectStyles;