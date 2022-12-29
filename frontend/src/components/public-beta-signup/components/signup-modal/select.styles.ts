import { StylesConfig } from 'react-select';
import { CSSObject } from '@emotion/serialize';

interface ISelectOption {
    label: string,
    value: string
}

type TIsMulti = false;

const controlMediaQueryStyles = {
    'height'       : '80px',
    'fontSize'     : '20px',
    'lineHeight'   : '26px',
    'fontWeight'   : '400' as CSSObject['fontWeight'],
    'letterSpacing': '-0.05em'
};
const placeholderMediaQueryStyles = {
    'fontSize'     : '20px',
    'lineHeight'   : '26px',
    'fontWeight'   : '400' as CSSObject['fontWeight'],
    'letterSpacing': '-0.05em',

    '.ui-select__control--menu-is-open &': {
        'fontSize'     : '14px',
        'lineHeight'   : '18px',
        'letterSpacing': '-0.03em'
    },

    '.ui-select__value-container--has-value &': {
        'fontSize'     : '14px',
        'lineHeight'   : '18px',
        'letterSpacing': '-0.05em'
    }
};
const optionMediaQueryStyles = {
    'fontSize'     : '20px',
    'lineHeight'   : '26px',
    'fontWeight'   : '400' as CSSObject['fontWeight'],
    'letterSpacing': '-0.05em'
};
const valueContainerMediaQueryStyles = {
    'paddingTop': '34px'
};

const selectStyles: StylesConfig<ISelectOption, TIsMulti> = {
    container: (provided) => ({
        ...provided,
        'width': '100%',

        '.ui-select__control--menu-is-open': {
            'border'                 : '1px solid var(--color-black-dark)',
            'borderBottomColor'      : 'transparent',
            'borderBottomLeftRadius' : '0',
            'borderBottomRightRadius': '0',
            'boxShadow'              : '0px 0px 0px 1px var(--color-black-dark)'
        },

        '.ui-select__control--is-focused': {
            'border'   : '1px solid var(--color-black-dark)',
            'boxShadow': '0px 0px 0px 1px var(--color-black-dark)'
        }
    }),
    control: (provided) => ({
        ...provided,
        'position'     : 'relative',
        'padding'      : '0',
        'height'       : '90px',
        'border'       : '1px solid #43515c',
        'borderRadius' : '16px',
        'fontSize'     : '24px',
        'lineHeight'   : '30px',
        'fontWeight'   : '400' as CSSObject['fontWeight'],
        'letterSpacing': '-0.05em',
        'outline'      : 'none',
        'background'   : 'transparent',
        'cursor'       : 'pointer',
        'transition'   : '100ms ease-in-out',

        '@media (hover: hover) and (pointer: fine)': {
            '&:hover': {
                'border'   : '1px solid var(--color-black-dark)',
                'boxShadow': '0px 0px 0px 1px var(--color-black-dark)'
            }
        },

        '& .ui-select__single-value': {
            'color': 'var(--color-black-dark)'
        },

        '& .ui-select__dropdwon-icon': {
            'marginRight': '12px',
            'width'      : '12px',
            'height'     : '12px'
        },

        '& .ui-select__indicator svg': {
            'fill': 'var(--color-black-dark)'
        },

        '@media (min-width: 1280px) and (max-width: 1919px)': controlMediaQueryStyles,

        '@media (min-width: 744px) and (max-width: 1279px)': controlMediaQueryStyles,

        '@media (max-width: 743px)': controlMediaQueryStyles
    }),
    placeholder: (provided) => ({
        ...provided,
        'position'     : 'absolute',
        'top'          : '16px',
        'left'         : '16px',
        'margin'       : '0',
        'paddingRight' : '40px',
        'fontSize'     : '24px',
        'lineHeight'   : '30px',
        'fontWeight'   : '400' as CSSObject['fontWeight'],
        'letterSpacing': '-0.05em',
        'color'        : 'var(--color-black)',
        'transform'    : 'none',
        'transition'   : '100ms ease-in-out',

        '.ui-select__control--menu-is-open &': {
            'fontSize'  : '20px',
            'lineHeight': '26px'
        },

        '.ui-select__value-container--has-value &': {
            'fontSize'  : '20px',
            'lineHeight': '26px'
        },

        '@media (min-width: 1280px) and (max-width: 1919px)': placeholderMediaQueryStyles,

        '@media (min-width: 744px) and (max-width: 1279px)': placeholderMediaQueryStyles,

        '@media (max-width: 743px)': placeholderMediaQueryStyles
    }),
    menuList: (provided) => ({
        ...provided,
        'padding'  : '0',
        'maxHeight': '150px',

        '@media (hover: hover) and (pointer: fine)': {
            '& .ui-select__option:hover': {
                'backgroundColor': 'white',
                'color'          : 'var(--color-black)'
            }
        },

        '& .ui-select__option--is-focused': {
            'backgroundColor': 'var(--color-neutral)',
            'color'          : 'var(--color-black)'
        },

        '& .ui-select__option--is-selected': {
            'display': 'none'
        }
    }),
    menu: (provided) => ({ ...provided,
        'position'     : 'absolute',
        'top'          : 'calc(100% - 16px)',
        'borderRadius' : '0 0 16px 16px',
        'boxShadow'    : 'none',
        'border'       : '2px solid var(--color-black-dark)',
        'borderTop'    : 'none',
        'overflow'     : 'hidden',
        'background'   : 'var(--color-neutral)',
        'marginTop'    : '0',
        'paddingTop'   : '0',
        'paddingBottom': '16px',
        'width'        : 'calc(100% + 2px)',
        'left'         : '-1px' }),
    option: (provided) => ({
        ...provided,
        'cursor'       : 'pointer',
        'color'        : 'var(--color-black-dark)',
        'fontSize'     : '24px',
        'lineHeight'   : '30px',
        'fontWeight'   : '400'as CSSObject['fontWeight'],
        'letterSpacing': '-0.05em',
        'padding'      : '4px 16px',

        '@media (min-width: 1280px) and (max-width: 1919px)': optionMediaQueryStyles,

        '@media (min-width: 744px) and (max-width: 1279px)': optionMediaQueryStyles,

        '@media (max-width: 743px)': optionMediaQueryStyles
    }),
    valueContainer: (provided) => ({
        ...provided,
        'position'     : 'static',
        'paddingTop'   : '42px',
        'paddingBottom': '16px',
        'paddingLeft'  : '16px',
        'height'       : '100%',

        '@media (min-width: 1280px) and (max-width: 1919px)': valueContainerMediaQueryStyles,

        '@media (min-width: 744px) and (max-width: 1279px)': valueContainerMediaQueryStyles,

        '@media (max-width: 743px)': valueContainerMediaQueryStyles
    }),
    singleValue: (provided) => ({
        ...provided,
        'position'  : 'static',
        'top'       : '0',
        'margin'    : '0',
        'width'     : 'calc(100% - 1px)',
        'lineHeight': '34px',
        'transform' : 'translateY(0)'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        'padding'   : '16px',
        'alignItems': 'flex-start',

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
