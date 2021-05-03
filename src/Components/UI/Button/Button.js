import React from 'react';
import './Button.css';
const Button = ({children, clicked, btnType,isDisabled}) => (
    <button
    disabled={isDisabled}
    className={["Button", btnType].join(' ')}
    onClick={clicked}>{children}</button>
);

export default Button;