import React from 'react';
import ReactSelect from 'react-select';
import { customStyles } from './config';

import style from './index.css';

import { useClassnames } from '../../../hooks/use-classnames';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

// const customStyles = {
//     option: (provided, state) => ({
// 	  ...provided,
// 	  borderBottom: '1px dotted pink',
// 	  color       : state.isSelected ? 'red' : 'blue',
// 	  padding     : 20
//     }),
//     control: () => ({
// 	  // none of react-select's styles are passed to <Control />
// 	  width: 200
//     }),
//     singleValue: (provided, state) => {
// 	  const opacity = state.isDisabled ? 0.5 : 1;
// 	  const transition = 'opacity 300ms';

// 	  return { ...provided, opacity, transition };
//     }
// };

// // const common = {
// //     // styles             : customStyles,
// //     options            : props.options,
// //     defaultValue       : props.defaultValue,
// //     onChange           : props.onChange,
// //     name               : props.name,
// //     value              : props.value,
// //     hideSelectedOptions: false,
// //     isDisabled         : props.isDisabled,
// //     placeholder        : props.placeholder,
// //     blurInputOnSelect  : true,
// //     isMulti            : props.multi,
// //     isClearable        : props.isClearable,
// //     components         : {
// //         IndicatorSeparator: () => null, // eslint-disable-line @typescript-eslint/naming-convention
// //         DropdownIndicator : () => <IconArrowDown svg={{ className: cn('ui-select__dropdwon-icon') }} />, // eslint-disable-line @typescript-eslint/naming-convention
// //         Group,
// //         GroupHeading,
// //         Option,
// //         MultiValue,
// //         MultiValueRemove,
// //         ...props.components
// //     },
// //     classNamePrefix: 'ui-select'
// // };

const MyComponent = () => {
    const cn = useClassnames(style);

    return (
        <div className={cn('field')} >


            <ReactSelect options={options} styles={customStyles} />
            {/* <select name="" id="" className={cn('select')}>
                 <option value="">One</option>
                 <option value="">Two</option>
                 <option value="">Three</option>
                 <option value="">Four</option>
                 <option value="">Five</option>s
                 <option value="">Six</option>
                 <option value="">Seven</option>
                 <option value="">Eight</option>
                 <option value="">Nine</option>
                 <option value="">Ten</option>
             </select> */}
        </div>
    );
};

export default MyComponent;
