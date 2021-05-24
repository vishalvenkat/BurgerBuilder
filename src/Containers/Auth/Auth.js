import React, { Component } from 'react';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import {connect} from 'react-redux';
import './Auth.css';
import { auth, setAuthRedirectPath } from '../../Store/actions/auth';
import Spinner from '../../Components/UI/Spinners/Spinner';
import {Redirect} from 'react-router-dom';
class Auth extends Component {
    state = { 
        controls: {
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
        },
        isSignUp: true
     }


     componentDidMount() {
         if(!this.props.building && this.props.authRedirectPath !== '/')
            this.props.setAuthRedirectPath()
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
            ...this.state.controls,
            [id]: {
                ...this.state.controls[id],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[id].validation),
                touched: true
            }
        };
        this.setState({controls: updatedOrderForm});
    }
    toggleSignIn = () => this.setState({isSignUp: !this.state.isSignUp});
    
    authenticateUser = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignUp);
    }
    render() { 
        const formArray = [];
        for(let key in this.state.controls) {
            formArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        const form = formArray.map(ele => {
            return <Input 
                                        key={ele.id}
                                        elementType={ele.config.elementType}
                                        value={ele.config.value}
                                        elementConfig={ele.config.elementConfig} 
                                        changed={(event) => this.inputChangedHandler(event, ele.id)} 
                                        valid={ele.config.valid}
                                        touched={ele.config.touched}/>
        })
        let authForm = <div>
            <form onSubmit={this.authenticateUser}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Success" clicked={this.toggleSignIn}>Switch to {this.state.isSignUp ? 'Sign Up(existing user)' : 'Sign In(new user)'}</Button>
        </div>
        if(this.props.loading) authForm = <Spinner />
        return ( 
            <div className="Auth">
                {this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null}
                {this.props.error ? this.props.error.message : null}
                {authForm}
            </div>
         );
    }
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