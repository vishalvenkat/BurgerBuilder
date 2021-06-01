import React, { useEffect, useState } from 'react';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import {connect} from 'react-redux';
import './Auth.css';
import { auth, setAuthRedirectPath } from '../../Store/actions/auth';
import Spinner from '../../Components/UI/Spinners/Spinner';
import {Redirect} from 'react-router-dom';
const Auth = props => {
    const [controls, setControls] = useState({
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
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    });
    const [isSignUp,setIsSignUp] = useState(true);

    const {building, authRedirectPath, setAuthRedirectPath} = props;

     useEffect(() => {
        if(!building && authRedirectPath !== '/')
        setAuthRedirectPath()
     },[building, authRedirectPath,setAuthRedirectPath]);

     const checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }
    const inputChangedHandler = (event, id) => {
        const updatedOrderForm = {
            ...controls,
            [id]: {
                ...controls[id],
                value: event.target.value,
                valid: checkValidity(event.target.value,controls[id].validation),
                touched: true
            }
        };
        setControls(updatedOrderForm)
    }
    const toggleSignIn = () => setIsSignUp(!isSignUp);
    
    const authenticateUser = (event) => {
        event.preventDefault();
        props.auth(controls.email.value,controls.password.value, isSignUp);
    }
        const formArray = [];
        for(let key in controls) {
            formArray.push({
                id: key,
                config: controls[key]
            })
        }
        const form = formArray.map(ele => {
            return <Input 
                                        key={ele.id}
                                        elementType={ele.config.elementType}
                                        value={ele.config.value}
                                        elementConfig={ele.config.elementConfig} 
                                        changed={(event) => inputChangedHandler(event, ele.id)} 
                                        valid={ele.config.valid}
                                        touched={ele.config.touched}/>
        })
        let authForm = <div>
            <form onSubmit={authenticateUser}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Success" clicked={toggleSignIn}>Switch to {isSignUp ? 'Sign Up(existing user)' : 'Sign In(new user)'}</Button>
        </div>
        if(props.loading) authForm = <Spinner />
        return ( 
            <div className="Auth">
                {props.isAuthenticated ? <Redirect to={props.authRedirectPath} /> : null}
                {props.error ? props.error.message : null}
                {authForm}
            </div>
         );
    }


const mapStateToProps = state => {
    return {
        loading : state.authReducer.loading,
        error : state.authReducer.error,
        isAuthenticated : state.authReducer.token !== null,
        building: state.burgerBuilderReducer.building,
        authRedirectPath: state.authReducer.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password,isSignUp) => dispatch(auth(email, password, isSignUp)),
        setAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);