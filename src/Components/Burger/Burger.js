import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import './Burger.css';

const Burger = ({ingredients}) => {
    let ingredient = Object.keys(ingredients) // returns array of keys from the object
                        .map(ing => {
                            return [...Array(ingredients[ing])] // creates an array based on that value
                                    .map((_, i) => { // Taking the index to form the key
                                        return <Ingredient key={ing + i} type={ing} />
                                    })
                        })
                        .reduce((previous, current) => { // Previous starts from an empty array as given in the default.Current starts with 0 index.
                            return previous.concat(current) // Concats the inner array elements to one single array to find the length.
                        },[]); 

        // Changing the jsx when there is no ingredients added
    if(ingredient.length === 0) ingredient = <p>Please add ingredient to start building the burger.</p>                    
    
    return (
        <div className="Burger">
            <Ingredient type='bread-top' />
                {ingredient}
            <Ingredient type='bread-bottom' />
        </div>
    )
}
export default Burger;