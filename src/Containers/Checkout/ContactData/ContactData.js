import React, {  useState } from 'react';
import Button from '../../../Components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../Components/UI/Spinners/Spinner';
import Input from '../../../Components/UI/Input/Input';
import {purchaseBurger} from '../../../Store/actions/order';
import { connect } from 'react-redux';
const ContactData = props => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [orderForm, setOrderForm] = useState({
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
    });
    
    const checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }
    const inputChangedHandler = (event, id) => {
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedOrderFormElement = {
            ...updatedOrderForm[id]
        }
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        updatedOrderFormElement.touched = true;
        updatedOrderForm[id] = updatedOrderFormElement;

        let isValidForm = true;
        for(let id in updatedOrderForm) {
            isValidForm = updatedOrderForm[id].valid && isValidForm;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(isValidForm);
    }
    const submitData = (event) => {
        event.preventDefault();
        const formData = {};
        for(let key in orderForm) {
            formData[key] = orderForm[key].value;
        }
        const orderDetails = {
            ingredient: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId : props.userId
        }       
        props.purchaseBurger(orderDetails, props.token);   
    }
    
        const formArray = [];
        for(let key in orderForm) {
            formArray.push({
                id: key,
                config: orderForm[key]
            })
        }
                        
        let submitDiv = <div>
                            <h3>Enter your contact data</h3>
                            <form onSubmit={submitData}>
                                {formArray.map(ele => {
                                    return <Input 
                                        key={ele.id}
                                        elementType={ele.config.elementType}
                                        value={ele.config.value}
                                        elementConfig={ele.config.elementConfig} 
                                        changed={(event) => inputChangedHandler(event, ele.id)} 
                                        valid={ele.config.valid}
                                        touched={ele.config.touched}/>
                                })}
                                <Button btnType="Success" isDisabled={!formIsValid}>Order now</Button>
                            </form>
                        </div>
    

    if(props.loading) submitDiv = <Spinner />
        return ( 
            <div className="ContactData">
                {submitDiv}
            </div>
         );
    }

 
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        loading: state.orderReducer.loading,
        token : state.authReducer.token,
        userId : state.authReducer.userId
    };
}
const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (orderData, token) => dispatch(purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ContactData);