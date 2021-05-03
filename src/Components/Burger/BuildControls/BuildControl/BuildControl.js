import React from 'react';
import './BuildControl.css';
const BuildControl = ({label,AddIngredient, RemoveIngredient,disabled}) => {
    return (
        <div className="BuildControl">
            <div className="Label">{label}</div>
            <button className="Less" onClick={RemoveIngredient} disabled={disabled}>Less</button>
            <button className="More" onClick={AddIngredient}>More</button>
        </div>
    )
}

export default BuildControl;