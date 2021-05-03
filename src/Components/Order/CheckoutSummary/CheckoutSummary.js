import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';
const CheckoutSummary = ({ingredients, continueCheckout, cancelCheckout}) => (
    <div className="CheckoutSummary">
        <h1>Your burger is being prepared!</h1>
        <div>
            <Burger ingredients={ingredients}/>
            <Button btnType="Danger" clicked={cancelCheckout}>Cancel</Button>
            <Button btnType="Success" clicked={continueCheckout}>Continue</Button>
        </div>
    </div>
)
 
export default CheckoutSummary;
