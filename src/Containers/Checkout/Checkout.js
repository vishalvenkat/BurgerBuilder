import React from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
const Checkout = props => {

     const checkoutCancel = () => props.history.goBack();
     
     const checkoutContinue = () => props.history.replace('/checkout/contact-data');
     
    
        let burger = <Redirect to="/" />
        if(props.ingredients) {
            const redirect = props.purchased ? <Redirect to="/" /> : null;
            burger = (
            <div>
                {redirect}
                <CheckoutSummary 
                    ingredients={props.ingredients}
                    continueCheckout={checkoutContinue}
                    cancelCheckout={checkoutCancel}
                />
                <Route 
                    path={props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
            )
        }
        return burger;
    }

 

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.isPurchased
        
    };
}

export default connect(mapStateToProps)(Checkout);