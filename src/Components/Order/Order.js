import React from 'react';
import './Order.css';
const Order = ({ingredients, price}) => {
    const ingredient = [];

    for(let name in ingredients) {
        ingredient.push({
            name: name,
            quantity: ingredients[name]
        })
    }
    const ingredientList = ingredient.map(ig => {
        return <span key={ig.name}
            style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px',
        border: '1px solid #ccc',
    padding: '5px'}}
        >{ig.name} <strong>({ig.quantity})</strong></span>
    })
    return ( 
        <div className="Order">
            <p>Ingredients: {ingredientList}</p>
            <p>Price: <strong>USD: {price}</strong></p>
        </div>
     );
}
 
export default Order;