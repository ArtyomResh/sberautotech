import { StylesConfig } from 'react-select';

export const customStyles: StylesConfig = {
    container: (provided) => ({
        ...provided,
        'width'                            : '100%',
        '.ui-select__control--menu-is-open': {
            'border'                 : '1px solid #10181F',
            'borderBottomColor'      : 'transparent',
            'boxShadow'              : '0px 0px 0px 1px #10181F',
            'borderBottomLeftRadius' : '0',
            'borderBottomRightRadius': '0'
        }
    }),
    control: (provided, state) => ({
        ...provided,
        'padding'     : '12px 0',
        'cursor'      : 'pointer',
        'borderRadius': '15px',
        'borderWidth' : '0px',
        'outline'     : 'none',
        'fontSize'    : '24px',
        'border'      : state.hasValue ? '1px solid #4E565E' : '1px solid #10181F',
        'boxShadow'   : state.hasValue ? '0px 0px 0px 1px #4E565E' : 'none',
        'background'  : 'transparent',

        '&:hover': {
            'border'   : '1px solid #10181F',
            'boxShadow': '0px 0px 0px 1px #10181F'
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
        'color'    : '#43515C',
        'top'      : 'auto',
        'fontSize' : '18px',
        'position' : 'static',
        'transform': 'none',
        '& + input': {
            'height': 0
        }
    }),
    menuList: (provided) => ({
        ...provided,
        'padding'                         : '0',
        'maxHeight'                       : '150px',
        '& .ui-select__option--is-focused': {
            'backgroundColor': '#FFF',
            'color'          : 'black'
        },
        '& .ui-select__option--is-selected': {
            'display': 'none'
        }
    }),
    menu: (provided) => ({ ...provided,
        'position'    : 'absolute',
        'top'         : 'calc(100% - 2px)',
        'borderRadius': ' 0 0 15px 15px',
        'boxShadow'   : 'none',
        'border'      : '2px solid #10181F',
        'borderTop'   : 'none',
        'overflow'    : 'hidden',
        'background'  : '#FFF',
        'marginTop'   : '0',
        'paddingTop'  : '10px',
        'width'       : 'calc(100% + 2px)',
        'left'        : '-1px' }),
    option: (provided) => ({
        ...provided,
        'cursor'  : 'pointer',
        'color'   : '#10181F',
        'fontSize': '16px',
        'padding' : '4px 16px'
    }),
    valueContainer: (provided) => ({
        ...provided,
        'padding': '0 8px'
    })
};

