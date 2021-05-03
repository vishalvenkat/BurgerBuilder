import React from 'react';
import Aux from '../../../hoc/hoc';
import Button from '../../UI/Button/Button';

const OrderSummary = ({ingredients, closeModal,proceedOrder, price}) => {
    const ingredientList = Object.keys(ingredients)
                            .map(ing => {
                                return  <li key={ing}>
                                            <span  style={{textTransform: 'capitalize'}}>{ing}</span>: <strong>{ingredients[ing]}</strong>
                                        </li>
                            });
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your burger is ready with: </p>
            <ul>
                {ingredientList}
            </ul>
            <p>Total Price: <strong>{price.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Button btnType="Danger" clicked={closeModal}>Cancel </Button>
            <Button btnType="Success" clicked={proceedOrder}>CheckOut</Button>
    </Aux>
    )
};

export default OrderSummary;