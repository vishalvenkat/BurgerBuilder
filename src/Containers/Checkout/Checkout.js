import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import Spinner from '../../Components/UI/Spinners/Spinner';
import { connect } from 'react-redux';
class Checkout extends Component {
     checkoutCancel = () => 
        this.props.history.goBack();
     
     checkoutContinue = () => 
        this.props.history.replace('/checkout/contact-data');
     
    render() { 
        let burger = <Spinner />
        
        if(this.props.ingredients) {
            burger = (
            <div>
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
        return ( 
        <div>
            {burger}
        </div>
        );
    }
}
 

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
}
export default connect(mapStateToProps,null)(Checkout);