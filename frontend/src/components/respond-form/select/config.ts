import { StylesConfig } from 'react-select';

export const customStyles: StylesConfig = {
    container: (provided) => ({
        ...provided,
        'width'                            : '100%',
        '.ui-select__control--menu-is-open': {
            'border'      : '2px solid #10181F',
            'borderBottom': 'none'
        }
    }),
    control: (provided) => ({
        ...provided,
        'padding'     : '18px 0',
        'cursor'      : 'pointer',
        'borderRadius': '15px',
        'borderWidth' : '0px',
        'boxShadow'   : 'none',
        'outline'     : 'none',
        'fontSize'    : '24px',
        'border'      : '1px solid #4E565E',
        'background'  : '#C0CCD5',

        '&:hover': {
            'border': '2px solid black'
        },

        '& .ui-select__single-value': {
            'color': 'black'
        },

        '& .ui-select__dropdwon-icon': {
            'marginRight': '12px',
            'width'      : '12px',
            'height'     : '12px'
        },
        '& .ui-select__indicator svg': {
            'fill': '#43515C'
        }
    }),
    placeholder: (provided) => ({
        ...provided,
        'color'        : '#43515C',
        'paddingBottom': '20px',
        'fontSize'     : '18px'
    }),
    menuList: (provided) => ({
        ...provided,
        'padding'                         : '0',
        'maxHeight'                       : '150px',
        '& .ui-select__option--is-focused': {
            'backgroundColor': '#43515C',
            'color'          : '#FFFF'
        },
        '& .ui-select__option--is-selected': {
            'display': 'none'
        }
    }),
    menu: (provided) => ({ ...provided,
        'position'    : 'absolute',
        'top'         : '35px',
        'borderRadius': ' 0 0 15px 15px',
        'boxShadow'   : 'none',
        'border'      : '2px solid #10181F',
        'borderTop'   : 'none',
        'overflow'    : 'hidden',
        'background'  : '#C0CCD5',
        'marginTop'   : '20px',
        'paddingTop'  : '10px' }),
    option: (provided) => ({
        ...provided,
        'cursor'  : 'pointer',
        'color'   : '#10181F',
        'fontSize': '16px',
        'padding' : '4px 16px'
    })
};

