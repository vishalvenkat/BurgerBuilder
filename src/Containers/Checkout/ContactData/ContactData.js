import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinners/Spinner';
import Input from '../../../Components/UI/Input/Input';

import { connect } from 'react-redux';
class ContactData extends Component {
    state = {  
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                valid: true,
                value: 'fastest',
                validation: {
                    required: true
                },
                touched: false
            }
        },
        loading: false,
        formIsValid: false
    }
    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, id) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedOrderFormElement = {
            ...updatedOrderForm[id]
        }
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        updatedOrderFormElement.touched = true;
        updatedOrderForm[id] = updatedOrderFormElement;

        let isValidForm = true;
        for(let id in updatedOrderForm) {
            isValidForm = updatedOrderForm[id].valid && isValidForm;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: isValidForm});
    }
    submitData = (event) => {
        event.preventDefault();
        const formData = {};
        for(let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const orderDetails = {
            ingredient: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        
        this.setState({loading: true});
         axios.post('/orders.json',orderDetails)
         .then(response => {
            this.setState({loading: false})
            this.props.history.push('/')
         })
         .catch(error => {
             this.setState({loading: false})
             this.props.history.push('/')
         });
        
    }
    
    render() { 
        const formArray = [];
        for(let key in this.state.orderForm) {
            formArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
                        
        let submitDiv = <div>
                            <h3>Enter your contact data</h3>
                            <form onSubmit={this.submitData}>
                                {formArray.map(ele => {
                                    return <Input 
                                        key={ele.id}
                                        elementType={ele.config.elementType}
                                        value={ele.config.value}
                                        elementConfig={ele.config.elementConfig} 
                                        changed={(event) => this.inputChangedHandler(event, ele.id)} 
                                        valid={ele.config.valid}
                                        touched={ele.config.touched}/>
                                })}
                                <Button btnType="Success" isDisabled={!this.state.formIsValid}>Order now</Button>
                            </form>
                        </div>
    

    if(this.state.loading) submitDiv = <Spinner />
        return ( 
            <div className="ContactData">
                {submitDiv}
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
export default connect(mapStateToProps,null)(ContactData);