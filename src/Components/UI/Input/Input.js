import React from 'react';
import './Input.css';
const Input = ({elementType, value, elementConfig,label,changed, valid, touched}) => {
    let inputElement = null;
    let classes = ["InputElement"];
    if(!valid && touched) classes.push("invalid")
    switch(elementType) {
        case('input'):
            inputElement = <input className={classes.join(' ')}
                                {...elementConfig}
                                value={value}
                                onChange={changed}
                                />
            break;
        case('textarea'):
            inputElement = <textarea className={classes.join(' ')} 
                                {...elementConfig}
                                value={value}
                                onChange={changed}
                                />
            break;
        case('select'):
            inputElement = (<select className={classes.join(' ')} 
                                value={value}
                                onChange={changed}
                            >
                                {elementConfig.options.map(option => {
                                   return <option value={option.value} key={option.value}>{option.displayValue}</option>
                                })}
                            </select>)
            break;
        default:
            inputElement = <input className={classes.join(' ')} 
                                {...elementConfig}
                                value={value}
                                onChange={changed}
                                />
            break;
    }
    return ( 
        <div className="Input">
            <label className="Label">{label}</label>
            {inputElement}
        </div>
     );
}
 
export default Input;