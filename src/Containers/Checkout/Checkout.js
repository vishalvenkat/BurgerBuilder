import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import Spinner from '../../Components/UI/Spinners/Spinner';
class Checkout extends Component {
    state = { 
        ingredients: null,
        totalPrice: 0
     }
     componentDidMount() {
         const query = new URLSearchParams(this.props.location.search);
         const ingredient = {};
         let price = 0;
         for(let param of query.entries()) {
             if(param[0] !== 'price')
                ingredient[param[0].trim()] = +param[1];
             else 
                price = param[1];  
         }
         
        this.setState({ingredients: ingredient, totalPrice: price});
        }
    
     checkoutCancel = () => {
        this.props.history.goBack();
     }
     checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
     }
    render() { 
        let burger = <Spinner />
        if(this.state.ingredients) {
            burger = (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    continueCheckout={this.checkoutContinue}
                    cancelCheckout={this.checkoutCancel}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={
                        (props) => (
                                    <ContactData 
                                    ingredients={this.state.ingredients} 
                                    price={this.state.totalPrice}
                                    {...props}/>
                                )}
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
 
export default Checkout;