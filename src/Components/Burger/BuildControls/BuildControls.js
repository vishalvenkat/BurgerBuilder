import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]
const BuildControls = ({AddIngredient, RemoveIngredient, disabledInfo, price,isPurchasable,isOrdered, isAuthenticated}) =>  (
        <div className="BuildControls">
            <p>Price for this Burger: <strong>{price.toFixed(2)}</strong></p>
            {controls.map(control => (
                    <BuildControl 
                        key={control.label} 
                        label={control.label} 
                        AddIngredient={() => AddIngredient(control.type)}
                        RemoveIngredient={() => RemoveIngredient(control.type)}  
                        disabled={disabledInfo[control.type]}
                    />                         
            ))}
            <button 
            className="OrderButton" 
            disabled={!isPurchasable}
            onClick={isOrdered}
            >{isAuthenticated ? 'ORDER NOW' : 'Sign up to order'}</button>
        </div>
);

export default BuildControls;