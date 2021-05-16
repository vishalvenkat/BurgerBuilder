import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {

     checkoutCancel = () => 
        this.props.history.goBack();
     
     checkoutContinue = () => 
        this.props.history.replace('/checkout/contact-data');
     
    render() { 
        let burger = <Redirect to="/" />
        if(this.props.ingredients) {
            const redirect = this.props.purchased ? <Redirect to="/" /> : null;
            burger = (
            <div>
                {redirect}
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    continueCheckout={this.checkoutContinue}
                    cancelCheckout={this.checkoutCancel}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
            )
        }
        return burger;
    }
}
 

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.isPurchased
        
    };
}

export default connect(mapStateToProps)(Checkout);